import * as path from 'path';

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
		public readonly buildPath: string,
		public readonly buildInDest: boolean,
		public readonly buildNewFolder: boolean,
	) {
		// should only happen if build in folder is false
		// if (buildNewFolder) {
		const { name, dir } = path.parse(buildPath);

		this.name = name;
		this.directory = dir;
		// }
	}

	/**
	 * Final directory to create instance contents in.
	 *
	 *
	 */
	public getFinalDirectory() {
		return this.buildInDest || this.buildNewFolder
			? this.buildPath
			: this.directory;
	}
}
