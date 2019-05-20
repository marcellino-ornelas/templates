import dot from '@tps/dot';
import path from 'path';
import fs from 'fs';

/*
 * File
 */
const DOT_EXTENTION_MATCH = /.(dot|jst|def)$/i;
// const DOT_INTERPOLATION_MATCH = /\{\{([\s\S]+?)\}\}/g;
// const FS_FAIL_IF_EXIST = { flags: 'wx' };
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
    const fileData = fs.readFileSync(this.src);
    this.fileDataTemplate = dot.template(fileData);

    this.relDirectoryFromPkg = path.dirname(fileNode.pathFromRoot);
  }

  fileName(data = {}) {
    let fileName;
    try {
      fileName = this._dotNameCompiled(data);
    } catch (e) {
      console.log('file name error', e);
    }
    return this._addDefaultExtention(fileName);
  }

  create(newDest, data) {
    const dest = this._dest(newDest, data);

    return new Promise((resolve, reject) => {
      if (this.isDot) {
        let fileData;
        try {
          fileData = this.fileDataTemplate(data);
        } catch (e) {
          console.log('dot error', e);
        }
        fs.writeFile(dest, fileData, { flag: 'wx' }, err => {
          if (err) {
            console.log('create promise error');
            reject(
              new Error(`${this._name} threw a error while creating ${err}`)
            );
          } else {
            resolve(dest);
          }
        });
      } else {
        const srcFile = fs.createReadStream(this.src, {
          flag: 'r'
        });
        console.log('creating file at', dest);
        const destFile = fs.createWriteStream(dest, { flags: 'wx' });
        destFile.on('error', err => {
          console.log('write stream error');
          reject(err);
        });
        destFile.on('finish', () => resolve(dest));
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

  _buildParentDir(newDest) {
    return path.join(newDest, this.relDirectoryFromPkg);
  }

  _dest(dest, data) {
    return path.join(this._buildParentDir(dest), this.fileName(data));
  }
}

File.prototype.isDot = false;

module.exports = File;
