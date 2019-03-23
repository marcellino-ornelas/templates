import FileSystemNode from './fileSystemNode';
import FileNode from './fileNode';
import path from 'path';
import fs from 'fs';
import { isDir } from '@tps/utilities/fileSystem';
import { couldMatchObj } from '@tps/utilities/helpers';

export class DirectoryNode extends FileSystemNode {
  constructor(name, parentDirNode, verbose) {
    if (name && !parentDirNode) {
      parentDirNode = path.dirname(name);
      name = path.basename(name);
    }
    // this.verbose = verbose || false;

    super(name, 'dir', parentDirNode, verbose);
    this._renderChildren();
  }

  _renderChildren() {
    const dirContents = fs.readdirSync(this.path);
    dirContents.forEach(name => {
      const dirContentPath = path.join(this.path, name);
      const ContentType = isDir(dirContentPath) ? DirectoryNode : FileNode;
      const newFSNode = new ContentType(name, this, this.verbose);

      this.addChild(newFSNode);
    });
  }

  eachChild(cb) {
    this.breathFirstEach(fsNode => {
      if (this !== fsNode) {
        cb(fsNode);
      }
    });
  }

  selectChildren(cb) {
    const found = [];
    this.eachChild(fsNode => {
      if (cb(fsNode)) {
        found.push(fsNode);
      }
    });
    return found;
  }

  find(selectBy = {}) {
    return this.selectChildren(fsNode => {
      return couldMatchObj(selectBy, fsNode);
    });
  }
}

export default DirectoryNode;
