import DirectoryNode, { DirNode, FileNode } from '@tps/fileSystemTree';
import type { AnswersHash, SettingsFile } from '@tps/types/settings';
import { TEMPLATE_SETTINGS_FILE, IS_TESTING } from '@tps/utilities/constants';
import { cosmiconfig, getDefaultSearchPlaces } from 'cosmiconfig';
import {
	findTemplate,
	getTemplateLocations,
} from '@tps/templates/template-utils';
import {
	PackageAlreadyCompiledError,
	RequiresTemplateError,
	TemplateNotFoundError,
} from '@tps/errors';
import logger from '@tps/utilities/logger';
import path from 'path';
import * as colors from 'ansi-colors';
import File, { FileOptions } from '@tps/templates/File';
import templateEngine from '@tps/templates/template-engine';
import { forEachAsync } from '@tps/utilities/helpers';
import fs from 'fs';
import { isDirAsync } from '@tps/utilities/fileSystem';

const settingsConfig = cosmiconfig(TEMPLATE_SETTINGS_FILE, {
	cache: !IS_TESTING,
	searchPlaces: [
		`${TEMPLATE_SETTINGS_FILE}.js`,
		`${TEMPLATE_SETTINGS_FILE}.json`,
		...getDefaultSearchPlaces(TEMPLATE_SETTINGS_FILE),
	],
});

export interface TemplateOptions {
	/**
	 * Whether or not to force the creation of all files
	 */
	force: boolean;
	/**
	 * Whether or not to use experimental template engine
	 */
	experimentalTemplateEngine: boolean;
	/**
	 * Whether or not we should use default values for all prompts
	 */
	default: boolean;
	/**
	 * Whether or not hidden prompts should be prompted
	 */
	hidden: boolean;
	/**
	 * Whether or not to load the default package
	 */
	defaultPackage: boolean;
}

const DEFAULT_OPTS: TemplateOptions = {
	force: false,
	experimentalTemplateEngine: true,
	hidden: false,
	default: false,
	defaultPackage: true,
};

export class Template<TAnswers = AnswersHash> {
	public files: File[] = [];

	public defs: Record<string, string> = {};

	public options: TemplateOptions;

	// private prompts: Prompter<TAnswers>;

	/**
	 * Extra Relative directories to create in instances
	 *
	 * TODO: This is not the best way to do this but at the moment
	 */
	public extraDirectories: string[] = [];

	/**
	 * Get a template
	 */
	public static async get<TTemplateAnswers>(
		templateName: string,
		options: Partial<TemplateOptions> = {},
	): Promise<Template<TTemplateAnswers>> {
		const location = await Template.fetchTemplateLocation(templateName);

		const settingsFile = await Template.fetchSettingsFile(location);

		logger.tps.info('Template %n', {
			name: templateName,
			location,
		});

		const template = new Template<TTemplateAnswers>(
			templateName,
			location,
			settingsFile,
			{},
			[],
			options,
		);

		logger.tps.info('Template Options: %n', template.options);

		if (template.options.defaultPackage) {
			await template.fetchPackage('default', false);
		}

		return template;
	}

	private static async fetchSettingsFile(
		location: string,
	): Promise<SettingsFile | null> {
		try {
			const cosmiResult = await settingsConfig.search(location);

			if (cosmiResult?.filepath) {
				logger.tps.info('Settings file location: %s', cosmiResult.filepath);
			}

			if (cosmiResult?.config) {
				logger.tps.info('Template settings: %n', cosmiResult.config);
			}

			// we should validate this
			return (cosmiResult?.config satisfies SettingsFile) ?? null;
		} catch (e) {
			console.log(e);
			return null;
		}
	}

	public static async fetchTemplateLocation(
		templateName: string,
	): Promise<string | null> {
		if (!templateName || typeof templateName !== 'string') {
			throw new RequiresTemplateError();
		}

		const location: string | null =
			findTemplate(templateName) ?? findTemplate(`tps-${templateName}`) ?? null;

		if (!location) {
			logger.tps.error('Template not found! \n%O', {
				searchedPaths: getTemplateLocations(),
			});
			throw new TemplateNotFoundError(templateName);
		}

		return location;
	}

