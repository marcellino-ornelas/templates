const fs = require('fs');
const path = require('path');

const Tree = require('./data-structures/Tree');

class Node extends Tree {
  constructor(name, parentDirectory, type) {
    super();
    // parse file path to get name and path/to/file
    this.name = name;
    this.parentPath = parentDirectory;
    this.path = path.join(this.parentPath, this.name);
    this.type = type;
  }

  is(type) {
    return this.type === type;
  }

  addChild(value) {
    var tree = value instanceof Node ? value : Node(value);
    tree.depth = this.depth + 1;

    this.children.push(tree);
    return tree;
  }
}

class FileNode extends Node {
  constructor(name, parentDirectory = process.cwd()) {
    super(name, parentDirectory, 'file');

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
    throw Error('Cannot add children to FileNodes');
  }

  hasChildren() {
    return false;
  }
}

class DirNode extends Node {
  constructor(name, parentDirectory = process.cwd()) {
    super(name, parentDirectory, 'dir');

    // how am i going to do the values
    this._renderChildren();
  }

  _renderChildren() {
    const dirContents = fs.readdirSync(this.path);

    dirContents.forEach(name => {
      const dirContentPath = path.join(this.path, name);
      const isFile = fs.statSync(dirContentPath).isFile();
      const ContentType = isFile ? FileNode : DirNode;
      const newNode = new ContentType(name, this.path);

      this.addChild(newNode);
    });
  }
}

// const PATH_TO_FILE = path.join(process.cwd());
// const dir = new DirNode('main', );

module.exports.DirNode = DirNode;
module.exports.FileNode = FileNode;

// const file = FileNode('')
// dir.addChild()

// class FileTree

// class FileTree {
//   constructor(filePath, _parent) {
//     const isPathAbs = path.isAbsolute(filePath);

//     if (!(filePath instanceof String)) {
//       throw new TypeError(
//         `Argument "filePath" must be a string but got ${typeof _parent}`
//       );
//     }

//     // Parent must be a FileTree
//     if (_parent && !(_parent instanceof FileTree)) {
//       throw new TypeError(
//         `Argument "Parent" must be instance of FileTree but got ${typeof _parent}`
//       );
//     }

//     if (isPathAbs && _parent) {
//       throw new TypeError(
//         `Argument "path" cannot be an absolute path when passing in an parent FileTree`
//       );
//     }

//     let dirname;

//     switch (true) {
//       case isPathAbs:
//         dirname = '';
//         break;
//       case _parent && _parent.value.path:
//         dirname = _parent.value.path;
//         break;
//       default:
//         dirname = process.cwd();
//     }

//     const fileDescription = fs.statSync(filePath);

//     const treeValue = {
//       type: fileDescription.isDirectory() ? 'dir' : 'file',
//       name: path.basename(filePath)
//     };

//     // super(treeValue);
//   }

//   addChild(value) {
//     throw new Error('Cannot add children to file tree');
//   }
// }

// const root = new FileTree('lib/', 'hey');

// root.addChild('test');

// console.log(root);
