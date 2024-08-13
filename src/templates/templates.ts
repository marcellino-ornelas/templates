/* eslint-disable max-classes-per-file */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
import * as path from 'path';
import fs from 'fs';
import * as is from 'is';
import {
	DirectoryNode,
	DirNode,
	FileNode,
	FileSystemNode,
} from '@tps/fileSystemTree';
import File from '@tps/File';
import * as TPS from '@tps/utilities/constants';
import {
	cosmiconfigAllExampleSync,
	findUp,
	isDir,
	isFile,
	isDirAsync,
} from '@tps/utilities/fileSystem';
import Prompter from '@tps/prompter';
import {
	eachObj,
	hasProp,
	getNpmPaths,
	getAllDirectoriesAndUp,
} from '@tps/utilities/helpers';
import {
	TemplateNotFoundError,
	RequiresTemplateError,
	PackageAlreadyCompiledError,
	DirectoryNotFoundError,
	FileExistError,
	NoPromptsError,
} from '@tps/errors';
import logger from '@tps/utilities/logger';
import * as colors from 'ansi-colors';
import dot from '@tps/templates/dot';
import templateEngine from '@tps/templates/template-engine';
import { TemplateOptions } from '@tps/types/templates';
import { Tpsrc } from '@tps/types/tpsrc';
import { AnswersHash, SettingsFile } from '@tps/types/settings';
import {
	cosmiconfigSync,
	defaultLoadersSync,
	getDefaultSearchPlacesSync,
} from 'cosmiconfig';
import * as utils from './utils';

interface BuildErrors {
	error: Error;
	buildPath: string;
	didBuildPathExist: boolean;
}

export const DEFAULT_OPTIONS: TemplateOptions = {
	noLocalConfig: false,
	noGlobalConfig: false,
	defaultPackage: true,
	default: false,
	hidden: false,
	force: false,
	newFolder: true,
	wipe: false,
	tpsPath: null,
	extendedDest: '',
	experimentalTemplateEngine: true,
};

if (TPS.IS_TESTING) {
	logger.tps.opts.disableLog = true;
}

FileSystemNode.ignoreFiles = '**/.gitkeep';

const settingsConfig = cosmiconfigSync(TPS.TEMPLATE_SETTINGS_FILE, {
	cache: !TPS.IS_TESTING,
	searchPlaces: [
		`${TPS.TEMPLATE_SETTINGS_FILE}.json`,
		`${TPS.TEMPLATE_SETTINGS_FILE}.js`,
	],
});

const tpsConfigName = 'tps';

const defaultTpsrcSearches = getDefaultSearchPlacesSync(tpsConfigName);

const nestedTpsrcSearches = defaultTpsrcSearches.map((location) => {
	return `.tps/${location}`;
});

/**
 * TODO: Remove these from the list
 * - .tps/.config/tpsrc.cjs
 * - .tps/.config/tpsrc.ts
 * - .tps/.config/tpsrc.js
 * - .tps/.config/tpsrc.yml
 * - .tps/.config/tpsrc.yaml
 * - .tps/.config/tpsrc.json
 * - .tps/.config/tpsrc
 * - .tps/package.json
 */
const tpsrcSearchPlaces = [...defaultTpsrcSearches, ...nestedTpsrcSearches];

