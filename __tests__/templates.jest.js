const path = require('path');
const fs = require('fs');
const Templates = require('../lib/_templates');
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

/**
 * Templates testing
 */
// const temps = new Template();

// const packages = [];
// temps.use('<template-folder>', packages);
// temps.use('<template-name>');
// should always look in `.tps/`

describe('Templates', () => {
  let tps;

  beforeAll(done => {
    // Make a folder to to render templates inside
    playground.create(done);
  });

  afterAll(done => {
    // Remove playground folder
    playground.destory(done);
  });

  beforeEach(() => {
    tps = new Templates();
    tps.use(TEMPLATES_PATH);
  });

  describe('Packages', () => {
    // TODO
    it.skip('should be able to compile default packages', () => {});
    it('should be able to compile a package', () => {
      tps.loadPackages('main');
      expect(tps.packages).toHaveProperty('main');
    });

    it('should be able to compile many packages', () => {
      const pkgs = ['store', 'main'];
      tps.loadPackages(pkgs);

      pkgs.forEach(pkg => {
        expect(tps.packages).toHaveProperty(pkg);
      });
    });
    it('should throw an error when packages arnt passed in', () => {
      const errArgs = ['', {}, null, true, false];

      errArgs.forEach(errArg => {
        expect(() => {
          tps.loadPackages(errArg);
        }).toThrow();
      });
    });

    it('should not let you load a package if already loaded', () => {
      tps.loadPackage('main');

      expect(() => {
        tps.loadPackage('main');
      }).toThrow();
    });
  });

  describe('Render Process', () => {
    let sectionName = 'render-process';

    beforeAll(done => {
      playground.addSection(sectionName, done);
    });

    beforeEach(() => {
      // TODO: take out when default packages works
      tps.loadPackages(['main', 'store']);
    });

    it('should be able to render a local template', () => {
      const playbox = playground.section(sectionName);
      const destPath = path.join(playbox, 'App');

      return tps.render(destPath, {}).then(() => {
        const check = allMainAndStorePackageFiles.map(fileOrDir =>
          path.join(destPath, fileOrDir)
        );
        expect(utils.hasAllFileAndDirs(destPath, check)).toBeTruthy();
      });
    });
  });
});
