import Playground from '@test/support/playground';
import * as utils from '@test/support/utils';
import { TESTING_PACKAGE_FILES, TESTING_DIR } from '@test/support/constants';

/**
 * Constants
 */

const playground = new Playground(TESTING_DIR);

describe('[cli] Create:', () => {
  beforeAll(() => playground.create());

  afterAll(() => playground.destroy());

  beforeEach(() => playground.createBox('create_core'));

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

  it('should be able to render a template', done => {
    const destPath = playground.pathTo('app');
    const cmd = ['create', '--use=testing', '-v', 'app'];

    utils.spawn(cmd, { cwd: playground.box() }, function(err, stdout) {
      expect(
        utils.hasAllFileAndDirs(destPath, TESTING_PACKAGE_FILES)
      ).toBeTruthy();

      done();
    });
  });

  it('should be able to render a templates in a destination', done => {
    const destPath = playground.pathTo('app/src/components');
    const cmd = ['create', '--use=testing', '-v', 'app/src/components'];

    utils.spawn(cmd, { cwd: playground.box() }, function(err, stdout) {
      expect(
        utils.hasAllFileAndDirs(destPath, TESTING_PACKAGE_FILES)
      ).toBeTruthy();

      done();
    });
  });

  it('should be able to render multiple templates', done => {
    const appDest = playground.pathTo('app');
    const beeDest = playground.pathTo('bee');
    const componentDest = playground.pathTo('webapp/src/components');

    const cmd = [
      'create',
      '--use=testing',
      '-v',
      'app',
      'bee',
      'webapp/src/components'
    ];

    utils.spawn(cmd, { cwd: playground.box() }, function(err, stdout) {
      expect(
        utils.hasAllFileAndDirs(appDest, TESTING_PACKAGE_FILES)
      ).toBeTruthy();

      expect(
        utils.hasAllFileAndDirs(beeDest, TESTING_PACKAGE_FILES)
      ).toBeTruthy();

      expect(
        utils.hasAllFileAndDirs(componentDest, TESTING_PACKAGE_FILES)
      ).toBeTruthy();

      done();
    });
  });
});
