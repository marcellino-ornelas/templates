import DirectoryNode, { DirNode } from '@tps/fileSystemTree';
import { SettingsFile } from '@tps/types/settings';
import { TEMPLATE_SETTINGS_FILE, IS_TESTING } from '@tps/utilities/constants';
import {
	cosmiconfig,
	cosmiconfigSync,
	defaultLoaders,
	getDefaultSearchPlaces,
} from 'cosmiconfig';
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

const settingsConfig = cosmiconfig(TEMPLATE_SETTINGS_FILE, {
	cache: !IS_TESTING,
	searchPlaces: [
		`${TEMPLATE_SETTINGS_FILE}.js`,
		`${TEMPLATE_SETTINGS_FILE}.json`,
		...getDefaultSearchPlaces(TEMPLATE_SETTINGS_FILE),
	],
});

export class Template {
	/**
	 * What I need?
	 * - template name
	 * - settings file
	 * - options
	 *
	 * What will it do?
	 * - asyncly load template packages including all package files and directorys
	 * - compile dot files so they are ready to render (once)
	 * - asyncly load the settings file
	 */
	public static async get(templateName: string): Promise<Template> {
		const location = await Template.fetchTemplateLocation(templateName);

		const settingsFile = await Template.fetchSettingsFile(location);

		const template = new Template(templateName, location, settingsFile);

		template.fetchPackage('default');

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
	) {
		// do nothing
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

		this.packages[newPackageName] = new DirNode(newPackageName, this.location);

		logger.tps.info('Loading package %s', newPackageName);

		// TODO: implement some sort of compiled files
		// this._compileFilesFromPackage(newPackageName);

		logger.tps.success('Added package %s', newPackageName);
	}

	/**
	 * Get directory tree representation of package
	 */
	public pkg(packageName: string): DirNode {
		return this.packages[packageName];
	}

	/**
	 * packages that will be used in the render process
	 */
	public usedPackages(): string[] {
		return Object.keys(this.packages);
	}
}
