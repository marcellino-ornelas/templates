import Templates from '@tps/templates';
import Playground from '@test/support/playground';
import { TESTING_PACKAGE_FILES, TESTING_DIR } from '@test/support/constants';
import * as utils from '@test/support/utils';
import { DirNode } from '@tps/fileSystemTree';

/**
 * Constants
 */

const playground = new Playground(TESTING_DIR);

describe('[Templates] Render Process:', () => {
  beforeAll(() => playground.create());

  afterAll(() => playground.destroy());

  beforeEach(() => playground.createBox('render_process'));

  it('should be able to render a local template', done => {
    let tps = new Templates();
    tps.use('testing');

    const destPath = playground.pathTo('App');

    tps.render(playground.box(), 'App').then(() => {
      expect(
        utils.hasAllFileAndDirs(destPath, TESTING_PACKAGE_FILES)
      ).toBeTruthy();
      done();
    });
  });

  it('should be able to render a local template with nested directories', done => {
    let tps = new Templates();
    tps.use('testing');

    const destPath = playground.pathTo('hey/App');

    tps.render(playground.box(), 'hey/App').then(() => {
      expect(
        utils.hasAllFileAndDirs(destPath, TESTING_PACKAGE_FILES)
      ).toBeTruthy();
      done();
    });
  });

  it('should be able to render a local template with multiple build paths', done => {
    let tps = new Templates();
    tps.use('testing');

    const buildPaths = ['App', 'Box', 'New'];

    tps.render(playground.box(), buildPaths).then(() => {
      buildPaths.forEach(buildPath => {
        const destPath = playground.pathTo(buildPath);
        expect(
          utils.hasAllFileAndDirs(destPath, TESTING_PACKAGE_FILES)
        ).toBeTruthy();
      });
      done();
    });
  });

  it('should be able to render packages', done => {
    let tps = new Templates({ defaultPackage: false });
    tps.use('testing');
    tps.loadPackages(['main', 'store']);

    const destPath = playground.pathTo('App');

    tps.render(playground.box(), 'App').then(() => {
      expect(
        utils.hasAllFileAndDirs(destPath, TESTING_PACKAGE_FILES)
      ).toBeTruthy();
      done();
    });
  });
});
