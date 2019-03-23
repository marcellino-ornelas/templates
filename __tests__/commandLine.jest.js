import path from 'path';
import Playground from './support/playground';
import * as utils from './support/utils';
import { TESTING_PACKAGE_FILES, INIT_PACKAGE_FILES } from './support/constants';
import fs from 'fs';

/**
 * Constants
 */

const playground = new Playground(__dirname);

describe('Command Line: ', () => {
  beforeAll(() => playground.create());

  afterAll(() => playground.destory());

  describe.skip('create', () => {
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
          expect(
            utils.hasAllFileAndDirs(destPath, TESTING_PACKAGE_FILES)
          ).toBeTruthy();

          done();
        }
      );
    });
  });

  describe('init', () => {
    let sectionName = 'init';

    beforeAll(() => playground.addSection(sectionName));

    it('should be able to use the create command in cli', done => {
      const playbox = playground.section(sectionName);
      const destPath = path.join(playbox, '.tps');

      utils.spawn(
        ['init', '--force'],
        {
          cwd: playbox
        },
        function(err, stdout) {
          expect(
            utils.hasAllFileAndDirs(destPath, INIT_PACKAGE_FILES)
          ).toBeTruthy();

          done();
        }
      );
    });
  });
});
