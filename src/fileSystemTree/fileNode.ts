import * as path from 'path';
import fs from 'fs';
import FileSystemNode from './fileSystemNode';

export class FileNode extends FileSystemNode {
	public fileName: string;

	public ext: string;

	constructor(name, parentDirectory, verbose = false) {
		super(name, 'file', parentDirectory, verbose);

		// Get the extention and real name of the file
		const { ext, name: fileName } = path.parse(name);

		this.fileName = fileName;
		this.ext = ext;

		this.children = [];
		// this.data = this._getFileData();
	}

	_getFileData(): Buffer {
		return fs.readFileSync(this.path);
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
	addChild<TValue extends FileSystemNode>(_: TValue): TValue {
		throw Error('Cannot add children to FileNodes');
	}

	hasChildren(): boolean {
		return false;
	}
}

export default FileNode;
