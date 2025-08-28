import DirectoryNode, { DirNode, FileNode } from '@tps/fileSystemTree';
import type { SettingsFile } from '@tps/types/settings';
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

const settingsConfig = cosmiconfig(TEMPLATE_SETTINGS_FILE, {
	cache: !IS_TESTING,
	searchPlaces: [
		`${TEMPLATE_SETTINGS_FILE}.js`,
		`${TEMPLATE_SETTINGS_FILE}.json`,
		...getDefaultSearchPlaces(TEMPLATE_SETTINGS_FILE),
	],
});

interface TemplateOptions {
	force: boolean;
	experimentalTemplateEngine: boolean;
}

const DEFAULT_OPTS: TemplateOptions = {
	force: false,
	experimentalTemplateEngine: true,
};

export class Template {
	public files: File[] = [];

	public defs: Record<string, string> = {};

	/**
	 * Get a template
	 */
	public static async get(templateName: string): Promise<Template> {
		const location = await Template.fetchTemplateLocation(templateName);

		const settingsFile = await Template.fetchSettingsFile(location);

		const template = new Template(templateName, location, settingsFile, {}, []);

		await template.fetchPackage('default');

		return template;
	}

	private static async fetchSettingsFile(
		location: string,
	): Promise<SettingsFile | null> {
		try {
			const cosmiResult = await settingsConfig.search(location);

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

	/**
	 * Extra Relative directories to create in instances
	 *
	 * TODO: This is not the best way to do this but at the moment
	 */
	public extraDirectories: string[] = [];

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
		public settingsFile: SettingsFile,
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
		public options: TemplateOptions = DEFAULT_OPTS,
	) {
		// do nothing
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

		await Promise.all(packages.map((p) => this.fetchPackage(p)));
	}

	/**
	 * Fetch a package contents so they can be included in rendered instance.
	 *
	 * @param newPackage - package from the template you would like to use
	 */
	public async fetchPackage(newPackageName: string): Promise<void> {
		if (!this.location) {
			throw new RequiresTemplateError();
		}

		if (!(typeof newPackageName === 'string')) {
			throw new TypeError('Argument must be a string');
		}

		if (newPackageName in this.packages) {
			throw new PackageAlreadyCompiledError(newPackageName);
		}

		logger.tps.info('Loading package %s', newPackageName);

		this.packages[newPackageName] = new DirNode(newPackageName, this.location);

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
						experimentalTemplateEngine,
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
