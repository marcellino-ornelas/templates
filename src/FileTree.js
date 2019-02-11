const fs = require("fs");
const deepIs = require("deep-is");
const is = require("is");
const path = require("path");
const utils = require("./utils");

const Tree = require("./data-structures/tree");
const stack = require("./data-structures/stack");

class Node extends Tree {
  constructor(name, type, parentDirectory) {
    super();

    const isDir = is.instance(parentDirectory, Node);
    // parse file path to get name and path/to/file
    if (!isDir && !is.string(parentDirectory)) {
      throw new TypeError(`Argument must be a String`);
    }

    this.name = name;
    this.parent = isDir ? parentDirectory : null;
    this.type = type;
    const dirPath = isDir ? this.parent.path : parentDirectory;
    this.parentPath = dirPath;
    this.path = path.join(dirPath, this.name);
  }

  is(type) {
    return this.type === type;
  }

  addChild(value) {
    if (!is.instance(value, Node)) {
      throw new TypeError(`Argument must be type FileNode or DirNode`);
    }

    var tree = value;
    tree.depth = this.depth + 1;

    this.children.push(tree);
    return tree;
  }

  getRelativePathFrom(parentDirNode) {
    let child = this;
    let pathStack = new stack();

    do {
      if (!child.parent) {
        throw new Error(
          "The DirNode you passed in is not a parent of this Node"
        );
      }
      pathStack.push(child.name);
    } while (parentDirNode !== (child = child.parent));

    // add parent name top end of stack
    pathStack.push(parentDirNode.name);

    let relativePath = "";

    while (pathStack.size()) {
      relativePath = path.join(relativePath, pathStack.pop());
    }

    return relativePath;
  }
}

class FileNode extends Node {
  constructor(name, parentDirectory) {
    super(name, "file", parentDirectory);

    // Get the extention and real name of the file
    const { ext, name: fileName } = path.parse(name);

    this.fileName = fileName;
    this.ext = ext;

    this.children = undefined;
    this.data = this._getFileData();
  }

  _getFileData() {
    return fs.readFileSync(this.path);
  }

  addChild() {
    throw Error("Cannot add children to FileNodes");
  }

  hasChildren() {
    return false;
  }
}

class DirNode extends Node {
  constructor(name, parentDirectory = process.cwd()) {
    super(name, "dir", parentDirectory);

    this._renderChildren();
  }

  _renderChildren() {
    const dirContents = fs.readdirSync(this.path);

    dirContents.forEach(name => {
      const dirContentPath = path.join(this.path, name);
      const isDir = utils.isDir(dirContentPath);
      const ContentType = isDir ? DirNode : FileNode;
      const newNode = new ContentType(name, this);

      this.addChild(newNode);
    });
  }

  find(selectBy = {}) {
    if (is.empty(selectBy)) {
      console.log("is empty");
      return [];
    }
    return this.breathFirstSelect(tree => {
      return this !== tree && utils.couldMatch(selectBy, tree);
    });
  }
}

module.exports.DirNode = DirNode;
module.exports.FileNode = FileNode;
