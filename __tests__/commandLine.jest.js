import path from 'path';
import Playground from './support/playground';
import * as utils from './support/utils';

/**
 * Constants
 */
// const TEMPLATES_PATH = ;
const allMainAndStorePackageFiles = [
  './index.js',
  './db',
  './db/db.js',
  './server',
  './storeUtils',
  './storeUtils/user.js'
];

const playground = new Playground(__dirname);

describe('Command Line: ', () => {
  beforeAll(() => playground.create());

  // afterAll(() => playground.destory());

  describe('create', () => {
    let sectionName = 'create';

    beforeAll(() => playground.addSection(sectionName));

    it('should be able to use the create command in cli', done => {
      const playbox = playground.section(sectionName);
      const destPath = path.join(playbox, 'App');

      utils.spawn(
        ['create', '--use=testing', 'App'],
        {
          cwd: playbox
        },
        function(err, stdout) {
          expect(err).toBeNull();

          expect(
            utils.hasAllFileAndDirs(destPath, allMainAndStorePackageFiles)
          ).toBeTruthy();

          done();
        }
      );
    });

    // it('should crea', () => {
    //   const playbox = playground.section(sectionName);
    //   const destPath = path.join(playbox, 'App');
    // });
  });

  describe.skip('init', () => {
    let sectionName = 'init';

    beforeAll(() => playground.addSection(sectionName));

    it('should be able to use the create command in cli', () => {
      const playbox = playground.section(sectionName);
      utils.spawn();
    });
  });
});
