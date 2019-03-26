/**
 * Modules
 */
import fs from 'fs-extra';
import path from 'path';
import is from 'is';

/**
 * Constants
 */
const TESTING_PLAYGROUND_NAME = 'testing_playground';

const stamp = () => Date.now();

// const cbOrPromise = (cb, ...args) => {
//   if(is.function(cb)){
//     cb(...args);
//   } else {
//     return new Promise(){

//     }
//   }
// }

class Playground {
  constructor(dirPath, name = TESTING_PLAYGROUND_NAME) {
    this.dirPath = dirPath;
    this._name = name;
    this.stamp = stamp();
    this.name = `${name}_${this.stamp}`;
    this.boxes = {};
    this.current = null;
  }

  get path() {
    return path.join(this.dirPath, this.name);
  }

  create(done) {
    if (done) {
      fs.mkdir(this.path, done);
    } else {
      return new Promise((resolve, reject) => {
        fs.mkdir(this.path, function(err) {
          err ? reject(err) : resolve();
        });
      });
    }
  }

  destory(done) {
    if (done) {
      fs.remove(this.path, done);
    } else {
      return new Promise((resolve, reject) => {
        fs.remove(this.path, function(err) {
          err ? reject(err) : resolve();
        });
      });
    }
  }

  createBox(name, cb) {
    const box = new Playground(this.path, name);

    if (this.boxes.hasOwnProperty(box.name)) {
      throw new Error('two boxes are the same');
    }
    this.boxes[box.name] = box;
    this.current = box;

    if (cb) {
      box.create(cb);
    } else {
      return box.create();
    }
  }

  box() {
    return this.current.path;
  }

  pathTo(filePath) {
    return path.join(this.box(), filePath);
  }

  /**
   * Sections
   */
  // hasSection(name) {
  //   return this.sections.hasOwnProperty(name);
  // }

  // addSection(name, cb) {
  //   if (this.hasSection(name)) {
  //     throw new Error('Sections was already created');
  //   }

  //   const section = new Playground(this.path, name);
  //   this.sections[name] = section.path;

  //   if (cb) {
  //     section.create(cb);
  //   } else {
  //     return section.create();
  //   }
  // }

  // section(name) {
  //   if (!this.hasSection(name)) {
  //     throw new Error('No section availiable');
  //   }
  //   return this.sections[name];
  // }
}

module.exports = Playground;
