import colors from 'ansi-colors';
import * as path from 'path';
import { promises as fs } from 'fs';
import DirectoryNode from '@tps/fileSystemTree';
import CreateDebugGroup from '@tps/utilities/logger/createDebugGroup';
import logger from '@tps/utilities/logger';
import { isDirAsync, isFileAsync } from '@tps/utilities/fileSystem';
import { BuildError, FileExistError } from '@tps/errors';
import { AnswersHash } from '@tps/types/settings';
import * as utils from './utils';
import type { Template } from './template';

interface BuildBuilt {
	files: string[];
	directories: string[];
}

interface BuildOptions {
	buildInDest: boolean;
	buildNewFolder: boolean;
	wipe: boolean;
	force: boolean;
}

const DEFAULT_OPTS: BuildOptions = {
	buildInDest: false,
	buildNewFolder: true,
	wipe: false,
	force: false,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RenderData = Record<string, any>;

export class Build {
	/**
	 * Name of the build if present.
	 *
	 * Builds that are being created in the destination dont have names.
	 */
	public readonly name: string;

	/**
	 * Directory to render the contents into.
	 *
	 * If `buildInNewFolder` is `true`, then a directory of `name`
	 * will be created in this directory and contents will be rendered in that directory.
	 * else contents will be rendered in `directory`
	 */
	public readonly directory: string;

	/**
	 * Files and directories that were created during render
	 */
	public built: BuildBuilt = { files: [], directories: [] };

	public options: BuildOptions;

	constructor(
		/**
		 * Full absolute build path
		 *
		 * @example "/Users/lornelas/Templates/my-instance"
		 * @example "/Users/lornelas/Templates/some/extra/path/my-instance"
		 * @example "/Users/lornelas/Templates"
		 */
		public readonly buildPath: string,
		public readonly template: Template,
		options: Partial<BuildOptions> = {},
	) {
		// should only happen if build in folder is false
		// if (buildNewFolder) {
		const { name, dir } = path.parse(buildPath);

		// TODO: when `buildInDest` is true, `name` should be null
		this.name = name;
		this.directory = dir;
		// }

		this.options = {
			...DEFAULT_OPTS,
			...options,
		};
	}

	/**
	 * Final directory to create instance contents in.
	 *
	 * If `buildInDest` or `buildNewFolder` then we use the supplied buildPath. Note!
	 * when `buildInDest` is true, the build path wont have a instance name.
	 *
	 * TODO: when `buildInDest` is true, `name` should be null
	 */
	public getDirectory() {
		return this.options.buildInDest || this.options.buildNewFolder
			? this.buildPath
			: this.directory;
	}

	/**
	 * Checks to see if the final directory exists or not
	 */
	public async directoryExists(): Promise<boolean> {
		return isDirAsync(this.getDirectory());
	}

	public async createDirectory() {
		return fs.mkdir(this.getDirectory(), { recursive: true });
	}

	/**
	 * Destroy the final directory
	 */
	private async wipe(): Promise<void> {
		// we can only remove a directory thats going to be built.
		if (this.options.buildInDest || !this.options.buildNewFolder) {
			throw new Error(
				'Cannot wipe directory that is being build in dest or without a new folder',
			);
		}

		await fs.rm(this.getDirectory(), { force: true, recursive: true });
	}

	/**
	 * Wipes the directory if it should. Will return a boolean on whether or not
	 * directory was wiped.
	 */
	public async maybeWipe(
		hackyCallbackWhenFilesNeedToBeWiped?: () => void,
	): Promise<boolean> {
		const loggerGroup = this.getLogger();
		if (await this.directoryExists()) {
			/**
			 * If `wipe=true` then we need to delete the directory that we will be overriding.
			 * But if `newFolder=false` then we need to skip the wipe command because we are not creating a new directory.
			 */
			if (this.options.wipe && !this.options.buildInDest) {
				if (!this.options.buildNewFolder) {
					loggerGroup.info(
						'Skipping wipe because we are not building a new folder',
					);

					hackyCallbackWhenFilesNeedToBeWiped?.();
					return false;
				}
				loggerGroup.info('Wiping destination %s', this.getDirectory());
				await this.wipe();
				return true;
			}
		} else {
			loggerGroup.info('Build path does not exist...');
		}

		return false;
	}

	public getLoggerName(): string {
		return `render_${this.buildPath}`;
	}

	public getLogger(clear: boolean = false): CreateDebugGroup {
		return logger.tps.group(this.getLoggerName(), {
			clear,
		});
	}

	public async checkForConflicts(
		dest: string,
		data: RenderData,
	): Promise<void> {
		const { files, defs } = this.template;

		for (let i = 0; i < files.length; i++) {
			const file = files[i];
			const finalDest = file.dest(dest, data, defs);

			// eslint-disable-next-line no-await-in-loop
			if (await isFileAsync(finalDest)) {
				throw new FileExistError(finalDest);
			}
		}
	}

	/**
	 * Render the build path
	 */
	public async render(
		answers: AnswersHash = {},
		data: RenderData = {},
	): Promise<void> {
		const realBuildPath = this.getDirectory();
		const loggerGroup = this.getLogger();
		const doesBuildPathExist = await this.directoryExists();
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

		const renderData = {
			...data,
			packages: this.template.packagesUsed,
			template: this.template.name,
			answers,
			a: answers,
			utils,
			u: utils,
			name: this.name,
			dir: this.directory,
		};

		const marker = colors.magenta('*'.repeat(this.buildPath.length + 12));

		loggerGroup.info(`\n${marker}\nBuild Path: ${this.buildPath}\n${marker}`);

		loggerGroup.info('Render config: %n', {
			name: renderData.name,
			buildPath: this.buildPath,
			'Final Destination': realBuildPath,
			doesBuildPathExist,
			buildInDest: this.options.buildInDest,
			buildNewFolder: this.options.buildNewFolder,
		});

		const wasWiped = await this.maybeWipe(() => {
			// super hacky yes i know. The reason this needs to happen is because
			// when were using wipe but were not building a new folder we need to make sure all
			// files that already exist get overridden
			this.template.files.forEach((file) => {
				// eslint-disable-next-line no-param-reassign
				file.options.force = true;
			});
		});

		loggerGroup.info('Build was wiped', wasWiped);

		/**
		 * when wipe=true but buildNewFolder=false we need to act like `force` and not
		 * check for files.
		 */
		const shouldWipeButNoNewFolder =
			this.options.wipe && !this.options.buildNewFolder;

		/**
		 * Check for file conflicts when:
		 * - folder was not wiped
		 * - force option is not true
		 * - when wipe but no new folder
		 */
		if (!wasWiped && !this.options.force && !shouldWipeButNoNewFolder) {
			loggerGroup.info('Checking to see if there are duplicate files');
			await this.checkForConflicts(realBuildPath, renderData);
		}

		// Create a new folder unless told not to
		// if we are building the template in dest folder don't create new folder
		if (
			!this.options.buildInDest &&
			(this.options.buildNewFolder || !(await this.directoryExists()))
		) {
			loggerGroup.info('Creating real build path %s', realBuildPath);
			await this.createDirectory().catch((err) => {
				loggerGroup.warn('Building build path folder had a issue %n', err);
			});
		} else {
			loggerGroup.info('Not creating real build path %s', realBuildPath);
		}

		await this.renderDirectories();

		await this.renderFiles(renderData);

		loggerGroup.success(
			`Build Path: %s ${colors.green.italic('(created)')}`,
			this.buildPath,
		);
	}

	/**
	 * Creates all directories our instance needs. This will use all
	 * directories in any package that was loaded.
	 */
	private async renderDirectories() {
		const dirTracker: Record<string, boolean> = {};

		const directory = this.getDirectory();

		const loggerGroup = this.getLogger();
		loggerGroup.info('Rendering directories in %s', directory);

		const dirsInProgress = this.template
			.usedPackages()
			.map(async (pkg): Promise<void> => {
				const dirs = pkg.find({ type: 'dir' });

				const dirsGettingCreated = dirs.map(
					async (dirNode: DirectoryNode): Promise<void> => {
						/* skip if directory has already been made */
						if (dirNode.path in dirTracker) return;
						const dirPathRelativeFromPkg = dirNode.getRelativePathFrom(
							pkg,
							false,
						);
						const dirPathInNewLocation = path.join(
							directory,
							dirPathRelativeFromPkg,
						);

						dirTracker[dirNode.path] = true;
						if (await isDirAsync(dirPathInNewLocation)) {
							return;
						}

						try {
							await fs.mkdir(dirPathInNewLocation, {
								recursive: true,
							});

							this.built.directories.push(dirPathInNewLocation);

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
			});

		await Promise.all(dirsInProgress);

		loggerGroup.info(
			'Extra directories that need to be created %n',
			this.template.extraDirectories,
		);

		loggerGroup.info('Creating extra directories:');
		/**
		 * Create all extra directories
		 */
		await Promise.all(
			this.template.extraDirectories.map(async (dir) => {
				const newDir = path.join(directory, dir);

				try {
					await fs.mkdir(newDir, { recursive: true });

					this.built.directories.push(newDir);

					loggerGroup.info(
						`   - %s ${colors.green.italic('(created)')}`,
						newDir,
					);
				} catch (e) {
					loggerGroup.info(`   - %s ${colors.red.italic('(Failed)')}`, newDir);

					throw e;
				}
			}),
		);

		loggerGroup.info('All directories have been created');
	}

	/**
	 * Creates all files that our template uses in `buildPath` folder
	 * @param {Object} [data={}] - data passed in for dot
	 */
	private async renderFiles(data: RenderData): Promise<void> {
		const loggerGroup = this.getLogger();
		const location = this.getDirectory();
		loggerGroup.info('Rendering files');

		const results = await Promise.allSettled(
			this.template.files.map(async (file) => {
				const type = file.isDynamic ? 'Dynamic File' : 'File';
				const dest = file.dest(this.buildPath, data, this.template.defs);
				let failed = false;

				try {
					await file.render(location, data, this.template.defs);

					this.built.files.push(dest);
				} catch (error) {
					failed = true;
					throw error;
				} finally {
					const status = failed
						? colors.red('Failed')
						: colors.green('Created');

					loggerGroup.info(
						` - %s ${colors.cyan.italic(`(${type})`)} (${status})`,
						file.dest(this.buildPath, data, this.template.defs),
					);
				}
			}),
		);

		const errors: Error[] = results
			.filter((result) => result.status === 'rejected')
			.map((result) => result.reason);

		if (errors.length) {
			loggerGroup.error('Build path failed %s', this.buildPath);
			throw new BuildError(this.buildPath, errors);
		}
	}

	/**
	 * Delete everything that was created in this build. This will run if any file or directory
	 * error when being created. We dont want to leave broken templates created
	 * so this function will delete everything that this template built
	 */
	public async clean(buildNewFolder: boolean): Promise<void> {
		let buildPath = this.getDirectory();

		logger.tps.info('Processing build cleanup %s %o', buildPath, {
			buildNewFolder,
		});

		const buildPathNeedsSlash = buildPath[buildPath.length - 1] === path.sep;

		if (!buildPathNeedsSlash) {
			buildPath += path.sep;
		}

		if (buildNewFolder) {
			await fs.rm(buildPath, { force: true, recursive: true });
		}

		// eslint-disable-next-line prefer-const
		let { directories, files } = this.built;

		const filesIsEmpty: boolean = !files.length;
		const dirsIsEmpty: boolean = !directories.length;

		if (filesIsEmpty && dirsIsEmpty) {
			logger.tps.success('Nothing to clean... Moving on to next');
			return;
		}

		if (!dirsIsEmpty) {
			const dirsThatMatch = directories.filter((dir) =>
				dir.includes(buildPath),
			);

			if (dirsThatMatch.length) {
				logger.tps.info('Cleaning directories %n', dirsThatMatch);
			}

			for (let i = 0; i < dirsThatMatch.length; i++) {
				const dir = dirsThatMatch[i];

				try {
					// eslint-disable-next-line no-await-in-loop
					await fs.rm(dir, { force: true, recursive: true });
					logger.tps.success(` - %s ${colors.green.italic('(deleted)')}`, dir);
				} catch (err) {
					logger.tps.error('Clean up failed when deleting directories %n', err);
				}

				// if directory is removed then we can remove all child files
				if (!filesIsEmpty) {
					files = files.filter((file) => !file.includes(dir));
				}
			}
		}

		if (!filesIsEmpty) {
			const filesThatMatch = files.filter((file) => file.includes(buildPath));

			if (filesThatMatch.length) {
				logger.tps.info('Cleaning files %n', filesThatMatch);
			}

			await Promise.all(
				files.map(async (file) => {
					try {
						await fs.rm(file, { force: true });
						logger.tps.success(
							` - %s ${colors.green.italic('(deleted)')}`,
							file,
						);
					} catch (err) {
						logger.tps.error('Clean up failed when deleting files %n', err);
					}
				}),
			);
		}

		logger.tps.success('Clean up finished');
	}
}
