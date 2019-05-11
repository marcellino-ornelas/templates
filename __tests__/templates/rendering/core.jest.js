import Templates from '@tps/templates';
import Playground from '@test/support/playground';
import { TESTING_PACKAGE_FILES, TESTING_DIR } from '@test/support/constants';
import * as utils from '@test/support/utils';

/**
 * Constants
 */

const playground = new Playground(TESTING_DIR);

describe('[Templates] Render Process:', () => {
  beforeAll(() => playground.create());

  afterAll(() => playground.destory());

  describe('When Rendering', () => {
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
      let tps = new Templates({ default: false });
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
});
