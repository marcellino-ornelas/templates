const path = require('path');
const fs = require('fs');
const Templates = require('../lib/templates');
const Playground = require('./support/playground');
const utils = require('./support/utils');

/**
 * Constants
 */
const TEMPLATES_PATH = __dirname;
const allMainAndStorePackageFiles = [
  './index.js',
  './db',
  './db/db.js',
  './server',
  './storeUtils',
  './storeUtils/user.js'
];

const playground = new Playground(TEMPLATES_PATH);

describe.skip('Templates', () => {
  beforeAll(done => {
    // Make a folder to to render templates inside
    playground.create(done);
  });

  afterAll(done => {
    // Remove playground folder
    playground.destory(done);
  });

  describe('create', () => {
    let sectionName = 'create';

    beforeAll(done => {
      playground.addSection(sectionName, done);
    });

    it('should render a template folder', () => {
      const playbox = playground.section(sectionName);
      const destPath = path.join(playbox, 'App');
    });
  });
});
