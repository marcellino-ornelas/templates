/*
 * Modules
 */
import Playground from '@test/support/playground';
import * as utils from '@test/support/utils';
import { TESTING_DIR, TESTING_PACKAGE_FILES } from '@test/support/constants';
/*
 * Constants
 */
const playground = new Playground(TESTING_DIR);

describe('[cli] Create:', () => {
  beforeAll(() => playground.create());
  afterAll(() => playground.destroy());

  beforeEach(() => playground.createBox('cli_create_flags'));

  it('should be able to use -d flag to use all default prompt answers', done => {
    const destPath = playground.pathTo('App');
    const cmd = ['create', '--use=testing-prompt', '-vd', 'App'];

    utils.spawn(cmd, { cwd: playground.box() }, function(err, stdout) {
      expect(utils.hasAllFileAndDirs(destPath, ['index.css'])).toBeTruthy();

      done();
    });
  });

  it('should be able to use -p flag to all additional packages', done => {
    const destPath = playground.pathTo('App');
    const cmd = ['create', '-p=extras', '--use=testing', 'App'];

    utils.spawn(cmd, { cwd: playground.box() }, function(err, stdout) {
      expect(
        utils.hasAllFileAndDirs(destPath, [
          'extras.js',
          ...TESTING_PACKAGE_FILES
        ])
      ).toBeTruthy();

      done();
    });
  });

  // it('should be able to use -f flag tell tps not to create a new folder', done => {
  //   const destPath = playground.pathTo('App');
  //   const cmd = ['create', '-f', '--use=testing', 'App'];

  //   utils.spawn(cmd, { cwd: playground.box() }, function(err, stdout) {
  //     expect(
  //       utils.hasAllFileAndDirs(destPath, [
  //         'extras.js',
  //         ...TESTING_PACKAGE_FILES
  //       ])
  //     ).toBeTruthy();

  //     done();
  //   });
  // });
});
