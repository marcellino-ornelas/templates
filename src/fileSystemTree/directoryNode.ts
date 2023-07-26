import * as path from 'path';
import * as fs from 'fs';
import * as minimatch from 'minimatch';
import { isDir } from '@tps/utilities/fileSystem';
import { couldMatchObj } from '@tps/utilities/helpers';
import {
  FileSystemNode,
  SimpleFileSystemInfo,
  FileSystemNodeCallback,
} from './fileSystemNode';
import FileNode from './fileNode';

type FindKeyPattern = Partial<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [Property in keyof FileSystemNode]: any;
}>;

export class DirectoryNode extends FileSystemNode {
  constructor(name: string, parentDirNode, verbose = false) {
    let parentDir = parentDirNode;
    if (name && !parentDirNode) {
      parentDir = path.dirname(name);
      // eslint-disable-next-line no-param-reassign
      name = path.basename(name);
    }
    // this.verbose = verbose || false;

    super(name, 'dir', parentDir, verbose);
    this._renderChildren();
  }

  toObject(): SimpleFileSystemInfo {
    const obj = super.toObject();

    obj.children = this.children.map((fileNode) => fileNode.toObject());

    return obj;
  }

  _renderChildren(): void {
    let dirContents;

    try {
      dirContents = fs.readdirSync(this.path);
    } catch (e) {
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

  eachChild(cb: FileSystemNodeCallback): void {
    this.breathFirstEach((fsNode) => {
      if (this !== fsNode) {
        cb(fsNode);
      }
    });
  }

  selectChildren(cb: FileSystemNodeCallback<boolean>): FileSystemNode[] {
    const found: FileSystemNode[] = [];
    this.eachChild((fsNode) => {
      if (cb(fsNode)) {
        found.push(fsNode);
      }
    });
    return found;
  }

  find(selectBy: FindKeyPattern = {}): FileSystemNode[] {
    return this.selectChildren((fsNode) => couldMatchObj(selectBy, fsNode));
  }
}

export default DirectoryNode;
