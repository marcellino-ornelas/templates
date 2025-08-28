/* eslint-disable max-classes-per-file */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
import * as path from 'path';
import * as is from 'is';
import { FileSystemNode } from '@tps/fileSystemTree';
import * as TPS from '@tps/utilities/constants';
import { findUp, isDir, isDirAsync } from '@tps/utilities/fileSystem';
import { pick, forEachAsync } from '@tps/utilities/helpers';
import { DirectoryNotFoundError, NoPromptsError } from '@tps/errors';
import logger from '@tps/utilities/logger';
import { TemplatesOptions } from '@tps/types/templates';
import { AnswersHash, SettingsFile } from '@tps/types/settings';
import Prompter from '@tps/prompter';
import { Build } from './build';
import { Template, TemplateOptions } from './template';
import { getTpsrc } from './tpsrc';
import { getTemplateLocations } from './template-utils';

interface BuildErrors {
	error: Error;
	build: Build;
	didBuildPathExist: boolean;
}

export const DEFAULT_OPTIONS: TemplatesOptions = {
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

FileSystemNode.ignoreFiles = ['**/.gitkeep', '**/.tpskeep'];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RenderData = Record<string, any>;

/**
 * @class
 * @classdesc Create a new instance of a template
 */
export class Templates<TAnswers extends AnswersHash = AnswersHash> {
<<<<<<< HEAD
	public buildErrors: BuildErrors[] = [];
||||||| cbe053c
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
=======
	/**
	 * name of template
	 */
	public template: string;

	/**
	 * Templates options
	 */
	public opts: TemplatesOptions;

	public packages: Record<string, DirNode>;

	public packagesUsed: string[];

	private _defs: Record<string, string>;

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
>>>>>>> 00ff3e278b9d5e31ddc02fcc6b2107cac1ea3aee

	public _prompts?: Prompter<TAnswers>;

<<<<<<< HEAD
||||||| cbe053c
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

	public static async get<TPassedAnswers extends AnswersHash = AnswersHash>(
		templateName: string,
		opts: Partial<TemplateOptions> = {},
	): Promise<Templates<TPassedAnswers>> {
		return new Templates(templateName, opts);
	}

=======
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

	public static async get<TPassedAnswers extends AnswersHash = AnswersHash>(
		templateName: string,
		opts: Partial<TemplatesOptions> = {},
	): Promise<Templates<TPassedAnswers>> {
		return new Templates(templateName, opts);
	}

>>>>>>> 00ff3e278b9d5e31ddc02fcc6b2107cac1ea3aee
	/**
	 * Get all locations a template can be
	 *
	 * Templates can be in be:
	 * - any `.tps/` directory from the callers cwd and any directory above it
	 * - Any `node_module` directory from the callers cwd and any directory above it
	 */
	public static getTemplateLocations(cwd: string = TPS.CWD): string[] {
		return getTemplateLocations(cwd);
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

<<<<<<< HEAD
	public static async get<TTemplateAnswers>(
		name: string,
		_options: Partial<TemplatesOptions> = {},
	): Promise<Templates> {
		const tpsrc = await getTpsrc(name);
||||||| cbe053c
	constructor(templateName: string, opts: Partial<TemplateOptions> = {}) {
		if (!templateName || !is.string(templateName)) {
			throw new RequiresTemplateError();
		}
=======
	constructor(templateName: string, opts: Partial<TemplatesOptions> = {}) {
		if (!templateName || !is.string(templateName)) {
			throw new RequiresTemplateError();
		}
>>>>>>> 00ff3e278b9d5e31ddc02fcc6b2107cac1ea3aee

		const tpsrcOptions: Partial<TemplatesOptions> = tpsrc?.opts ?? {};

		const templateOptions: TemplateOptions = {
			...DEFAULT_OPTIONS,
			...pick(tpsrcOptions, [
				'force',
				'experimentalTemplateEngine',
				'hidden',
				'default',
				'defaultPackage',
			]),
			...pick(_options, [
				'force',
				'experimentalTemplateEngine',
				'hidden',
				'default',
				'defaultPackage',
			]),
		};

		const options: TemplatesOptions = {
			...tpsrc?.opts,
			..._options,
		};

		// options are being passed but we need to get this from tpsrc and settings
		const template = await Template.get<TTemplateAnswers>(
			name,
			templateOptions,
		);

		return new Templates<TTemplateAnswers>(template, tpsrc, options);
	}

	constructor(
		public template: Template<TAnswers>,
		public tpsrc: TpsrcTemplateConfig,
		public opts: TemplatesOptions,
	) {
		// do something
		this._prompts = new Prompter<TAnswers>(
			template.settingsFile?.prompts ?? [],
			{
				showHiddenPrompts: opts.hidden,
				default: opts.default,
			},
		);
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
	async loadPackages(newPackages: string | string[]): Promise<void> {
		await this.template.fetchPackages(newPackages);
	}

	/**
	 * @param {String} newPackage - package from the template you would like to use
	 */
	async loadPackage(newPackageName: string): Promise<void> {
		await this.template.fetchPackage(newPackageName);
	}

	/**
	 * Get answers
	 */
	getAnswers(): TAnswers {
		return this._prompts.answers;
	}

	/**
	 * Set answers for prompts
	 * @param answers - object of prompts answers. Key should be the name of the prompt and value should be the answer to it
	 */
	setAnswers(answers: Partial<TAnswers>): void {
		if (!this._prompts.hasPrompts()) {
			throw new NoPromptsError();
		}

		this._prompts.setAnswers(answers);
	}

	public hasPrompts(): boolean {
		return this._prompts.hasPrompts();
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

		await this.template.compile();

		await this._emitEvent('onRender', {
			dest: finalDest,
			buildPaths: pathsToCreate,
			hasBuildPaths: !buildInDest,
			createFile: (name: string, content: string) => {
				this.template.createFile(name, content, { force: this.opts.force });
			},
			createDirectory: (dir: string) => {
				this.template.createDirectory(dir);
			},
		});

		const builders: Promise<void>[] = pathsToCreate.map(async (buildPath) => {
			const build = new Build(buildPath, this.template, {
				buildInDest,
				buildNewFolder,
				wipe: this.opts.wipe,
				force: this.opts.force,
			});

			return this._renderBuildPath(build, data);
		});

		await Promise.all(builders);

		// TODO: When a event fails should we clean up the build path?
		await this._emitEvent('onRendered', {
			dest: finalDest,
			buildPaths: pathsToCreate,
		});

		// @ts-expect-error need to fix library
		if (is.array.empty(this.buildErrors)) {
			logger.tps.success('Finished rendering templates');

			// @ts-expect-error Not sure whats wrong here
			return Array.isArray(buildPaths) ? pathsToCreate : pathsToCreate[0];
		}

		logger.tps.info('Build Errors: %o', this.buildErrors.length);
		logger.tps.info(
			'Build Paths need to be cleaned %n',
			this.buildErrors.map(({ build }) => build.getDirectory()),
		);

		await Promise.all(
			this.buildErrors.map(async ({ build, didBuildPathExist }) => {
				await build.clean(buildNewFolder && !didBuildPathExist);
			}),
		);

		const errors = this.buildErrors.map(({ error }) => error);

		return Promise.reject(errors.length === 1 ? errors[0] : errors);
	}

	private async _renderBuildPath(
		build: Build,
		data: RenderData,
	): Promise<void> {
		const loggerGroup = build.getLogger();
		const doesBuildPathExist = await build.directoryExists();

		try {
			await this._emitEvent('onBuildPathRender', {
				buildPath: build.buildPath,
			});

			const answers = this._prompts.hasPrompts() ? this._prompts.answers : {};

			await build.render(answers, data);
		} catch (err) {
			loggerGroup.error('Build Path: %s %n', build.buildPath, err);
			this._scheduleCleanUpForBuild(build, err, doesBuildPathExist);
		} finally {
			logger.tps.printGroup(build.getLoggerName());
			await this._emitEvent('onBuildPathRendered', {
				buildPath: build.buildPath,
			});
		}
	}

	_scheduleCleanUpForBuild(
		build: Build,
		err: Error,
		didBuildPathExist: boolean,
	): void {
		build
			.getLogger()
			.info('Build Path schedule for cleaning %s %o', build.buildPath, {
				didBuildPathExist,
			});
		this.buildErrors.push({
			build,
			error: err,
			didBuildPathExist,
		});
	}

	async _answerRestOfPrompts(): Promise<void> {
		if (!this._prompts.hasPrompts()) return;

		const answers = await this._prompts.getAnswers();

		logger.tps.info('Answers from prompts %n', answers);

		await forEachAsync(
			Object.entries(answers),
			async ([answerName, answer]) => {
				if (this._prompts.getPrompt(answerName).isPkg()) {
					switch (true) {
						// @ts-expect-error need to fix library
						case is.undef(answer):
						case answer === null:
							break;
						// @ts-expect-error need to fix library
						case is.bool(answer):
							if (answer) {
								await this.loadPackage(answerName);
							}
							break;
						case typeof answer === 'string' && !!answer.length:
							await this.loadPackage(answer);
							break;
						case Array.isArray(answer) && !!answer.length:
							await this.loadPackages(answer);
							break;
						default:
							throw new Error(
								`Data type '${typeof answer}' is not supported as answer to a tps prompt`,
							);
					}
				}
			},
		);
	}

	// /**
	//  * Configurations
	//  */
	// _loadTpsrc(templateName: string): void {
	// 	const tpsrcfiles = cosmiconfigAllExampleSync(
	// 		TPS.CWD,
	// 		tpsrcConfig,
	// 		tpsrcSearchPlaces,
	// 	);

	// 	if (is.empty(tpsrcfiles)) {
	// 		logger.tps.info('No tps files to find: %n', {
	// 			cwd: TPS.CWD,
	// 			tpsrcSearchPlaces,
	// 		});
	// 	}

	// 	tpsrcfiles.reverse().forEach((tpsrc) => {
	// 		if (!tpsrc || tpsrc?.isEmpty) return;

	// 		logger.tps.info('Loading tpsrc from: %s %n', tpsrc.filepath, tpsrc);

	// 		this._loadTpsSpecificConfig(templateName, tpsrc.config);
	// 	});
	// }

	// private _loadTpsSpecificConfig(templateName: string, config: Tpsrc): void {
	// 	const templateConfig =
	// 		config[templateName] ??
	// 		config[`tps-${templateName}`] ??
	// 		config[stripPrefix(templateName, 'tps-')] ??
	// 		null;

	// 	if (templateConfig && is.object(templateConfig)) {
	// 		logger.tps.info('Loading configuration: %n', templateConfig);
	// 		const { answers = {}, opts = {} } = templateConfig;
	// 		this.opts = {
	// 			...this.opts,
	// 			...opts,
	// 		};

	// 		if (is.object(answers) && !is.empty(answers)) {
	// 			// TODO: Is this the best way to handle this?
	// 			this.setAnswers(answers as TAnswers);
	// 		}
	// 	}
	// }

	private async _emitEvent<TEvent extends keyof SettingsFile['events']>(
		event: TEvent,
		...args: Parameters<SettingsFile['events'][TEvent]> extends [
			Templates,
			...infer Rest,
		]
			? Rest
			: never
	): Promise<void> {
		logger.tps.info(`Running event ${event}`);
		const events = this.template.settingsFile?.events ?? null;
		if (events && event in events && typeof events[event] === 'function') {
			logger.tps.info(`Running ${event} function...`);
			// @ts-expect-error idk lol
			await events[event]?.(this, ...args);
		}
	}
}

export { TemplatesOptions } from '@tps/types/templates';
