/**
 * Modules
 */
import fs from 'fs-extra';
import path from 'path';
import { isFile, isDir } from '@tps/utilities/fileSystem';
import { hasProp } from '@tps/utilities/helpers';
import crypto from 'crypto';

/**
 * Constants
 */
const TESTING_PLAYGROUND_NAME = 'testing_playground';

const stamp = (len = 10) =>
  crypto.randomBytes(Math.ceil(len / 2)).toString('hex', 0, len);

const box_tracker = {};

class Playground {
  constructor(dirPath, name = TESTING_PLAYGROUND_NAME) {
    this.dirPath = dirPath;
    this._name = name;

    do {
      if (this.name) {
        console.log(
          `[PLAYGROUND INFO] playground name was already selected (${
            this.name
          })`
        );
      }
      this.stamp = stamp();
      this.name = `${name}_${this.stamp}`;
    } while (hasProp(box_tracker, this.name));

    // track box name so it will never have duplicates
    box_tracker[this.name] = true;

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
    const pathToFile = path.join(this.box(), filePath);
    return pathToFile;
  }
}

module.exports = Playground;
