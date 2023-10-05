/* eslint-disable @typescript-eslint/no-explicit-any */
import templateEngine from '@tps/templates/template-engine';
import dot from '@tps/templates/dot';
import * as path from 'path';
import fs from 'fs';
import { DotError } from '@tps/errors';
import { FileNode } from './fileSystemTree';

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
const DOT_EXTENTION_MATCH = /.(dot|jst|def)$/i;
// const DOT_INTERPOLATION_MATCH = /\{\{([\s\S]+?)\}\}/g;
// const FS_FAIL_IF_EXIST = { flags: 'wx' };

class File {
	public _name: string;

	public isDot: boolean;

	public engine: any;

	public relDirectoryFromPkg: string;

	public opts: FileOptions;

	public _dotNameCompiled: dot.RenderFunction;

	public src: string;

	public fileNode: FileNode;

	public fileData: string;

	public fileDataTemplate: (
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		data: Record<string, any>,
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		defs: any,
		dest: string
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	) => any;

	constructor(fileNode: FileNode, opts: Partial<FileOptions> = {}) {
		let fileName = fileNode.name;

		if (DOT_EXTENTION_MATCH.test(fileName)) {
			// strip dot extension
			this.isDot = true;
			fileName = fileName.replace(DOT_EXTENTION_MATCH, '').trim();
		}
		this.relDirectoryFromPkg = path.dirname(fileNode.pathFromRoot);
		this.opts = opts;
		this._name = fileName;
		this.engine = this.opts.useExperimentalTemplateEngine
			? templateEngine
			: dot;
		this._dotNameCompiled = this.engine.template(this._name);
		this.src = fileNode.path;
		this.fileNode = fileNode;
		const fileData = fs.readFileSync(this.src)?.toString();
		this.fileDataTemplate = (data, defs, dest) => {
			const realData = {
				...data,
				file: this.fileName(data),
				dest: this.dest(dest, data),
			};
			try {
				return this.isDot
					? // How could we cache this here :thinking: this is happening for every dot file
					  this.engine.template(fileData, null, defs)(realData)
					: fileData;
			} catch (e) {
				throw new DotError(this.fileNode, e.message);
			}
		};
	}

	fileName(data: Record<string, any> = {}): string {
		let fileName;
		try {
			fileName = this._dotNameCompiled(data);
		} catch (e) {
			console.log('file name error', e);
		}
		return this._addDefaultExtention(fileName);
	}

	renderDotFile(dest: string, fileData: string): Promise<string> {
		return Promise.resolve()
			.then(() => this.opts.force && fs.promises.rm(dest, { force: true }))
			.catch((e) => {
				console.log('this should be force', e);
			})
			.then(() => fs.promises.writeFile(dest, fileData, { flag: 'w' }))

			.then(() => Promise.resolve(dest))
			.catch((error) => Promise.reject(error));
	}

	renderFile(dest: string): Promise<string> {
		return Promise.resolve()
			.then(() => this.opts.force && fs.promises.rm(dest, { force: true }))
			.then(
				() =>
					new Promise((resolve, reject) => {
						const srcFile = fs.createReadStream(this.src, {
							flags: 'r',
						});

						srcFile.on('error', (error) => {
							console.log('Read Stream error', error);
							reject(error);
						});

						const destFile = fs.createWriteStream(dest, { flags: 'wx' });

						destFile.on('error', (err) => {
							console.log('dest', dest);
							console.log('write stream error', err);
							reject(err);
						});

						destFile.on('finish', () => resolve(dest));

						srcFile.pipe(destFile);
					})
			);
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
		return path.join(newDest, this.relDirectoryFromPkg);
	}

	dest(dest: string, data: Record<string, any>): string {
		return path.join(this._buildParentDir(dest), this.fileName(data));
	}
}

File.prototype.isDot = false;

export default File;
