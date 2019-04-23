import dot from 'dot';
import path from 'path';
import fs from 'fs';
/*
 * File
 */
const DOT_EXTENTION_MATCH = /.(dot|jst|def)$/i;
const DOT_INTERPOLATION_MATCH = /\{\{([\s\S]+?)\}\}/g;

class File {
  constructor(fileNode) {
    let fileName = fileNode.name;

    if (DOT_EXTENTION_MATCH.test(fileName)) {
      // strip dot extention
      this.isDot = true;
      fileName = fileName.replace(DOT_EXTENTION_MATCH, '').trim();
    }

    this._name = fileName;
    this._dotNameCompiled = dot.template(this._name);
    this.src = fileNode.path;
    this.fileNode = fileNode;

    this.relDirectoryFromPkg = path.dirname(fileNode.pathFromRoot);
  }

  fileName(data) {
    return this._addDefaultExtention(this._dotNameCompiled(data));
  }

  create(newDest, data) {
    const dest = path.join(this._dest(newDest), this.fileName(data));

    return new Promise((resolve, reject) => {
      if (this.isDot) {
        const fileData = fs.readFileSync(this.src);
        const dotCompiled = dot.template(fileData);

        fs.writeFile(dest, dotCompiled(data), err => {
          if (err) {
            reject(
              new Error(`${this._name} threw a error while creating ${err}`)
            );
          } else {
            resolve();
          }
        });
      } else {
        const srcFile = fs.createReadStream(this.src, {
          flag: 'r'
        });
        const destFile = fs.createWriteStream(dest, { flags: 'wx' });
        destFile.on('error', reject);
        destFile.on('finish', resolve);
        srcFile.pipe(destFile);
      }
    });
  }

  _addDefaultExtention(name) {
    let fileName = name;

    // Might need to change
    if (!/\./g.test(name)) {
      fileName += '.js';
    }

    return fileName;
  }

  _dest(newDest) {
    return path.join(newDest, this.relDirectoryFromPkg);
  }
}

File.prototype.isDot = false;

module.exports = File;
