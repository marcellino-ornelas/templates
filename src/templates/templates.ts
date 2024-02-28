// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import * as path from 'path';
import fs from 'fs';
import * as is from 'is';
import { DirNode, FileSystemNode } from '@tps/fileSystemTree';
import File from '@tps/File';
import * as TPS from '@tps/utilities/constants';
import { findUp, isDir, isFile } from '@tps/utilities/fileSystem';
import Prompter from '@tps/prompter';
import { eachObj, defaults, hasProp } from '@tps/utilities/helpers';
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
import * as Promise from 'bluebird';
import dot from '@tps/templates/dot';
import templateEngine from '@tps/templates/template-engine';
import { TemplateOptions } from '@tps/types/templates';
import {
	CosmiconfigResult,
	cosmiconfigSync,
	defaultLoadersSync,
	getDefaultSearchPlacesSync,
} from 'cosmiconfig';
import * as utils from './utils';

export const DEFAULT_OPTIONS: TemplateOptions = {
	noLocalConfig: false,
	noGlobalConfig: false,
	defaultPackage: true,
	default: false,
	force: false,
	newFolder: true,
	wipe: false,
	tpsPath: null,
	extendedDest: '',
	experimentalTemplateEngine: false,
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

const tpsrcConfig = cosmiconfigSync(tpsConfigName, {
	cache: !TPS.IS_TESTING,
	searchStrategy: 'global',
	loaders: defaultLoadersSync,
	searchPlaces: [...defaultTpsrcSearches, ...nestedTpsrcSearches],
});

/**
 * @class
 * @classdesc Create a new instance of a template
 */
export class Templates {
	public opts: TemplateOptions;

	public tpsPath: string;

	public src: string;

	public _prompts: Prompter;

	public compiledFiles: File[];

	public static getGloablTpsPath(): string {
		return TPS.GLOBAL_PATH;
	}

	public static getLocalTpsPath(): string {
		const tpsLocal: string = findUp(TPS.TPS_FOLDER, TPS.CWD);
		const hasLocalTpsFolder = tpsLocal && tpsLocal !== TPS.GLOBAL_PATH;

		if (!hasLocalTpsFolder) return null;

		return tpsLocal;
	}

	public static hasGloablTps(): boolean {
		return isDir(TPS.GLOBAL_PATH);
	}

	public static hasLocalTps(): boolean {
		return Templates.getLocalTpsPath();
	}

	public static getGlobalTpsrc(): CosmiconfigResult {
		return tpsrcConfig.search(TPS.USER_HOME);
	}

	public static hasGloablTpsrc(): boolean {
		const global = this.getGlobalTpsrc();
		return !!(global && !global.isEmpty);
	}

	public static getLocalTpsrc(): CosmiconfigResult {
		return tpsrcConfig.search(TPS.CWD);
	}

	public static hasLocalTpsrc(): boolean {
		const local = this.getLocalTpsrc();
		return !!(local && !local.isEmpty);
	}

	constructor(templateName: string, opts: Partial<TemplateOptions> = {}) {
		if (!templateName || !is.string(templateName)) {
			throw new RequiresTemplateError();
		}

		const localPath = opts.tpsPath || TPS.LOCAL_PATH;
		const maybeLocalTemp = `${localPath}/${templateName}`;
		const maybeGlobalTemp = `${TPS.GLOBAL_PATH}/${templateName}`;
		const maybeDefaultTemp = path.join(TPS.DEFAULT_TPS, templateName);

		switch (true) {
			case localPath && isDir(maybeLocalTemp):
				this.src = maybeLocalTemp;
				this.tpsPath = localPath;
				break;
			case TPS.GLOBAL_PATH && isDir(maybeGlobalTemp):
				this.src = maybeGlobalTemp;
				this.tpsPath = TPS.GLOBAL_PATH;
				break;
			case isDir(maybeDefaultTemp):
				this.src = maybeDefaultTemp;
				this.tpsPath = TPS.DEFAULT_TPS;
				break;
			default:
				logger.tps.error('Template not found! \n%O', {
					'local path': localPath,
					'Seached for local template': maybeLocalTemp,
					'search for global template': maybeGlobalTemp,
					'search for default templates': maybeDefaultTemp,
					[localPath]: Templates.hasLocalTps() && fs.readdirSync(localPath),
					[TPS.GLOBAL_PATH]:
						Templates.hasGloablTps() && fs.readdirSync(TPS.GLOBAL_PATH),
				});
				throw new TemplateNotFoundError(templateName);
		}

		this.template = templateName;
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
		this.data = {};
		this.templateSettings = {};
		this.templateSettingsPath = path.join(this.src, TPS.TEMPLATE_SETTINGS_FILE);

		logger.tps.info('Settings file location: %s', this.templateSettingsPath);

		try {
			logger.tps.info('Loading template settings file...');
			// eslint-disable-next-line
			//   this.templateSettings = require(this.templateSettingsPath) || {};
			this.templateSettings = settingsConfig.search(this.src)?.config || {};
		} catch (e) {
			logger.tps.info(`Template has no Settings file`, e);
			this.templateSettings = {};
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
			});
			this._prompts = new Prompter(this.templateSettings.prompts, {
				default: this.opts.default,
			});
		} else {
			logger.tps.info('No prompts to load!', this.templateSettings);
		}

		this._loadTpsrc(templateName);

		// load default package if applicable
		const defaultFolder = path.join(this.src, 'default');
		const shouldLoadDefault = this.opts.defaultPackage && isDir(defaultFolder);
		logger.tps.info('Loading default package %o', shouldLoadDefault);
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

	public getGlobalTpsrc(): CosmiconfigResult {
		return Templates.getGlobalTpsrc();
	}

	public hasGloablTpsrc(): boolean {
		return Templates.hasGloablTpsrc();
	}

	public getLocalTpsrc(): CosmiconfigResult {
		if (!this.opts.tpsPath) {
			return Templates.getLocalTpsrc();
		}

		return tpsrcConfig.search(TPS.CWD);
	}

	public hasLocalTpsrc(): boolean {
		if (!this.opts.tpsPath) {
			return Templates.hasLocalTpsrc();
		}

		const local = this.getLocalTpsrc();

		return !!(local && !local.isEmpty);
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
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	setAnswers(answers: Record<string, any>) {
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
	render(
		dest: string,
		buildPaths?: string | string[],
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		data?: Record<string, any> = {},
	) {
		let dataForTemplating;
		let buildInDest = false;
		let pathsToCreate = buildPaths;
		// const { name: globalName } = data;
		let finalDest = dest;

		if (!buildPaths) {
			buildInDest = true;
			pathsToCreate = ['./'];
		} else if (is.string(buildPaths)) {
			pathsToCreate = [buildPaths];
		}

		// if were building in the destination. then we aren't creating any new folders
		const buildNewFolder = buildInDest ? false : this.opts.newFolder;
		logger.tps.info('Build paths: %n', pathsToCreate);

		if (is.array.empty(buildPaths)) {
			throw new Error(
				'Param `buildPaths` need to be a string or array of strings',
			);
		}

		// Append dest config
		if (this.opts.extendedDest) {
			finalDest = path.join(dest, this.opts.extendedDest);
		}

		// Create absolute paths
		pathsToCreate = pathsToCreate.map((buildPath) =>
			path.join(finalDest, buildPath),
		);

		logger.tps.info('Rendering templates to locations %n', pathsToCreate);

		return Promise.resolve()
			.then(() => {
				if (!isDir(finalDest)) {
					logger.tps.error('final destination was not a directory %n', {
						finalDest,
					});
					throw new DirectoryNotFoundError(finalDest);
				}
			})
			.then(() => this._answerRestOfPrompts())
			.then(() => {
				logger.tps.info('Rendering template at %s', finalDest);
				const answers = this.hasPrompts() ? this._prompts.answers : {};

				dataForTemplating = {
					...data,
					packages: this.packagesUsed,
					template: this.template,
					answers,
					a: answers,
					utils,
					u: utils,
				};
			})
			.then(() => {
				const builders = pathsToCreate.map((buildPath) => {
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
					const renderData = defaults({ name, dir }, dataForTemplating);
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
									loggerGroup.info(
										'Checking to see if there are duplicate files',
									);
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

							loggerGroup.info(
								'Not creating real build path %s',
								realBuildPath,
							);
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
							this._scheduleCleanUpForBuild(
								realBuildPath,
								err,
								doesBuildPathExist,
							);
						})
						.then(() => logger.tps.printGroup(groupName));
				});

				return Promise.all(builders).then(() => {
					if (is.array.empty(this.buildErrors)) {
						logger.tps.success('Finished rendering templates');
						return;
					}

					logger.tps.info('Build Errors: %o', this.buildErrors.length);
					logger.tps.info(
						'Build Paths need to be cleaned %n',
						this.buildErrors.map(({ buildPath }) => buildPath),
					);
					this.buildErrors.forEach(({ buildPath, didBuildPathExist }) => {
						this._cleanUpFailBuild(
							buildPath,
							buildNewFolder && !didBuildPathExist,
						);
					});

					const errors = this.buildErrors.map(({ error }) => error);

					return Promise.reject(errors.length === 1 ? errors[0] : errors);
				});
			});
	}

	_wipe(realBuildPath) {
		return fs.promises.rm(realBuildPath, { force: true, recursive: true });
	}

	_scheduleCleanUpForBuild(buildPath, err, didBuildPathExist) {
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

	_cleanUpFailBuild(buildError, buildNewFolder) {
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

		const filesIsEmpty = is.array.empty(files);
		const dirsIsEmpty = is.array.empty(dirs);

		if (filesIsEmpty && dirsIsEmpty) {
			logger.tps.success('Nothing to clean... Moving on to next');
			return;
		}

		if (!dirsIsEmpty) {
			const dirsThatMatch = dirs.filter((dir) => dir.includes(buildPath));

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

	_checkForFiles(dest, data) {
		for (let i = 0; i < this.compiledFiles.length; i++) {
			const file = this.compiledFiles[i];
			const finalDest = file.dest(dest, data, this._def);

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
	_renderAllFiles(buildPath, data) {
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

			loggerGroup.info(` - %s ${colors.cyan.italic('(File)')} %n`, finalDest, {
				buildPath,
			});

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
	 * @private
	 * @param {String} buildPath - destination path to make all directories. Should be a folder
	 */
	_renderAllDirectories(buildPath) {
		const dirTracker = {};
		const dirsInProgress = [];

		const loggerGroup = logger.tps.group(`render_${buildPath}`);
		loggerGroup.info('Rendering directories in %s', buildPath);

		this._getPackageArray().forEach((pkg) => {
			const dirs = pkg.find({ type: 'dir' });

			const dirsGettingCreated = Promise.each(dirs, (dirNode) => {
				/* skip if directory has already been made */
				if (hasProp(dirTracker, dirNode.path)) return;
				const dirPathRelativeFromPkg = dirNode.getRelativePathFrom(pkg, false);
				const dirPathInNewLocation = path.join(
					buildPath,
					dirPathRelativeFromPkg,
				);

				dirTracker[dirNode.path] = true;
				if (isDir(dirPathInNewLocation)) {
					return;
				}
				/* mark directory as already made */
				return fs.promises
					.mkdir(dirPathInNewLocation)
					.then(() => {
						this.successfulBuilds.dirs.push(dirPathInNewLocation);
						loggerGroup.info(
							`   - %s ${colors.green.italic('(created)')}`,
							dirPathRelativeFromPkg,
						);
					})
					.catch((err) => {
						/* do nothing if dir already exist */
						loggerGroup.warn(
							`   - %s ${colors.red.italic('failed')} %n`,
							dirPathRelativeFromPkg,
							err,
						);

						return Promise.reject(err);
					});
			});

			dirsInProgress.push(dirsGettingCreated);
		});

		return dirsInProgress.length && Promise.all(dirsInProgress);
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

		pkg.find({ type: 'file', ext: { not: '.def' } }).forEach((fileNode) => {
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
	 * @private
	 * @returns {DirNode[]} - array of all the packages
	 */
	_getPackageArray() {
		return this.packagesUsed.map((pkgName) => this.pkg(pkgName));
	}

	_answerRestOfPrompts() {
		return !this._prompts
			? null
			: this._prompts.getAnswers().then((answers) => {
					logger.tps.info('Answers from prompts %n', answers);
					eachObj(answers, (answer, answerName) => {
						if (this._prompts.getPrompt(answerName).isPkg()) {
							switch (true) {
								case is.undef(answer):
									break;
								case is.bool(answer):
									if (answer) {
										this.loadPackage(answerName);
									}
									break;
								case is.string(answer) && !!answer.length:
									this.loadPackage(answer);
									break;
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
			  });
	}

	/**
	 * Configurations
	 */
	_loadTpsrc(templateName) {
		if (!this.opts.noGlobalConfig) {
			logger.tps.info('Checking for global tpsrc in and up: %s', TPS.USER_HOME);
			if (this.hasGloablTpsrc()) {
				const globalTpsrc = this.getGlobalTpsrc();

				logger.tps.info('Loading global tpsrc from: %s', globalTpsrc.filepath);
				this._loadTpsSpecificConfig(templateName, globalTpsrc.config);
			}
		}

		if (!this.opts.noLocalConfig) {
			logger.tps.info(
				'Checking for local tpsrc in and up: %s',
				path.dirname(this.opts.tpsPath || TPS.LOCAL_PATH),
			);

			if (this.hasLocalTpsrc()) {
				const local = this.getLocalTpsrc();
				logger.tps.info('Loading local tpsrc from: %s', local.filepath);
				this._loadTpsSpecificConfig(templateName, local.config);
			}
		}
	}

	_loadTpsSpecificConfig(templateName, config) {
		const templateConfig = config[templateName];
		const hasConfigObject =
			hasProp(config, templateName) && is.object(templateConfig);

		if (hasConfigObject) {
			logger.tps.info('Loading configuration: %n', templateConfig);
			const { answers = {}, opts = {} } = templateConfig;
			this.opts = defaults(opts, this.opts);

			if (is.object(answers) && !is.empty(answers)) {
				this.setAnswers(answers);
			}
		}
	}
}

function SuccessfulBuild() {
	this.files = [];
	this.dirs = [];
}

export { TemplateOptions } from '@tps/types/templates';
