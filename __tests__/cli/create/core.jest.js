import Playground from '@test/support/playground';
import * as utils from '@test/support/utils';
import { TESTING_PACKAGE_FILES, TESTING_DIR } from '@test/support/constants';

/**
 * Constants
 */

const playground = new Playground(TESTING_DIR);

describe('[cli] Create:', () => {
  beforeAll(() => playground.create());

  afterAll(() => playground.destory());

  beforeEach(() => playground.createBox('create_core'));

  it.only('should be able to use the create command in cli', done => {
    const destPath = playground.pathTo('App');
    const cmd = ['create', '--use=testing', '-v', 'App'];

    utils.spawn(cmd, { cwd: playground.box() }, function(err, stdout) {
      expect(
        utils.hasAllFileAndDirs(destPath, TESTING_PACKAGE_FILES)
      ).toBeTruthy();

      done();
    });
  });

  it('should be able to render a template in cwd if no file paths are entered', done => {
    const destPath = playground.box();

    const cmd = ['create', '--use=testing', '-v'];

    utils.spawn(cmd, { cwd: destPath }, function(err, stdout) {
      expect(
        utils.hasAllFileAndDirs(destPath, TESTING_PACKAGE_FILES)
      ).toBeTruthy();

      done();
    });
  });
});