	constructor(
		/**
		 * Name of template
		 */
		public name,
		/**
		 * The Directory were the template code lives
		 */
		public location,
		/**
		 * Settings file of the template
		 */
		public settingsFile: SettingsFile | null,
		/**
		 * Template's packages. By default all packages arent loaded into memory and only
		 * packages that are requests are loaded
		 */
		public packages: Record<string, DirNode> = {},
		/**
		 * Packages used
		 */
		public packagesUsed: string[] = [],
		/**
		 *
		 */
		options: Partial<TemplateOptions> = {},
	) {
		// this handles default, settings, and passed
		this.options = {
			...DEFAULT_OPTS,
			...(settingsFile?.opts ?? {}),
			...options,
		};

		// if (this.settingsFile.prompts) {
		// 	logger.tps.info('Loading prompts... %o', {
		// 		defaultValues: this.options.default,
		// 		showHiddenPrompts: this.options.hidden,
		// 	});

		// 	this.prompts = new Prompter<TAnswers>(this.settingsFile.prompts, {
		// 		default: this.options.default,
		// 		showHiddenPrompts: this.options.hidden,
		// 	});
		// } else {
		// 	logger.tps.info('Template has no prompts %n', this.settingsFile);
		// }
	}

	public pkg(packageName: string): DirNode | null {
		return this.packages[packageName] ?? null;
	}

	/**
	 * Fetch packages contents so they can be included in rendered instance.
	 */
	public async fetchPackages(newPackages: string | string[]): Promise<void> {
		const isString = typeof newPackages === 'string';

		if (!Array.isArray(newPackages) && !isString) {
			throw new TypeError('Argument must be a string or an array of stings');
		}

		const packages = isString ? [newPackages] : newPackages;

		await Promise.all(packages.map(async (p) => this.fetchPackage(p)));
	}

	/**
	 * Fetch a package contents so they can be included in rendered instance.
	 *
	 * @param newPackage - package from the template you would like to use
	 */
	public async fetchPackage(
		newPackageName: string,
		fatal: boolean = true,
	): Promise<void> {
		if (!(typeof newPackageName === 'string')) {
			throw new TypeError('Argument must be a string');
		}

		if (newPackageName in this.packages) {
			throw new PackageAlreadyCompiledError(newPackageName);
		}

		logger.tps.info('Loading package %s', newPackageName);

		const packageExists = await isDirAsync(
			path.join(this.location, newPackageName),
		);

		if (!packageExists) {
			if (fatal) throw new Error('Package doesnt exist');

			logger.tps.log('Template doesnt have package: %s', newPackageName);
			return;
		}

		this.packages[newPackageName] = new DirNode(newPackageName, this.location);

		this.packagesUsed.push(newPackageName);

		logger.tps.success('Added package %s', newPackageName);
	}

	/**
	 * packages that will be used in the render process
	 */
	public usedPackages(): DirectoryNode[] {
		return this.packagesUsed.map((pkgName) => this.packages[pkgName]);
	}

	public createFile(
		file: string,
		content: string,
		options: Partial<FileOptions> = {},
	): void {
		// TODO: should remove
		this.createDirectory(path.dirname(file));
		this.files.push(File.from(file, content, options));
	}

	/**
	 * Create a directory in the template. When instances are created these directories
	 * will be created in the instance
	 */
	public createDirectory(dir: string): void {
		this.extraDirectories.push(dir);
	}

	/**
	 * Compile all files that need to be made for render process
	 */
	public async compile(): Promise<void> {
		logger.tps.info('Compiling Packages: %n', this.packagesUsed);

		await forEachAsync(this.packagesUsed, async (packageName) => {
			const pkg = this.pkg(packageName);

			const { force, experimentalTemplateEngine } = this.options;
			const defFiles = pkg.find({ type: 'file', ext: '.def' });

			if (defFiles.length) {
				logger.tps.info('Compiling def files %o', { force });

				await forEachAsync(defFiles, async (fileNode) => {
					logger.tps.info(
						`  - %s ${colors.green.italic('compiled')}`,
						fileNode.name,
					);
					const name = fileNode.name.substring(0, fileNode.name.indexOf('.'));
					this.defs[name] = (
						await fs.promises.readFile(fileNode.path)
					).toString();
					// When def files have more than one def. In order to use them we need to call the main file def first.
					// this fixes problems when any def can be available at render time
					templateEngine.template(`{{#def.${name}}}`, null, this.defs);
				});
			}
			logger.tps.info('Compiling files %n', {
				force,
			});

			await forEachAsync(
				pkg.find({ type: 'file', ext: { not: '.def' } }),
				async (fileNode: FileNode) => {
					const file = File.fromFileNode(fileNode, {
						force,
						useExperimentalTemplateEngine: experimentalTemplateEngine,
					});
					logger.tps.info(
						`  - %s ${colors.green.italic('compiled')}`,
						fileNode.path,
					);
					this.files.push(file);
				},
			);
		});
	}
}
