const fs = require('fs');
const deepIs = require('deep-is');
const is = require('is');
const path = require('path');
const utils = require('./utils');

const Tree = require('./data-structures/tree');
const stack = require('./data-structures/stack');

class Node extends Tree {
  constructor(name, type, parentDirectory, verbose) {
    super();

    const isNode = is.instance(parentDirectory, Node);
    // parse file path to get name and path/to/file
    if (!isNode && !is.string(parentDirectory)) {
      throw new TypeError(`Argument must be a String`);
    }

    this.depth = isNode ? parentDirectory.depth + 1 : 0;
    this.verbose = verbose || false;
    this.name = name;
    this.type = type;
    this.parent = isNode ? parentDirectory : null;
    this.parentPath = isNode ? this.parent.path : parentDirectory;
    this.path = path.join(this.parentPath, this.name);
    this.pathFromRoot = isNode
      ? path.join(parentDirectory.pathFromRoot, this.name)
      : '.';

    if (verbose) {
      console.log('==============================================');
      console.log('name', this.name);
      console.log('path', this.path);
    }
  }

  is(type) {
    return this.type === type;
  }

  get(name) {
    return this.children.find(tree => tree.name === name);
  }

  addChild(value) {
    if (!is.instance(value, Node)) {
      throw new TypeError(`Argument must be type FileNode or DirNode`);
    }
    var tree = value;
    this.children.push(tree);
    return tree;
  }

  getRelativePathFrom(parentDirNode, includeParentNode = true) {
    let child = this;
    let pathStack = new stack();

    do {
      if (!child.parent) {
        throw new Error(
          'The DirNode you passed in is not a parent of this Node'
        );
      }
      pathStack.push(child.name);
    } while (parentDirNode !== (child = child.parent));

    // add parent name top end of stack
    includeParentNode && pathStack.push(parentDirNode.name);

    let relativePath = '';

    while (pathStack.size()) {
      relativePath = path.join(relativePath, pathStack.pop());
    }

    return relativePath;
  }

  logTree(names = []) {
    this.breathFirstEach(tree => {
      console.log(`${'  '.repeat(tree.depth * 2)}${tree.name}: `);
      names.forEach(name => {
        console.log(
          `${'  '.repeat(tree.depth * 3)} -> ${name}: ${tree[name]} `
        );
      });
      // console.log(`${'  '.repeat(tree.depth * 2)}|`);
      // console.log(`${'\t'.repeat(this.depth * 2)}|`);
    });
  }
}

class FileNode extends Node {
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

class DirNode extends Node {
  constructor(name, parentDirectory, verbose) {
    if (name && !parentDirectory) {
      const lastSlashIndex = name.lastIndexOf('/');
      parentDirectory = path.dirname(name);
      name = path.basename(name);
    }
    // this.verbose = verbose || false;

    super(name, 'dir', parentDirectory, verbose);
    this._renderChildren();
  }

  _renderChildren() {
    const dirContents = fs.readdirSync(this.path);
    dirContents.forEach(name => {
      const dirContentPath = path.join(this.path, name);
      const isDir = utils.isDir(dirContentPath);
      const ContentType = isDir ? DirNode : FileNode;
      const newNode = new ContentType(name, this, this.verbose);

      this.addChild(newNode);
    });
  }

  eachChild(cb) {
    this.breathFirstEach(tree => {
      if (this !== tree) {
        cb(tree);
      }
    });
  }

  selectChildren(cb) {
    const found = [];
    this.eachChild(tree => {
      if (cb(tree)) {
        found.push(tree);
      }
    });
    return found;
  }

  find(selectBy = {}) {
    return this.selectChildren(tree => {
      return utils.couldMatch(selectBy, tree);
    });
  }
}

// const mainDir = new DirNode('store', path.join(__dirname, '../__tests__/.tps'));
// console.log('main Directory', mainDir);

// console.log('final check', mainDir.find({ name: 'db.js' })[0].pathFromRoot);

module.exports.DirNode = DirNode;
module.exports.FileNode = FileNode;
