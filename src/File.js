const dot = require('dot');
const path = require('path');
const fs = require('fs-extra');
/*
 * File
*/
const DOT_EXTENTION_MATCH = /.(dot|jst|def)$/i;
const DOT_INTERPOLATION_MATCH = /\{\{=([\s\S]+?)\}\}/g;

class File {
  constructor(src, dest, fileName) {
    this.src = src;
    this.path = dest;
    this.originalFileName = fileName;

    if (DOT_EXTENTION_MATCH.test(fileName)) {
      // strip dot extention
      this.isDot = true;
      fileName = fileName.replace(DOT_EXTENTION_MATCH, '').trim();
    }

    this.name = fileName;

    // compile fileName with dot for any interpolation inside of name
    this.fileName = (() => {
      const compiledName = dot.template(this.name);
      return function(data) {
        return this._addDefaultExtention(compiledName(data));
      };
    })();

    if (this.isDot) {
      // replace the compiler
      // const pathToFile = path.join(src, this.originalFileName);
      // const dotFileContents = fs.readFileSync(pathToFile);
      this.compiler = dot.template(this.compiler());
    }
  }

  compiler() {
    const pathToFile = path.join(this.src, this.originalFileName);
    return fs.readFileSync(pathToFile);
  }

  _addDefaultExtention(name) {
    if (!/\./g.test(name)) {
      name += '.js';
    }

    return name;
  }
}

File.prototype.isDot = false;

module.exports = File;
