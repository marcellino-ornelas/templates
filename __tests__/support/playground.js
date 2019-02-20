/**
 * Modules
 */
const fs = require('fs-extra');
const path = require('path');

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
    fs.mkdir(this.path, done);
  }

  destory(done) {
    fs.remove(this.path, err => {
      if (err) throw err;
      done();
    });
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

    section.create(function(err) {
      if (err) {
        throw err;
      }
      cb();
    });
  }

  section(name) {
    if (!this.hasSection(name)) {
      throw new Error('No section availiable');
    }
    return this.sections[name];
  }
}

module.exports = Playground;
