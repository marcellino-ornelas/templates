import Playground from '@test/utilities/playground';
import * as utils from '@test/utilities/helpers';
import { TESTING_PACKAGE_FILES, TESTING_DIR } from '@test/utilities/constants';
import { createTemplate } from '@test/support/cli';

/**
 * Constants
 */

const playground = new Playground(TESTING_DIR);

describe('[cli] Create:', () => {
  beforeAll(() => playground.create());

  afterAll(() => playground.destroy());

  beforeEach(() => playground.createBox('create_core'));

  it('should be able to render a template', () => {
    // const destPath = playground.pathTo('app');
    // const cmd = [...command, 'app'];

    return createTemplate(playground.box(), 'testing', ['app']);
  });

  it('should be able to render a template in cwd if no file paths are entered', () => {
    const destPath = playground.box();

    // utils.spawn(command, { cwd: destPath }, function(err, stdout) {
    //   expect(destPath).toHaveAllFilesAndDirectories(TESTING_PACKAGE_FILES);

    //   done();
    // });

    return createTemplate(playground.box(), 'testing');
  });

  it.only('should be able to render a templates in a destination', () => {
    // const destPath = playground.pathTo('app/src/components');
    // const cmd = [...command, 'app/src/components'];

    // utils.spawn(cmd, { cwd: playground.box() }, function(err, stdout) {
    //   expect(destPath).toHaveAllFilesAndDirectories(TESTING_PACKAGE_FILES);

    //   done();
    // });

    return createTemplate(playground.box(), 'testing', 'app/src/components');
  });

  describe.each([
    ['create', '--use=testing'],
    ['testing', '']
  ])('command ( %s %s )', (...command) => {
    // it('should be able to render a template in cwd if no file paths are entered', done => {
    //   const destPath = playground.box();

    //   utils.spawn(command, { cwd: destPath }, function(err, stdout) {
    //     expect(destPath).toHaveAllFilesAndDirectories(TESTING_PACKAGE_FILES);

    //     done();
    //   });
    // });

    // it('should be able to render a template', done => {
    //   const destPath = playground.pathTo('app');
    //   const cmd = [...command, 'app'];

    //   utils.spawn(cmd, { cwd: playground.box() }, function(err, stdout) {
    //     expect(destPath).toHaveAllFilesAndDirectories(TESTING_PACKAGE_FILES);

    //     done();
    //   });
    // });

    // it('should be able to render a templates in a destination', done => {
    //   const destPath = playground.pathTo('app/src/components');
    //   const cmd = [...command, 'app/src/components'];

    //   utils.spawn(cmd, { cwd: playground.box() }, function(err, stdout) {
    //     expect(destPath).toHaveAllFilesAndDirectories(TESTING_PACKAGE_FILES);

    //     done();
    //   });
    // });

    it('should be able to render multiple templates', done => {
      const appDest = playground.pathTo('app');
      const beeDest = playground.pathTo('bee');
      const componentDest = playground.pathTo('webapp/src/components');

      const cmd = [...command, 'app', 'bee', 'webapp/src/components'];
      utils.spawn(cmd, { cwd: playground.box() }, function(err, stdout) {
        [appDest, beeDest, componentDest].forEach(dir =>
          expect(dir).toHaveAllFilesAndDirectories(TESTING_PACKAGE_FILES)
        );

        done();
      });
    });
  });
});
