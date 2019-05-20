/*
 * Modules
 */
import fs from 'fs-extra';
import Playground from '@test/support/playground';
import { TESTING_DIR } from '@test/support/constants';
import Templates from '@tps/templates';
import { hasAllFileAndDirs } from '../../support/utils';
import { TESTING_PACKAGE_FILES } from '@test/support/constants';
import { isDir, isFile } from '@tps/utilities/fileSystem';

/*
 * Constants
 */
const playground = new Playground(TESTING_DIR);

describe('[TPS] Rendered Failed Cases:', () => {
  let tps, indexFile;

  beforeAll(() => playground.create());
  // afterAll(() => playground.destroy());

  beforeEach(() => {
    tps = new Templates();
    tps.use('testing');

    return playground.createBox('render_failed').then(() => {
      indexFile = playground.pathTo('App/index.js');
      fs.outputFile(indexFile, 'blah');
    });
  });

  it('should throw error if file is already created when creating a new folder', () => {
    jest.setTimeout(100000);
    return tps.render(playground.box(), 'App').catch(() => {
      const appFolder = playground.pathTo('App');
      expect(isDir(appFolder)).toBeTruthy();
      expect(isFile(indexFile)).toBeTruthy();

      expect(
        hasAllFileAndDirs(appFolder, ['db', 'server', 'storeUtils', 'db/db.js'])
      ).toBeFalsy();
    });
  });

  it('should throw error if file is already created when building in CWD', () => {
    // expect.assertions(1);
    console.log(playground.box());
    return tps.render(playground.box()).catch(() => {
      console.log('hit here');
      expect(
        hasAllFileAndDirs(playground.box(), TESTING_PACKAGE_FILES)
      ).toBeFalsy();
    });
  });
});
