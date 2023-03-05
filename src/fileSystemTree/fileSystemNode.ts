import * as is from 'is';
import * as path from 'path';
import { Stack } from '../data-structures/stack';
import { Tree, TreeCallBack } from '../data-structures/tree';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface SimpleFileSystemInfo {
  name: string;
  type: string;
  path: string;
  children?: SimpleFileSystemInfo[];
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface FileSystemNodeCallback<TReturn = void>
  extends TreeCallBack<FileSystemNode, TReturn> {}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export abstract class FileSystemNode extends Tree<null, FileSystemNode> {
  static ignoreFiles = '';

  public depth: number;

  public verbose: boolean;

  public parent: FileSystemNode | null;

  public parentPath: string;

  public path: string;

  public pathFromRoot: string;

  public children: FileSystemNode[];

  constructor(
    public name: string,
    public type: string,
    parentDirectory: FileSystemNode | string,
    verbose: boolean
  ) {
    super();

    const isFSNode = this.isFileSystemNode(parentDirectory);
    // parse file path to get name and path/to/file
    if (!isFSNode && !is.string(parentDirectory)) {
      throw new TypeError(`Argument must be a String`);
    }

    this.depth = isFSNode ? parentDirectory.depth + 1 : 0;
    this.verbose = verbose || false;
    this.parent = isFSNode ? parentDirectory : null;
    this.parentPath = isFSNode ? parentDirectory.path : parentDirectory;
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private isFileSystemNode(node: any): node is FileSystemNode {
    return node instanceof FileSystemNode;
  }

  toObject(): SimpleFileSystemInfo {
    return {
      name: this.name,
      type: this.type,
      path: this.path,
    };
  }

  is(type: string): boolean {
    return this.type === type;
  }

  get(name: string) {
    return this.children.find((tree) => tree.name === name);
  }

  addChild<TValue extends FileSystemNode>(value: TValue): TValue {
    if (!this.isFileSystemNode(value)) {
      throw new TypeError(`Argument must be type FileNode or DirNode`);
    }
    const tree = value;
    this.children.push(tree);
    return tree;
  }

  getRelativePathFrom(parentDirNode, includeParentNode = true) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    let child: FileSystemNode = this;
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
