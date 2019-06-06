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
import { DirNode } from '@tps/fileSystemTree';

/*
 * Constants
 */
const playground = new Playground(TESTING_DIR);

describe('[TPS] Rendered Failed Cases:', () => {
  let tps;
  beforeAll(() => playground.create());
  // afterAll(() => playground.destroy());

  beforeEach(() => {
    tps = new Templates({ verbose: true });
    tps.use('testing');

    return playground.createBox('render_failed');
  });

  it('should throw error if file is already created when creating a new folder', () => {
    const indexFile = playground.pathTo('App/index.js');
    const appFolder = playground.pathTo('App');

    fs.outputFileSync(indexFile, 'blah');

    expect(isDir(appFolder)).toBeTruthy();
    expect(isFile(indexFile)).toBeTruthy();

    jest.setTimeout(100000);

    return tps.render(playground.box(), 'App').catch(error => {
      expect(error).toBeDefined();

      expect(isDir(appFolder)).toBeTruthy();
      expect(isFile(indexFile)).toBeTruthy();

      expect(
        hasAllFileAndDirs(appFolder, ['db', 'server', 'storeUtils', 'db/db.js'])
      ).toBeFalsy();
    });
  });

  it('should throw error if file is already created when building in CWD', () => {
    const box = playground.box();
    const indexFile = playground.pathTo('index.js');

    fs.outputFileSync(indexFile, 'blah');

    expect(isFile(indexFile)).toBeTruthy();

    return tps.render(box).catch(error => {
      expect(error).toBeDefined();

      expect(
        hasAllFileAndDirs(box, ['db', 'server', 'storeUtils', 'db/db.js'])
      ).toBeFalsy();
    });
  });

  it.only('should throw error if file is already created in nested folder', () => {
    const file = playground.pathTo('App/storeUtils/user.js');
    const appFolder = playground.pathTo('App');

    fs.outputFileSync(file, 'blah');

    expect(isFile(file)).toBeTruthy();

    return tps.render(playground.box(), 'App').catch(error => {
      expect(error).toBeDefined();

      expect(isFile(file)).toBeTruthy();

      expect(
        hasAllFileAndDirs(appFolder, ['db', 'server', 'db/db.js', 'index.js'])
      ).toBeFalsy();
    });
  });
});
