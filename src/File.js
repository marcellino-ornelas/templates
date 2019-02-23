import dot from 'dot';
import path from 'path';
import fs from 'fs-extra';
/*
 * File
 */
const DOT_EXTENTION_MATCH = /.(dot|jst|def)$/i;
const DOT_INTERPOLATION_MATCH = /\{\{([\s\S]+?)\}\}/g;

class File {
  constructor(/* dest,  */ fileNode) {
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
    // console.log(`   `, '-> created file ->', dest);

    return new Promise((resolve, reject) => {
      if (this.isDot) {
        const fileData = fs.readFileSync(this.src);
        const dotCompiled = dot.template(fileData);

        fs.writeFile(dest, dotCompiled(data), err => {
          if (err) console.log({ name: this._name, error: err });
          err ? reject({ name: this._name, error: err }) : resolve();
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
    if (!/\./g.test(name)) {
      name += '.js';
    }

    return name;
  }

  _dest(newDest) {
    return path.join(newDest, this.relDirectoryFromPkg);
  }
}

File.prototype.isDot = false;

module.exports = File;
