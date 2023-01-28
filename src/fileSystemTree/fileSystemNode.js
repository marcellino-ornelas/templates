import * as is from 'is';
import * as path from 'path';
import Stack from '../data-structures/stack';
import Tree from '../data-structures/tree';

export class FileSystemNode extends Tree {
  static ignoreFiles = '';

  constructor(name, type, parentDirectory, verbose) {
    super();

    const isFSNode = is.instance(parentDirectory, FileSystemNode);
    // parse file path to get name and path/to/file
    if (!isFSNode && !is.string(parentDirectory)) {
      throw new TypeError(`Argument must be a String`);
    }

    this.name = name;
    this.type = type;
    this.depth = isFSNode ? parentDirectory.depth + 1 : 0;
    this.verbose = verbose || false;
    this.parent = isFSNode ? parentDirectory : null;
    this.parentPath = isFSNode ? this.parent.path : parentDirectory;
    this.path = path.join(this.parentPath, this.name);
    this.pathFromRoot = isFSNode
      ? path.join(parentDirectory.pathFromRoot, this.name)
      : '.';

    if (verbose) {
      console.log('==============================================');
      console.log('name', this.name);
      console.log('path', this.path);
    }
  }

  toObject() {
    return {
      name: this.name,
      type: this.type,
      path: this.path,
    };
  }

  is(type) {
    return this.type === type;
  }

  get(name) {
    return this.children.find((tree) => tree.name === name);
  }

  addChild(value) {
    if (!is.instance(value, FileSystemNode)) {
      throw new TypeError(`Argument must be type FileNode or DirNode`);
    }
    const tree = value;
    this.children.push(tree);
    return tree;
  }

  getRelativePathFrom(parentDirNode, includeParentNode = true) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    let child = this;
    const pathStack = new Stack();

    do {
      if (!child.parent) {
        throw new Error(
          'The DirNode you passed in is not a parent of this Node'
        );
      }
      pathStack.push(child.name);
      child = child.parent;
    } while (parentDirNode !== child);

    // Add parent name top end of stack
    if (includeParentNode) {
      pathStack.push(parentDirNode.name);
    }

    let relativePath = '';

    while (pathStack.size()) {
      relativePath = path.join(relativePath, pathStack.pop());
    }

    return relativePath;
  }

  logTree(names = []) {
    this.depthFirstEach((tree) => {
      console.log(`${'  '.repeat(tree.depth * 2)}${tree.name}: `);
      names.forEach((name) => {
        console.log(
          `${'  '.repeat(tree.depth * 3)} -> ${name}: ${tree[name]} `
        );
      }, true);
      // console.log(`${'  '.repeat(tree.depth * 2)}|`);
      // console.log(`${'\t'.repeat(this.depth * 2)}|`);
    });
  }
}

export default FileSystemNode;
