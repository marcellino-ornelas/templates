import Playground from '@test/support/playground';
import * as utils from '@test/support/utils';
import { INIT_PACKAGE_FILES, TESTING_DIR } from '@test/support/constants';

/**
 * Constants
 */

const playground = new Playground(TESTING_DIR);

describe('Command Line: ', () => {
  let cwd;

  beforeAll(() =>
    playground.create().then(() =>
      playground.createBox('init').then(() => {
        cwd = playground.box();
      })
    )
  );

  afterAll(() => playground.destroy());

  it('should not initialize if parents directory is initialized', done => {
    utils.spawn(['init'], { cwd, fail: true }, function(err, stdout) {
      expect(err).toBeDefined();
      expect(stdout).toBeDefined();
      done();

      expect(stdout).toContain(
        'tps is already initialized in a parent directory.'
      );
    });
  });

  it('should be able initialize .tps/ folder', done => {
    const initFolder = playground.pathTo('.tps');
    // need to add --force because of .tps folder in main templates repo
    utils.spawn(['init', '--force', '-v'], { cwd }, function(err, stdout) {
      expect(err).toBeNull();

      expect(initFolder).toHaveAllFilesAndDirectories(INIT_PACKAGE_FILES);

      done();
    });
  });

  // it.skip('should not initialize if cwd has .tps/ folder already', done => {
  //   utils.spawn(['init', '--force'], { cwd, fail: true }, function(
  //     err,
  //     stdout
  //   ) {
  //     expect(err).toBeDefined();
  //     expect(stdout).toBeDefined();

  //     done();
  //   });
  // });
});
