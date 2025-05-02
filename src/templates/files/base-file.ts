export interface FileOptions {
	force?: boolean;
	useExperimentalTemplateEngine?: boolean;
}

/**
 * Global store that allows storing of information. This can be used to
 * share data between different files
 */
const meta: Record<string, any> = {};

export class File {
	/**
	 * When this file should be processed
	 */
	public process: 'pre-render' | 'render' = 'render';

	/**
	 * When this file should be processed
	 */
	public type: 'modifier' | 'content' = 'content';

	/**
	 * Order number this file should be triggered
	 */
	public order: number;

	// public extentionMatch: string = null;

	constructor(
		/**
		 * Relative path to the file.
		 *
		 * @example "./path/to/file/index.js"
		 * @example "./path/to/file/index.js.dot"
		 */
		public file: string,
		/**
		 * File contents
		 */
		public contents: string | null = null,
		/**
		 * Options
		 */
		public options: Partial<FileOptions> = {},
	) {}

	match() {
		return true;
	}

	public render() {}
}
