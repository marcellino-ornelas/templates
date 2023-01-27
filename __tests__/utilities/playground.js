/**
 * Modules
 */
import * as fs from 'fs-extra';
import * as path from 'path';
import { hasProp } from '@tps/utilities/helpers';
import * as crypto from 'crypto';

/**
 * Constants
 */
const TESTING_PLAYGROUND_NAME = 'testing_playground';

const stamp = (len = 10) =>
  crypto.randomBytes(Math.ceil(len / 2)).toString('hex', 0, len);

const boxTracker = {};

class Playground {
  constructor(dirPath, name = TESTING_PLAYGROUND_NAME) {
    this.dirPath = dirPath;
    this._name = name;

    do {
      if (this.name) {
        console.log(
          `[PLAYGROUND INFO] playground name was already selected (${this.name})`
        );
      }
      this.stamp = stamp();
      this.name = `${name}_${this.stamp}`;
    } while (hasProp(boxTracker, this.name));

    // track box name so it will never have duplicates
    boxTracker[this.name] = true;

    this.boxes = {};
    this.current = null;
  }

  get path() {
    return path.join(this.dirPath, this.name);
  }

  create() {
    return fs.mkdir(this.path);
  }

  destroy() {
    return fs.remove(this.path);
  }

  createBox(name) {
    const box = new Playground(this.path, name);

    if (this.boxes[box.name]) {
      throw new Error('two boxes are the same');
    }

    this.boxes[box.name] = box;
    this.current = box;

    return box.create();
  }

  box() {
    return this.current.path;
  }

  pathTo(filePath) {
    const pathToFile = path.join(this.box(), filePath);
    return pathToFile;
  }
}

export default Playground;
