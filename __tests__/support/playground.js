/**
 * Modules
 */
import fs from 'fs-extra';
import path from 'path';

/**
 * Constants
 */
const TESTING_PLAYGROUND_NAME = 'testing_playground';

class Playground {
  constructor(dirPath, name = `${TESTING_PLAYGROUND_NAME}_${Date.now()}`) {
    this.dirPath = dirPath;
    this.name = name;
    this.sections = {};
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

  /**
   * Sections
   */
  hasSection(name) {
    return this.sections.hasOwnProperty(name);
  }

  addSection(name, cb) {
    if (this.hasSection(name)) {
      throw new Error('Sections was already created');
    }

    const section = new Playground(this.path, name);
    this.sections[name] = section.path;

    if (cb) {
      section.create(cb);
    } else {
      return section.create();
    }
  }

  section(name) {
    if (!this.hasSection(name)) {
      throw new Error('No section availiable');
    }
    return this.sections[name];
  }
}

module.exports = Playground;
