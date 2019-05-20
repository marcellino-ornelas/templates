import Playground from '../support/playground';
import * as utils from '../support/utils';
import {
  TESTING_PACKAGE_FILES,
  INIT_PACKAGE_FILES,
  TESTING_DIR
} from '../support/constants';

/**
 * Constants
 */

const playground = new Playground(TESTING_DIR);

describe('Command Line: ', () => {
  beforeAll(() =>
    playground.create().then(() =>
      playground.createBox('init').then(() => {
        cwd = playground.box();
      })
    )
  );

  afterAll(() => playground.destroy());

  let cwd;

  it('should not initialize if parents directory is initialized', done => {
    utils.spawn(['init'], { cwd, fail: true }, function(err, stdout) {
      expect(err).toBeDefined();
      expect(stdout).toBeDefined();
      done();
    });
  });

  it('should be able initialize .tps/ folder', done => {
    const initFolder = playground.pathTo('.tps');
    // need to add --force because of .tps folder in main templates repo
    utils.spawn(['init', '--force'], { cwd }, function(err, stdout) {
      expect(err).toBeNull();
      expect(
        utils.hasAllFileAndDirs(initFolder, INIT_PACKAGE_FILES)
      ).toBeTruthy();

      done();
    });
  });

  it('should not initialize if cwd has .tps/ folder already', done => {
    utils.spawn(['init', '--force'], { cwd, fail: true }, function(
      err,
      stdout
    ) {
      expect(err).toBeDefined();
      expect(stdout).toBeDefined();
      done();
    });
  });
});