const tpsrcConfig = cosmiconfigSync(tpsConfigName, {
	cache: !TPS.IS_TESTING,
	searchStrategy: 'global',
	loaders: defaultLoadersSync,
	searchPlaces: tpsrcSearchPlaces,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RenderData = Record<string, any>;

/**
 * @class
 * @classdesc Create a new instance of a template
 */
export class Templates<TAnswers extends AnswersHash = AnswersHash> {
	/**
	 * name of template
	 */
	public template: string;

	/**
	 * Templates options
	 */
	public opts: TemplateOptions;

	public packages: Record<string, DirNode>;

	public packagesUsed: string[];

	private _defs: Record<string, string>;

	public successfulBuilds: SuccessfulBuild;

	public buildErrors: BuildErrors[];

	public templateSettings: SettingsFile;

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public engine: any;

	// public engine: typeof templateEngine | typeof (doT as any);

	/**
	 * Path to the templates settings file
	 */
	public templateSettingsPath: string;

	/**
	 * Path to the templates directory
	 */
	public src: string;

	public _prompts: Prompter;

	public compiledFiles: File[];

	/**
	 * All tpsrc config file names.
	 *
	 * @example
	 *
	 *	[
	 *		'.tps/tps.config.cjs',
	 *		'.tps/tps.config.ts',
	 *		'.tps/tps.config.js',
	 *		'.tps/.tpsrc.cjs',
	 *		'.tps/.tpsrc.ts',
	 *		'.tps/.tpsrc.js',
	 *		'.tps/.tpsrc.yml',
	 *		'.tps/.tpsrc.yaml',
	 *		'.tps/.tpsrc.json',
	 *		'.tps/.tpsrc',
	 *		'tps.config.cjs',
	 *		'tps.config.ts',
	 *		'tps.config.js',
	 *		'.config/tpsrc.cjs',
	 *		'.config/tpsrc.ts',
	 *		'.config/tpsrc.js',
	 *		'.config/tpsrc.yml',
	 *		'.config/tpsrc.yaml',
	 *		'.config/tpsrc.json',
	 *		'.config/tpsrc',
	 *		'.tpsrc.cjs',
	 *		'.tpsrc.ts',
	 *		'.tpsrc.js',
	 *		'.tpsrc.yml',
	 *		'.tpsrc.yaml',
	 *		'.tpsrc.json',
	 *		'.tpsrc',
	 *		'package.json'
	 *	]
	 */
	public static readonly tpsrcConfigNames: string[] = tpsrcSearchPlaces;

	/**
	 * Get all locations a template can be
	 *
	 * Templates can be in be:
	 * - any `.tps/` directory from the callers cwd and any directory above it
	 * - Any `node_module` directory from the callers cwd and any directory above it
	 */
	public static getTemplateLocations(cwd: string = TPS.CWD): string[] {
		const tpsDirectoryLocations = getAllDirectoriesAndUp(cwd).map((dir) => {
			return path.join(dir, TPS.TPS_FOLDER);
		});

		// TODO: Sort this by directory
		return [
			...tpsDirectoryLocations,
			path.join(TPS.MAIN_DIR, TPS.TPS_FOLDER),
			...getNpmPaths(cwd),
		];
	}

	/**
	 * Get the path to a template or null if template doesnt exist
	 */
	public static findTemplate(
		templateName: string,
		cwd: string = TPS.CWD,
	): string | null {
		const homeDirectory = Templates.getTemplateLocations(cwd).find((tpsDir) => {
			return isDir(path.join(tpsDir, templateName));
		});

		if (!homeDirectory) return null;

		return path.join(homeDirectory, templateName);
	}

	/**
	 * Gets path to the global .tps/ directory
	 */
	public static getGloablTpsPath(): string | null {
		return path.join(TPS.USER_HOME, TPS.TPS_FOLDER);
	}

	public static getLocalTpsPath(): string | null {
		const tpsLocal: string = findUp(TPS.TPS_FOLDER, TPS.CWD);
		const hasLocalTpsFolder = tpsLocal && tpsLocal !== TPS.GLOBAL_PATH;

		if (!hasLocalTpsFolder) return null;

		return tpsLocal;
	}

	public static directoryIsTpsInitialized(dir): boolean {
		return isDir(path.join(dir, TPS.TPS_FOLDER));
	}

	public static hasGloablTps(): boolean {
		return Templates.directoryIsTpsInitialized(TPS.USER_HOME);
	}

	public static hasLocalTps(): boolean {
		return !!Templates.getLocalTpsPath();
	}

	constructor(templateName: string, opts: Partial<TemplateOptions> = {}) {
		if (!templateName || !is.string(templateName)) {
			throw new RequiresTemplateError();
		}

		this.template = templateName;

		const templateLocation =
			Templates.findTemplate(templateName) ||
			Templates.findTemplate(`tps-${templateName}`);

		if (!templateLocation) {
			logger.tps.error('Template not found! \n%O', {
				searchedPaths: Templates.getTemplateLocations(),
			});
			throw new TemplateNotFoundError(templateName);
		}

		this.src = templateLocation;

		logger.tps.info('Template %n', {
			name: this.template,
			location: this.src,
		});

		this.packages = {};
		this.packagesUsed = [];
		this.compiledFiles = [];
		this._defs = {};
		this.successfulBuilds = new SuccessfulBuild();
		this.buildErrors = [];
		this.templateSettings = {} as SettingsFile;
		this.templateSettingsPath = path.join(this.src, TPS.TEMPLATE_SETTINGS_FILE);

		logger.tps.info('Settings file location: %s', this.templateSettingsPath);

		try {
			logger.tps.info('Loading template settings file...');
			// eslint-disable-next-line
			this.templateSettings = settingsConfig.search(this.src)?.config || {};
		} catch (e) {
			logger.tps.info(`Template has no Settings file`, e);
			this.templateSettings = {} as SettingsFile;
		}
		logger.tps.info('Template settings: %n', this.templateSettings);

		this.opts = {
			// default options
			...DEFAULT_OPTIONS,
			// template settings options
			...(this.templateSettings?.opts || {}),
			// tpsrc ??
			// user options
			...opts,
		};

		this.engine = this.opts.experimentalTemplateEngine ? templateEngine : dot;

		logger.tps.info('Template Options: %n', this.opts);

		if (this.templateSettings.prompts) {
			logger.tps.info('Loading prompts... %o', {
				defaultValues: this.opts.default,
				showHiddenPrompts: this.opts.hidden,
			});

			this._prompts = new Prompter<TAnswers>(this.templateSettings.prompts, {
				default: this.opts.default,
				showHiddenPrompts: this.opts.hidden,
			});
		} else {
			logger.tps.info('No prompts to load!', this.templateSettings);
		}

		this._loadTpsrc(templateName);

		// load default package if applicable
		const defaultFolder = path.join(this.src, 'default');
		const shouldLoadDefault = this.opts.defaultPackage && isDir(defaultFolder);
		logger.tps.info('Loading default package %n', {
			shouldLoadDefault,
			defaultLocation: defaultFolder,
		});
		if (shouldLoadDefault) {
			this.loadPackage('default');
		}
	}

	public hasGloablTps(): boolean {
		return Templates.hasGloablTps();
	}

	public hasLocalTps(): boolean {
		if (!this.opts.tpsPath) {
			return Templates.hasLocalTps();
		}

		return isDir(this.opts.tpsPath);
	}

	/**
	 * Include packages to use in the render process
	 */
	loadPackages(newPackages: string | string[]): void {
		let packages = newPackages;
		if (!Array.isArray(packages)) {
			if (is.string(packages) && packages) {
				packages = [packages];
			} else {
				throw new TypeError('Argument must be a string or an array of stings');
			}
		}

		packages.forEach((p) => this.loadPackage(p));
	}

	/**
	 * @param {String} newPackage - package from the template you would like to use
	 */
	loadPackage(newPackageName: string): void {
		if (!this.src) {
			throw new RequiresTemplateError();
		}

		if (!is.string(newPackageName)) {
			throw new TypeError('Argument must be a string');
		}

		if (hasProp(this.packages, newPackageName)) {
			throw new PackageAlreadyCompiledError(newPackageName);
		}

		this.packages[newPackageName] = new DirNode(newPackageName, this.src);

		logger.tps.info('Loading package %s', newPackageName);

		this._compileFilesFromPackage(newPackageName);

		logger.tps.success('Added package %s', newPackageName);

		this.packagesUsed.push(newPackageName);
	}

	/**
	 * Get directory tree representation of package
	 */
	pkg(packageName: string): DirNode {
		return this.packages[packageName];
	}

	/**
	 * Set answers for prompts
	 */
	hasPrompts(): boolean {
		return !!(this._prompts && this._prompts.hasPrompts());
	}

	/**
	 * Set answers for prompts
	 * @param answers - object of prompts answers. Key should be the name of the prompt and value should be the answer to it
	 */
	setAnswers(answers: Partial<TAnswers>): void {
		if (!this.hasPrompts()) {
			throw new NoPromptsError();
		}

		this._prompts.setAnswers(answers);
	}

	/**
	 * @param dest - destination to render your new template to
	 * @param buildPaths - Instances you would like to create
	 * @param data - data to pass to doT. This will be used when rendering dot files/syntax
	 * @returns {Promise}
	 */
	async render<T extends string | string[]>(
		dest: string,
		buildPaths?: T,
		data: RenderData = {},
	): Promise<T extends string[] ? string[] : string> {
		let buildInDest = false;
		let pathsToCreate: string[];
		let finalDest = dest;

		if (!buildPaths) {
			buildInDest = true;
			pathsToCreate = ['./'];
		} else if (typeof buildPaths === 'string') {
			pathsToCreate = [buildPaths];
		} else {
			pathsToCreate = buildPaths;
		}

		// @ts-expect-error need to fix library
		if (is.array.empty(buildPaths)) {
			throw new Error(
				'Param `buildPaths` need to be a string or array of strings',
			);
		}

		await this._emitEvent('onRender');

		// if were building in the destination. then we aren't creating any new folders
		const buildNewFolder = buildInDest ? false : this.opts.newFolder;
		logger.tps.info('Build paths: %n', pathsToCreate);

		// Append dest config
		if (this.opts.extendedDest) {
			finalDest = path.join(dest, this.opts.extendedDest);
		}

		// Create absolute paths
		pathsToCreate = pathsToCreate.map((buildPath) =>
			path.join(finalDest, buildPath),
		);

		logger.tps.info('Rendering templates to locations %n', pathsToCreate);

		if (!(await isDirAsync(finalDest))) {
			logger.tps.error('final destination was not a directory %n', {
				finalDest,
			});
			throw new DirectoryNotFoundError(finalDest);
		}

		await this._answerRestOfPrompts();

		logger.tps.info('Rendering template at %s', finalDest);

		const builders: Promise<void>[] = pathsToCreate.map((buildPath) => {
			return this._renderBuildPath(
				buildPath,
				buildInDest,
				buildNewFolder,
				data,
			);
		});

		await Promise.all(builders);

		// @ts-expect-error need to fix library
		if (is.array.empty(this.buildErrors)) {
			logger.tps.success('Finished rendering templates');

			const createdPaths = Array.isArray(buildPaths)
				? pathsToCreate
				: pathsToCreate[0];

			await this._emitEvent('onRendered', createdPaths);

			// @ts-expect-error Not sure whats wrong here
			return createdPaths;
		}

		logger.tps.info('Build Errors: %o', this.buildErrors.length);
		logger.tps.info(
			'Build Paths need to be cleaned %n',
			this.buildErrors.map(({ buildPath }) => buildPath),
		);
		this.buildErrors.forEach(({ buildPath, didBuildPathExist }) => {
			this._cleanUpFailBuild(buildPath, buildNewFolder && !didBuildPathExist);
		});

		const errors = this.buildErrors.map(({ error }) => error);

		return Promise.reject(errors.length === 1 ? errors[0] : errors);
	}

	private async _renderBuildPath(
		buildPath: string,
		buildInDest: boolean,
		buildNewFolder: boolean,
		data: RenderData,
	): Promise<void> {
		await this._emitEvent('onBuildPathRender', buildPath);

		const { name, dir } = path.parse(buildPath);
		/**
		 * @example
		 *  if
		 *    cwd: '/User/home/app'
		 *    build path: 'test' // short build path
		 *    new folder: true
		 *  then
		 *    realBuildPath: '/User/home/app/test'
		 *    - A new directory named `test` needs to be created
		 *
		 * @example
		 *  if
		 *    cwd: '/User/home/app'
		 *    build path: 'test/test2' // long build path
		 *    new folder: true
		 *  then
		 *    realBuildPath: '/User/home/app/test/test2'
		 *    - A new directory named `test` needs to be created if doesn't exist already, `test2` should be created regardless
		 *
		 * @example
		 *  if
		 *    cwd: '/User/home/app'
		 *    build path: '' // build in dest
		 *    new folder: true??
		 *  then
		 *    realBuildPath: '/User/home/app'
		 *    - this directory should not be created or overridden since it should exist.
		 *
		 * @example
		 *  if
		 *    cwd: '/User/home/app'
		 *    build path: 'test' // short build path
		 *    new folder: false
		 *  then
		 *    realBuildPath: '/User/home/app'
		 *    - this directory should not be created or overridden since it should exist.
		 *
		 * @example
		 *  if
		 *    cwd: '/User/home/app'
		 *    build path: 'test/test2' // short build path
		 *    new folder: false
		 *  then
		 *    realBuildPath: '/User/home/app'
		 *    - A directory named `test` needs to be created if not already exists
		 *
		 */
		const realBuildPath = buildInDest || buildNewFolder ? buildPath : dir;
		const answers = this.hasPrompts() ? this._prompts.answers : {};

		const renderData = {
			...data,
			packages: this.packagesUsed,
			template: this.template,
			answers,
			a: answers,
			utils,
			u: utils,
			name,
			dir,
		};
		let doesBuildPathExist = isDir(realBuildPath);

		const groupName = `render_${buildPath}`;
		const loggerGroup = logger.tps.group(groupName, {
			clear: true,
		});

		const marker = colors.magenta('*'.repeat(buildPath.length + 12));

		loggerGroup.info(`\n${marker}\nBuild Path: ${buildPath}\n${marker}`);

		loggerGroup.info('Render config: %n', {
			name: renderData.name,
			buildPath,
			'Final Destination': realBuildPath,
			doesBuildPathExist,
			buildInDest,
			buildNewFolder,
		});

		return Promise.resolve()
			.then(() => {
				const { wipe, force } = this.opts;

				if (doesBuildPathExist) {
					/**
					 * If `wipe=true` then we need to delete the directory that we will be overriding.
					 * But if `newFolder=false` then we need to skip the wipe command because we are not creating a new directory.
					 */
					if (wipe && !buildInDest) {
						if (!buildNewFolder) {
							loggerGroup.info(
								'Skipping wipe because we are not building a new folder',
							);
							// super hacky yes i know. The reason this needs to happen is because
							// when were using wipe but were not building a new folder we need to make sure all
							// files that already exist get overridden
							this.compiledFiles.forEach((file) => {
								// eslint-disable-next-line no-param-reassign
								file.opts.force = true;
							});
							return;
						}
						loggerGroup.info('Wiping destination %s', realBuildPath);
						doesBuildPathExist = false;
						return this._wipe(realBuildPath);
					}

					if (!force && !wipe) {
						loggerGroup.info('Checking to see if there are duplicate files');
						return this._checkForFiles(realBuildPath, renderData);
					}
				} else {
					loggerGroup.info('Build path does not exist...');
				}
			})
			.then(() => {
				// Create a new folder unless told not to
				// if we are building the template in dest folder don't create new folder
				if (!buildInDest && (buildNewFolder || !doesBuildPathExist)) {
					loggerGroup.info('Creating real build path %s', realBuildPath);
					return fs.promises
						.mkdir(realBuildPath, { recursive: true })
						.catch((err) => {
							loggerGroup.warn(
								'Building build path folder had a issue %n',
								err,
							);
						});
				}

				loggerGroup.info('Not creating real build path %s', realBuildPath);
			})
			.then(() => this._renderAllDirectories(realBuildPath))
			.then(() => this._renderAllFiles(realBuildPath, renderData))
			.then(() => {
				loggerGroup.success(
					`Build Path: %s ${colors.green.italic('(created)')}`,
					buildPath,
				);
			})
			.catch((err) => {
				loggerGroup.error('Build Path: %s %n', buildPath, err);
				this._scheduleCleanUpForBuild(realBuildPath, err, doesBuildPathExist);
			})
			.then(() => logger.tps.printGroup(groupName))
			.then(() => this._emitEvent('onBuildPathRendered', buildPath));
	}

	async _wipe(realBuildPath: string): Promise<void> {
		await fs.promises.rm(realBuildPath, { force: true, recursive: true });
	}

	_scheduleCleanUpForBuild(
		buildPath: string,
		err: Error,
		didBuildPathExist: boolean,
	): void {
		logger.tps
			.group(`render_${buildPath}`)
			.info('Build Path schedule for cleaning %s %o', buildPath, {
				didBuildPathExist,
			});
		this.buildErrors.push({
			buildPath,
			error: err,
			didBuildPathExist,
		});
	}

	_cleanUpFailBuild(buildError: string, buildNewFolder: boolean): void {
		logger.tps.info('Processing build cleanup %s %o', buildError, {
			buildNewFolder,
		});

		let buildPath = buildError;
		const buildPathNeedsSlash = buildPath[buildPath.length - 1] === path.sep;

		if (!buildPathNeedsSlash) {
			buildPath += path.sep;
		}

		if (buildNewFolder) {
			fs.rmSync(buildPath, { force: true, recursive: true });
		}

		// eslint-disable-next-line prefer-const
		let { files, dirs } = this.successfulBuilds;

		// @ts-expect-error need to fix library
		const filesIsEmpty: boolean = is.array.empty(files);

		// @ts-expect-error need to fix library
		const dirsIsEmpty: boolean = is.array.empty(dirs);

		if (filesIsEmpty && dirsIsEmpty) {
			logger.tps.success('Nothing to clean... Moving on to next');
			return;
		}

		if (!dirsIsEmpty) {
			const dirsThatMatch = dirs.filter((dir) => dir.includes(buildPath));

			// @ts-expect-error need to fix library
			if (!is.array.empty(dirsThatMatch)) {
				logger.tps.info('Cleaning directories %n', dirsThatMatch);
			}

			dirsThatMatch.forEach((dir) => {
				try {
					fs.rmSync(dir, { force: true, recursive: true });
					logger.tps.success(` - %s ${colors.green.italic('(deleted)')}`, dir);
				} catch (err) {
					logger.tps.error('Clean up failed when deleting directories %n', err);
				}

				// if directory is removed then we can remove all child files
				if (!filesIsEmpty) {
					files = files.filter((file) => !file.includes(dir));
				}
			});
		}

		if (!filesIsEmpty) {
			const filesThatMatch = files.filter((file) => file.includes(buildPath));

			// @ts-expect-error need to fix library
			if (!is.array.empty(filesThatMatch)) {
				logger.tps.info('Cleaning files %n', filesThatMatch);
			}

			files.forEach((file) => {
				try {
					fs.rmSync(buildPath, { force: true });
					logger.tps.success(` - %s ${colors.green.italic('(deleted)')}`, file);
				} catch (err) {
					logger.tps.error('Clean up failed when deleting files %n', err);
				}
			});
		}

		logger.tps.success('Clean up finished');
	}

	_checkForFiles(dest: string, data: RenderData): void {
		for (let i = 0; i < this.compiledFiles.length; i++) {
			const file = this.compiledFiles[i];
			const finalDest = file.dest(dest, data, this._defs);

			if (isFile(finalDest)) {
				throw new FileExistError(finalDest);
			}
		}
	}

	/**
	 * Creates all files that our template uses in `buildPath` folder
	 * @param {String} buildPath - destination path to render all files to
	 * @param {Object} [data={}] - data passed in for dot
	 */
	_renderAllFiles(buildPath: string, data: RenderData): Promise<void> {
		const loggerGroup = logger.tps.group(`render_${buildPath}`);
		loggerGroup.info('Rendering files');

		const files = this.compiledFiles.filter((file) => !file.isDot);
		const dotFiles = this.compiledFiles.filter((file) => file.isDot);
		const dotContents = dotFiles.map((file) => {
			/**
			 * Will throw error if something is wrong with doT
			 */
			return [
				file,
				file.dest(buildPath, data, this._defs),
				file.fileDataTemplate(data, this._defs, buildPath),
			];
		});

		const filesInProgress = [];
		let hasErroredOut = false;
		let error;

		const handleFileErrorCatch = (dest, type, err) => {
			loggerGroup.error(
				`Error happened when rendering a ${type} %s %n`,
				dest,
				err,
			);
			if (!hasErroredOut) {
				hasErroredOut = true;
				error = err;
			}
		};

		dotContents.forEach(([file, finalDest, dotContentsForFile]) => {
			loggerGroup.info(` - %s ${colors.cyan.italic('(Dot file)')}`, finalDest);
			filesInProgress.push(
				file
					.renderDotFile(finalDest, dotContentsForFile)
					.catch((err) => handleFileErrorCatch(finalDest, 'dot file', err)),
			);
		});

		files.forEach((file) => {
			const finalDest = file.dest(buildPath, data, this._defs);
			loggerGroup.info(` - %s ${colors.cyan.italic('(File)')}`, finalDest);
			filesInProgress.push(
				file
					.renderFile(finalDest)
					.catch((err) => handleFileErrorCatch(finalDest, 'file', err)),
			);
		});

		return Promise.all(filesInProgress).then(() => {
			if (hasErroredOut) {
				loggerGroup.error(
					'There was a error when rendering template to %s',
					buildPath,
				);
				return Promise.reject(error);
			}
		});
	}

	/**
	 * Creates all directories that our template uses in `buildPath` folder
	 * @param buildPath - destination path to make all directories. Should be a folder
	 */
	private async _renderAllDirectories(buildPath: string): Promise<void> {
		const dirTracker: Record<string, boolean> = {};

		const loggerGroup = logger.tps.group(`render_${buildPath}`);
		loggerGroup.info('Rendering directories in %s', buildPath);

		const dirsInProgress = this._getPackageArray().map(
			async (pkg): Promise<void> => {
				const dirs = pkg.find({ type: 'dir' });

				const dirsGettingCreated = dirs.map(
					async (dirNode: DirectoryNode): Promise<void> => {
						/* skip if directory has already been made */
						if (hasProp(dirTracker, dirNode.path)) return;
						const dirPathRelativeFromPkg = dirNode.getRelativePathFrom(
							pkg,
							false,
						);
						const dirPathInNewLocation = path.join(
							buildPath,
							dirPathRelativeFromPkg,
						);

						dirTracker[dirNode.path] = true;
						if (await isDirAsync(dirPathInNewLocation)) {
							return;
						}

						try {
							await fs.promises.mkdir(dirPathInNewLocation);

							this.successfulBuilds.dirs.push(dirPathInNewLocation);

							loggerGroup.info(
								`   - %s ${colors.green.italic('(created)')}`,
								dirPathRelativeFromPkg,
							);
						} catch (err) {
							/* do nothing if dir already exist */
							loggerGroup.warn(
								`   - %s ${colors.red.italic('failed')} %n`,
								dirPathRelativeFromPkg,
								err,
							);

							return Promise.reject(err);
						}
					},
				);

				await Promise.all(dirsGettingCreated);
			},
		);

		await Promise.all(dirsInProgress);

		// return dirsInProgress.length && Promise.all(dirsInProgress);
	}

	/**
	 * Compile all files that need to be made for render process
	 * @private
	 * @param {String} packageName - name of package
	 */
	_compileFilesFromPackage(packageName: string): void {
		const pkg = this.pkg(packageName);
		const { force } = this.opts;

		const defFiles = pkg.find({ type: 'file', ext: '.def' });

		// @ts-expect-error need to fix library
		if (!is.array.empty(defFiles)) {
			logger.tps.info('Compiling def files %o', { force });

			defFiles.forEach((fileNode) => {
				logger.tps.info(
					`  - %s ${colors.green.italic('compiled')}`,
					fileNode.name,
				);
				const name = fileNode.name.substring(0, fileNode.name.indexOf('.'));
				this._defs[name] = fs.readFileSync(fileNode.path).toString();

				// When def files have more than one def. In order to use them we need to call the main file def first.
				// this fixes problems when any def can be available at render time
				this.engine.template(`{{#def.${name}}}`, null, this._defs);
			});
		}

		logger.tps.info('Compiling files %n', {
			force,
			useExperimentalTemplateEngine: this.opts.experimentalTemplateEngine,
		});

		pkg
			.find({ type: 'file', ext: { not: '.def' } })
			.forEach((fileNode: FileNode) => {
				const file = new File(fileNode, {
					force,
					useExperimentalTemplateEngine: this.opts.experimentalTemplateEngine,
				});
				logger.tps.info(
					`  - %s ${colors.green.italic('compiled')}`,
					fileNode.path,
				);
				this.compiledFiles.push(file);
			});
	}

	/**
	 * Creates a array of all packages user wants for render process successful
	 */
	private _getPackageArray(): DirNode[] {
		return this.packagesUsed.map((pkgName) => this.pkg(pkgName));
	}

	async _answerRestOfPrompts(): Promise<void> {
		if (!this._prompts) return;

		const answers = await this._prompts.getAnswers();

		logger.tps.info('Answers from prompts %n', answers);

		eachObj(answers, (answer, answerName) => {
			if (this._prompts.getPrompt(answerName).isPkg()) {
				switch (true) {
					// @ts-expect-error need to fix library
					case is.undef(answer):
						break;
					// @ts-expect-error need to fix library
					case is.bool(answer):
						if (answer) {
							this.loadPackage(answerName);
						}
						break;
					case is.string(answer) && !!answer.length:
						this.loadPackage(answer);
						break;
					// @ts-expect-error need to fix library
					case is.array(answer) && !is.array.empty(answer):
						this.loadPackages(answer);
						break;
					default:
						throw new Error(
							'Data type is not supported as answer to a tps prompt',
						);
				}
			}
		});
	}

	/**
	 * Configurations
	 */
	_loadTpsrc(templateName: string): void {
		const tpsrcfiles = cosmiconfigAllExampleSync(
			TPS.CWD,
			tpsrcConfig,
			tpsrcSearchPlaces,
		);

		if (is.empty(tpsrcfiles)) {
			logger.tps.info('No tps files to find: %n', {
				cwd: TPS.CWD,
				tpsrcSearchPlaces,
			});
		}

		tpsrcfiles.reverse().forEach((tpsrc) => {
			if (!tpsrc || tpsrc?.isEmpty) return;

			logger.tps.info('Loading tpsrc from: %s %n', tpsrc.filepath, tpsrc);

			this._loadTpsSpecificConfig(templateName, tpsrc.config);
		});
	}

	private _loadTpsSpecificConfig(templateName: string, config: Tpsrc): void {
		const templateConfig = config[templateName] ?? null;

		if (templateConfig && is.object(templateConfig)) {
			logger.tps.info('Loading configuration: %n', templateConfig);
			const { answers = {}, opts = {} } = templateConfig;
			this.opts = {
				...this.opts,
				...opts,
			};

			if (is.object(answers) && !is.empty(answers)) {
				// TODO: Is this the best way to handle this?
				this.setAnswers(answers as TAnswers);
			}
		}
	}

	private async _emitEvent(
		event: keyof SettingsFile['events'],
		...args: unknown[]
	): Promise<void> {
		const events = this.templateSettings?.events || {};
		if (event in events && typeof events[event] === 'function') {
			await events[event]?.(this, ...args);
		}
	}
}

class SuccessfulBuild {
	/**
	 * Paths of files that were successfully built
	 */
	public files: string[] = [];

	/**
	 * Paths of directories that were successfully built
	 */
	public dirs: string[] = [];
}

export { TemplateOptions } from '@tps/types/templates';
