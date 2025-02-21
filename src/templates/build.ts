import colors from 'ansi-colors';
import * as path from 'path';
import { promises as fs } from 'fs';
import DirectoryNode from '@tps/fileSystemTree';
import CreateDebugGroup from '@tps/utilities/logger/createDebugGroup';
import logger from '@tps/utilities/logger';
import { isDirAsync } from '@tps/utilities/fileSystem';
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
	 * Else contents will be rendered in `directory`
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

	// private async checkForFiles(renderData: RenderData): Promise<void> {
	// 	const directory = this.getDirectory();

	// 	for (let i = 0; i < this.compiledFiles.length; i++) {
	// 		const file = this.compiledFiles[i];
	// 		const finalDest = file.dest(directory, renderData, this._defs);

	// 		// eslint-disable-next-line no-await-in-loop -- we want to go one by one and not send tons of requests
	// 		if (await isFileAsync(finalDest)) {
	// 			throw new FileExistError(finalDest);
	// 		}
	// 	}
	// }

	// /**
	//  * Render the build path
	//  */
	// public async render(
	// 	renderData: RenderData,
	// 	hackyCallbackWhenFilesNeedToBeWiped?: () => void,
	// ): Promise<void> {
	// 	const loggerGroup = this.getLogger();

	// 	const wasWiped = this.maybeWipe(hackyCallbackWhenFilesNeedToBeWiped);

	// 	if (!wasWiped && !this.options.force) {
	// 		loggerGroup.info('Checking to see if there are duplicate files');
	// 		return this.checkForFiles(renderData);
	// 	}
	// }

	/**
	 * Creates all directories our instance needs. This will use all
	 * directories in any package that was loaded.
	 */
	public async renderDirectories() {
		const dirTracker: Record<string, boolean> = {};

		const directory = this.getDirectory();

		const loggerGroup = this.getLogger();
		loggerGroup.info('Rendering directories in %s', directory);

		const dirsInProgress = Object.entries(this.template.packages).map(
			async ([, pkg]): Promise<void> => {
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

							// this.successfulBuilds.dirs.push(dirPathInNewLocation);
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
			},
		);

		await Promise.all(dirsInProgress);

		loggerGroup.info('All directories have been created');
	}
}
