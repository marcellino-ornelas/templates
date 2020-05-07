/*
 * Modules
 */
import Playground from '@test/utilities/playground';
import { TESTING_DIR, TESTING_PACKAGE_FILES } from '@test/utilities/constants';
import fs from 'fs-extra';
import Templates from '@test/templates';
import path from 'path';
// import errors from '@tps/errors';

/*
 * Constants
 */
const playground = new Playground(TESTING_DIR);

describe('[TPS] Render with Wipe:', () => {
  beforeAll(() => playground.create());
  afterAll(() => playground.destroy());

  beforeEach(() => playground.createBox('_'));

  it('should be able to render a template with wipe.', () => {
    /**
     * directory structure before:
     *
     * {cwd}/
     *    | - app/
     *        | - some-random-file.js
     *        | - index.js
     */
    const destPath = playground.pathTo('app');
    const randomDest = playground.pathTo('app/some-random-file.js');
    const indexFile = playground.pathTo('app/index.js');

    const tps = new Templates('testing', { wipe: true });

    fs.outputFileSync(randomDest, 'blah');
    fs.outputFileSync(indexFile, 'blah');

    return tps.render(playground.box(), 'app').then(() => {
      expect(destPath).toHaveAllFilesAndDirectories(TESTING_PACKAGE_FILES);
      expect(randomDest).not.toBeFile();
      expect(indexFile).toHaveFileContents("console.log('hey');");
    });
  });

  /**
   * @docs api/cli/commands/use.md#when-using-a-long-build-path
   */
  it('should be able to render a template with wipe and a long build path', () => {
    /**
     * directory structure before:
     *
     * {cwd}/
     *    |- dest/
     *       | - random-file.js
     *       | - app/
     *           | - random-file-2.js
     *           | - index.js
     */
    const appPath = playground.pathTo('dest/app');
    const randomFileInDest = playground.pathTo('dest/random-file.js');
    const randomFileInApp = playground.pathTo('dest/app/random-file-2.js');
    const indexFileInApp = playground.pathTo('dest/app/index.js');

    const tps = new Templates('testing', { wipe: true });

    // Make file in dest
    fs.outputFileSync(randomFileInDest, 'blah');
    // Make file in build path
    fs.outputFileSync(randomFileInApp, 'blah');
    // Make file in build path
    fs.outputFileSync(indexFileInApp, 'blah');

    return tps.render(playground.box(), 'dest/app').then(() => {
      expect(randomFileInDest).toBeFile();
      expect(appPath).toHaveAllFilesAndDirectories(TESTING_PACKAGE_FILES);
      expect(randomFileInApp).not.toBeFile();
      expect(indexFileInApp).toBeFile();
    });
  });

  /**
   * @docs api/cli/commands/use.md#when-using-no-build-path
   */
  it('should be able to render a template with wipe when there is no buildPath', () => {
    /**
     * directory structure before:
     *
     * {cwd}/
     *    | - /should-not-be-deleted.js
     *    | - app/ <--- this will be the acting CWD for tps
     *        | - some-random-file.js
     *
     */
    const cwd = playground.pathTo('app');
    const randomDest = path.join(cwd, 'some-random-file.js');
    const randomFileNotInBuildPath = playground.pathTo(
      'should-not-be-deleted.js'
    );

    const tps = new Templates('testing', { wipe: true });

    fs.outputFileSync(randomDest, 'blah');
    fs.outputFileSync(randomFileNotInBuildPath);

    return tps.render(cwd, '').then(() => {
      expect(randomDest).toBeFile();
      expect(cwd).toHaveAllFilesAndDirectories(TESTING_PACKAGE_FILES);
      expect(randomFileNotInBuildPath).toBeFile();
    });
  });

  it('should be able to render a template with wipe and no new folder', () => {
    /**
     * directory structure before:
     *
     * {cwd}/
     *    | - app/
     *        | - some-random-file.js
     */
    const destPath = playground.pathTo('app');
    const randomDest = playground.pathTo('app/some-random-file.js');

    const tps = new Templates('testing-clean-up-wipe', {
      wipe: true,
      newFolder: false,
    });

    fs.outputFileSync(randomDest, 'blah');

    return tps.render(playground.box(), 'app').then(() => {
      expect(destPath).toHaveAllFilesAndDirectories(TESTING_PACKAGE_FILES);
      expect(randomDest).not.toBeFile();
    });
  });

  // it('should not delete a parent directory contents');

  // it.only('should be able to render a template with wipe and no new folder', () => {
  //   const destPath = playground.pathTo('app');
  //   const randomDest = playground.pathTo('app/some-random-file.js');

  //   const tps = new Templates('testing-clean-up-wipe', {
  //     wipe: true,
  //     newFolder: false
  //   });

  //   fs.outputFileSync(randomDest, 'blah');

  //   return tps.render(playground.box(), 'app').then(() => {
  //     expect(destPath).toHaveAllFilesAndDirectories(TESTING_PACKAGE_FILES);
  //     expect(randomDest).not.toBeFile();
  //   });
  // });
});
