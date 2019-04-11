import path from 'path';
import Templates from '@tps/templates';
import Playground from '../support/playground';
import { TESTING_PACKAGE_FILES, TESTING_DIR } from '../support/constants';
import * as utils from '../support/utils';

/**
 * Constants
 */
const TEMPLATES_PATH = __dirname;

const playground = new Playground(TESTING_DIR);

/**
 * Templates testing
 */
describe('[Templates] Render Process:', () => {
  let tps;

  beforeAll(() =>
    playground.create().then(() => playground.createBox('render_process'))
  );

  afterAll(() => playground.destory());

  beforeEach(() => {
    // add no default to this test to only test packages
    tps = new Templates();
    tps.use('testing');
    tps.loadPackages(['main', 'store']);
  });

  it('should be able to render a local template', () => {
    const destPath = playground.pathTo('App');

    return tps.render(destPath, {}).then(() => {
      expect(
        utils.hasAllFileAndDirs(destPath, TESTING_PACKAGE_FILES)
      ).toBeTruthy();
    });
  });
});
