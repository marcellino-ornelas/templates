import * as path from 'path';
import { promises as fs } from 'fs';
import { isDirAsync } from '@tps/utilities/fileSystem';
import CreateDebugGroup from '@tps/utilities/logger/createDebugGroup';

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

	constructor(
		/**
		 * Full absolute build path
		 *
		 * @example "/Users/lornelas/Templates/my-instance"
		 * @example "/Users/lornelas/Templates/some/extra/path/my-instance"
		 * @example "/Users/lornelas/Templates"
		 */
		public readonly buildPath: string,
		public opts: BuildOptions,
	) {
		// should only happen if build in folder is false
		// if (buildNewFolder) {
		const { name, dir } = path.parse(buildPath);

		// TODO: when `buildInDest` is true, `name` should be null
		this.name = name;
		this.directory = dir;
		// }
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
		return this.opts.buildInDest || this.opts.buildNewFolder
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
	public async wipe(): Promise<void> {
		// we can only remove a directory thats going to be built.
		if (this.opts.buildInDest || !this.opts.buildNewFolder) {
			throw new Error(
				'Cannot wipe directory that is being build in dest or without a new folder',
			);
		}

		await fs.rm(this.getDirectory(), { force: true, recursive: true });
	}

	// public getLogger(): CreateDebugGroup {

	// }
}
