import dot from '@tps/dot';
import path from 'path';
import fs, { promises } from 'fs-extra';
import { DirNode } from '@tps/fileSystemTree';

/*
 * File
 */
const DOT_EXTENTION_MATCH = /.(dot|jst|def)$/i;
// const DOT_INTERPOLATION_MATCH = /\{\{([\s\S]+?)\}\}/g;
// const FS_FAIL_IF_EXIST = { flags: 'wx' };

class File {
  constructor(fileNode, opts = {}) {
    let fileName = fileNode.name;

    if (DOT_EXTENTION_MATCH.test(fileName)) {
      // strip dot extention
      this.isDot = true;
      fileName = fileName.replace(DOT_EXTENTION_MATCH, '').trim();
    }
    this.opts = opts;
    this._name = fileName;
    this._dotNameCompiled = dot.template(this._name);
    this.src = fileNode.path;
    this.fileNode = fileNode;
    const fileData = fs.readFileSync(this.src);
    this.fileDataTemplate = (data, defs) => {
      return this.isDot ? dot.template(fileData, null, defs)(data) : fileData;
    };

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

  renderDotFile(dest, fileData) {
    return Promise.resolve()
      .then(() => this.opts.force && fs.remove(dest))
      .catch(e => {
        console.log('this should be force', e);
      })
      .then(() => {})
      .then(() => fs.writeFile(dest, fileData, { flags: 'w' }))
      .then(() => Promise.resolve(dest))
      .catch(error => {
        console.log('Error in dot config');
        console.log('dest', dest);
        new DirNode(
          '/Users/lornelas/Desktop/development/Templates/docs-1/'
        ).logTree(['type', 'path']);

        return Promise.reject(error);
      });
  }

  renderFile(dest) {
    return Promise.resolve()
      .then(() => this.opts.force && fs.remove(dest))
      .then(() => {
        return new Promise((resolve, reject) => {
          const srcFile = fs.createReadStream(this.src, {
            flags: 'r'
          });

          srcFile.on('error', error => {
            console.log('Read Stream error', error);
            reject(error);
          });

          const destFile = fs.createWriteStream(dest, { flags: 'wx' });

          destFile.on('error', err => {
            console.log('dest', dest);
            console.log('write stream error', err);
            reject(err);
          });

          destFile.on('finish', () => resolve(dest));

          srcFile.pipe(destFile);
        });
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
