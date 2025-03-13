/* eslint-disable @typescript-eslint/no-explicit-any */
import templateEngine from '@tps/templates/template-engine';
import dot from '@tps/templates/dot';
import * as path from 'path';
import fs from 'fs';
import { DotError } from '@tps/errors';
import { FileNode } from '../fileSystemTree';

interface FileOptions {
	force?: boolean;
	useExperimentalTemplateEngine?: boolean;
}

const DEFAULT_OPTS: FileOptions = {
	force: false,
	useExperimentalTemplateEngine: false,
};

/**
 * File
 */
const DOT_EXTENTION_MATCH = /\.(dot|jst|tps|def)$/i;

class File {
	/**
	 * Name of the file with all extensions. If the name includes a `.tps`, `.def`,
	 * `.jst`, or `.dot` extension we strip this from the name and mark `isDot` as true
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
	public readonly isDot: boolean = false;

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

		this.location = dir;

		this.name = base;

		if (DOT_EXTENTION_MATCH.test(this.name)) {
			// strip dot extension
			this.isDot = true;
			this.name = this.name.replace(DOT_EXTENTION_MATCH, '').trim();
		}

		this.options = {
			...DEFAULT_OPTS,
			...options,
		};
		this.engine = this.options.useExperimentalTemplateEngine
			? templateEngine
			: dot;
	}

	private fileName(data: Record<string, any> = {}, defs = {}): string {
		let fileName;
		try {
			fileName = this.engine.template(this.name, null, defs)(data);
		} catch (e) {
			console.log('file name error', e);
		}
		return this._addDefaultExtention(fileName);
	}

	private async getContents(
		location: string,
		data: Record<string, any> = {},
		defs: Record<string, string> = {},
	) {
		const realData = {
			...data,
			file: this.fileName(data, defs),
			dest: this.dest(location, data, defs),
		};
		try {
			return this.isDot
				? // How could we cache this here :thinking: this is happening for every dot file
					this.engine.template(this.contents, null, defs)(realData)
				: this.contents;
		} catch (e) {
			throw new DotError(this.name, this.file, e.message);
		}
	}

	public async render(
		location: string,
		data: Record<string, any>,
		defs: any,
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

	public dest(dest: string, data: Record<string, any>, defs: any): string {
		return path.join(this._buildParentDir(dest), this.fileName(data, defs));
	}
}

export default File;
