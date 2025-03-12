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

/*
 * File
 */
const DOT_EXTENTION_MATCH = /\.(dot|jst|tps|def)$/i;

class File {
	public name: string;

	public location: string;

	public isDot: boolean;

	public engine: any;

	// public relDirectoryFromPkg: string;

	public opts: FileOptions;

	public _dotNameCompiled: dot.RenderFunction;

	public fileNode: FileNode;

	// public fileData: string;

	public fileDataTemplate: (
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		data: Record<string, any>,
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		defs: any,
		dest: string,
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	) => any;

	static fromFileNode(fileNode: FileNode, opts: Partial<FileOptions> = {}) {
		return new File(
			// pathFromRoot excludes the package name
			path.join(path.dirname(fileNode.pathFromRoot), fileNode.name),
			fs.readFileSync(fileNode.path)?.toString(),
			opts,
		);
	}

	constructor(
		/**
		 * Relative File path
		 */
		public filePath: string,
		/**
		 * File contents
		 */
		public contents: string,
		opts: Partial<FileOptions> = {},
	) {
		const { dir, base } = path.parse(filePath);

		this.name = base;

		this.location = dir;

		if (DOT_EXTENTION_MATCH.test(this.name)) {
			// strip dot extension
			this.isDot = true;
			this.name = this.name.replace(DOT_EXTENTION_MATCH, '').trim();
		}

		this.opts = {
			...DEFAULT_OPTS,
			...opts,
		};
		this.engine = this.opts.useExperimentalTemplateEngine
			? templateEngine
			: dot;
	}

	fileName(data: Record<string, any> = {}, defs = {}): string {
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
			throw new DotError(this.name, this.filePath, e.message);
		}
	}

	async render(
		location: string,
		data: Record<string, any>,
		defs: any,
	): Promise<string> {
		const dest = this.dest(location, data, defs);

		if (this.opts.force) {
			await fs.promises.rm(dest, { force: true });
		}

		const contents = await this.getContents(location, data, defs);

		await fs.promises.writeFile(dest, contents, { flag: 'w' });

		return dest;
	}

	_addDefaultExtention(name: string): string {
		let fileName = name;

		// Might need to change
		if (!/\./g.test(name)) {
			fileName += '.js';
		}

		return fileName;
	}

	_buildParentDir(newDest: string): string {
		return path.join(newDest, this.location);
	}

	dest(dest: string, data: Record<string, any>, defs: any): string {
		return path.join(this._buildParentDir(dest), this.fileName(data, defs));
	}
}

File.prototype.isDot = false;

export default File;
