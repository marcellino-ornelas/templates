import path from 'path';
import fs from 'fs';
import minimatch from 'minimatch';
import { isDir } from '@tps/utilities/fileSystem';
import { couldMatchObj } from '@tps/utilities/helpers';
import FileSystemNode from './fileSystemNode';
import FileNode from './fileNode';

export class DirectoryNode extends FileSystemNode {
  constructor(name, parentDirNode, verbose) {
    let parentDir = parentDirNode;
    if (name && !parentDirNode) {
      parentDir = path.dirname(name);
      name = path.basename(name);
    }
    // this.verbose = verbose || false;

    super(name, 'dir', parentDir, verbose);
    this._renderChildren();
  }

  toObject() {
    const obj = super.toObject();

    obj.children = this.children.map((fileNode) => {
      return fileNode.toObject();
    });

    return obj;
  }

  _renderChildren() {
    let dirContents;

    try {
      dirContents = FileSystemNode.fs.readdirSync(this.path);
    } catch (e) {
      console.log(e);
      throw new Error(`[TPS ERROR] Path is not a directory (${this.path})`);
    }

    dirContents
      .filter(
        (...args) => !minimatch.filter(FileSystemNode.ignoreFiles)(...args)
      )
      .forEach((name) => {
        const dirContentPath = path.join(this.path, name);
        const ContentType = isDir(dirContentPath) ? DirectoryNode : FileNode;
        const newFSNode = new ContentType(name, this, this.verbose);

        this.addChild(newFSNode);
      });
  }

  eachChild(cb) {
    this.breathFirstEach((fsNode) => {
      if (this !== fsNode) {
        cb(fsNode);
      }
    });
  }

  selectChildren(cb) {
    const found = [];
    this.eachChild((fsNode) => {
      if (cb(fsNode)) {
        found.push(fsNode);
      }
    });
    return found;
  }

  find(selectBy = {}) {
    return this.selectChildren((fsNode) => {
      // console.log(fsNode.path);
      return couldMatchObj(selectBy, fsNode);
    });
  }
}

export default DirectoryNode;
