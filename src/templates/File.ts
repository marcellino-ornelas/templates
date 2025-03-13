/* eslint-disable @typescript-eslint/no-explicit-any */
import templateEngine from '@tps/templates/template-engine';
import dot from '@tps/templates/dot';
import * as path from 'path';
import fs from 'fs';
import { DotError } from '@tps/errors';
import { FileNode } from '../fileSystemTree';

type Defs = Record<string, string>;
type Data = Record<string, unknown>;

interface FileOptions {
	force?: boolean;
	useExperimentalTemplateEngine?: boolean;
}

const DEFAULT_OPTS: FileOptions = {
	force: false,
	useExperimentalTemplateEngine: false,
};

/**
 * Extensions that should be considered as dynamic files
 */
const DYNAMIC_EXTENTION_MATCH = /\.(dot|jst|tps|def)$/i;

/**
 * File
 */
class File {
	/**
	 * Name of the file with all extensions. If the name includes a `.tps`, `.def`,
	 * `.jst`, or `.dot` extension we strip this from the name and mark `isDynamic` as true
	 *
	 * @example "index.js"
	 * @example "nav.css"
	 * @example ".tpsrc"
	 */
	public readonly name: string;

	/**
	 * The directory this file should be in when rendered
	 *
	 * @example "./path/to/folder"
	 */
	public readonly location: string;

	/**
	 * File should be processed as a dynamic file
	 */
	public readonly isDynamic: boolean = false;

	/**
	 * The templating language engine
	 */
	public readonly engine: any;

	/**
	 * File options
	 */
	public options: FileOptions;

	public _dotNameCompiled: dot.RenderFunction;

	/**
	 * Generate a File from a FileNode
	 */
	static fromFileNode(fileNode: FileNode, options: Partial<FileOptions> = {}) {
		return new File(
			// pathFromRoot excludes the package name
			path.join(path.dirname(fileNode.pathFromRoot), fileNode.name),
			fs.readFileSync(fileNode.path)?.toString(),
			options,
		);
	}

	constructor(
		/**
		 * Full path to the file. This value will preserve the
		 * `.tps`, `.def`, `.jst` or `.dot`
		 *
		 * @example "./path/to/file/index.js"
		 * @example "./path/to/file/index.js.dot"
		 */
		public file: string,
		/**
		 * File contents
		 */
		public contents: string,
		options: Partial<FileOptions> = {},
	) {
		const { dir, base } = path.parse(file);

		this.isDynamic = DYNAMIC_EXTENTION_MATCH.test(base);

		this.location = dir;

		this.name = this.isDynamic
			? base.replace(DYNAMIC_EXTENTION_MATCH, '').trim()
			: base;

		this.options = {
			...DEFAULT_OPTS,
			...options,
		};
		this.engine = this.options.useExperimentalTemplateEngine
			? templateEngine
			: dot;
	}

	/**
	 * Get the final result of the file name for this file. If the name has any
	 *
	 * @param data - Meta data to pass to the template engine
	 * @param defs - defs to send to the temnplate engine
	 */
	private fileName(data: Data = {}, defs: Defs = {}): string {
		let fileName;
		try {
			fileName = this.engine.template(this.name, null, defs)(data);
		} catch (e) {
			console.log('file name error', e);
		}
		return this._addDefaultExtention(fileName);
	}

	/**
	 * Get the file contents for this file. If file is a dynamic file then
	 * this will be the final result after the template engine process it.
	 *
	 * @param location - directory to render this file into
	 * @param data - Meta data to pass to the template engine
	 * @param defs - defs to send to the temnplate engine
	 */
	private async getContents(
		location: string,
		data: Data = {},
		defs: Defs = {},
	) {
		const realData = {
			...data,
			file: this.fileName(data, defs),
			dest: this.dest(location, data, defs),
		};
		try {
			return this.isDynamic
				? // How could we cache this here :thinking: this is happening for every dot file
					this.engine.template(this.contents, null, defs)(realData)
				: this.contents;
		} catch (e) {
			throw new DotError(this.name, this.file, e.message);
		}
	}

	/**
	 * Render this file to a specific location
	 *
	 * @param location - directory to render this file into
	 * @param data - Meta data to pass to the template engine
	 * @param defs - defs to send to the temnplate engine
	 */
	public async render(
		location: string,
		data: Data,
		defs: Defs,
	): Promise<string> {
		const dest = this.dest(location, data, defs);

		if (this.options.force) {
			await fs.promises.rm(dest, { force: true });
		}

		const contents = await this.getContents(location, data, defs);

		await fs.promises.writeFile(dest, contents, { flag: 'w' });

		return dest;
	}

	private _addDefaultExtention(name: string): string {
		let fileName = name;

		// Might need to change
		if (!/\./g.test(name)) {
			fileName += '.js';
		}

		return fileName;
	}

	private _buildParentDir(newDest: string): string {
		return path.join(newDest, this.location);
	}

	/**
	 * Full destination to render this file to.
	 *
	 * @param location - directory to render this file into
	 * @param data - Meta data to pass to the template engine
	 * @param defs - defs to send to the temnplate engine
	 */
	public dest(location: string, data: Data, defs: Defs): string {
		return path.join(this._buildParentDir(location), this.fileName(data, defs));
	}
}

export default File;
