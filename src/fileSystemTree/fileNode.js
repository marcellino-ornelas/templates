import FileSystemNode from './fileSystemNode';
import path from 'path';
import fs from 'fs';

export class FileNode extends FileSystemNode {
  constructor(name, parentDirectory, verbose) {
    super(name, 'file', parentDirectory, verbose);

    // Get the extention and real name of the file
    const { ext, name: fileName } = path.parse(name);

    this.fileName = fileName;
    this.ext = ext;

    this.children = undefined;
    // this.data = this._getFileData();
  }

  _getFileData() {
    return fs.readFileSync(this.path);
  }

  addChild() {
    throw Error('Cannot add children to FileNodes');
  }

  hasChildren() {
    return false;
  }
}

export default FileNode;
