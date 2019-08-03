/*
 * Modules
 */
import Playground from '@test/support/playground';
import * as utils from '@test/support/utils';
import { TESTING_DIR, TESTING_PACKAGE_FILES } from '@test/support/constants';
import fs from 'fs-extra';
/*
 * Constants
 */
const playground = new Playground(TESTING_DIR);

describe('[cli] Create:', () => {
  beforeAll(() => playground.create());
  afterAll(() => playground.destroy());

  beforeEach(() => playground.createBox('cli_create_flags'));

  describe.each([['create', '--use=testing-prompt'], ['testing-prompt', '']])(
    'command ( %s %s )',
    (...command) => {
      it('should be able to use -d flag to use all default prompt answers', done => {
        const destPath = playground.pathTo('App');
        const cmd = [...command, '-d', 'App'];

        utils.spawn(cmd, { cwd: playground.box() }, function(err, stdout) {
          expect(destPath).toHaveAllFilesAndDirectories(['index.css']);

          done();
        });
      });
    }
  );

  describe.each([['create', '--use=testing'], ['testing', '']])(
    'command ( %s %s )',
    (...command) => {
      it('should be able to use -p flag to all additional packages', done => {
        const destPath = playground.pathTo('app');
        const cmd = [...command, '-p=extras', '--', 'app'];

        utils.spawn(cmd, { cwd: playground.box() }, function(err, stdout) {
          expect(destPath).toHaveAllFilesAndDirectories([
            './extras.js',
            ...TESTING_PACKAGE_FILES
          ]);

          done();
        });
      });

      it('should be able to use --force flag', done => {
        const destPath = playground.pathTo('app');
        const indexDest = playground.pathTo('app/index.js');
        const cmd = [...command, '--force', 'app'];

        fs.outputFileSync(indexDest, 'blah');

        utils.spawn(cmd, { cwd: playground.box() }, function(err, stdout) {
          expect(destPath).toHaveAllFilesAndDirectories(TESTING_PACKAGE_FILES);

          done();
        });
      });
    }
  );

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
