import * as path from 'path';
import fs from 'fs/promises';
import { isDirAsync } from '@tps/utilities/fileSystem';

interface BuildBuilt {
	files: string[];
	directories: string[];
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
		public readonly buildInDest: boolean,
		public readonly buildNewFolder: boolean,
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
		return this.buildInDest || this.buildNewFolder
			? this.buildPath
			: this.directory;
	}

	/**
	 * Checks to see if the final directory exists or not
	 */
	public async directoryExists(): Promise<boolean> {
		return isDirAsync(this.getDirectory());
	}

	/**
	 * Destroy the final directory
	 */
	async wipe(): Promise<void> {
		// we can only remove a directory thats going to be built.
		if (this.buildInDest || !this.buildNewFolder) {
			throw new Error(
				'Cannot wipe directory that is being build in dest or without a new folder',
			);
		}

		await fs.rm(this.getDirectory(), { force: true, recursive: true });
	}
}
