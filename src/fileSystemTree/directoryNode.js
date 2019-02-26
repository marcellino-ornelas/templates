import FileSystemNode from './fileSystemNode';
import FileNode from './fileNode';
import path from 'path';
import fs from 'fs';
import utils from '../utils';

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
      const isDir = utils.isDir(dirContentPath);
      const ContentType = isDir ? DirectoryNode : FileNode;
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
      return utils.couldMatch(selectBy, fsNode);
    });
  }
}

export default DirectoryNode;
