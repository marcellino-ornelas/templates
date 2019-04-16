import Templates from '@tps/templates';
import Playground from '../support/playground';
import { TESTING_PACKAGE_FILES, TESTING_DIR } from '../support/constants';
import * as utils from '../support/utils';

import inquirer from 'inquirer';

jest.mock('inquirer');

/**
 * Constants
 */
const TEMPLATES_PATH = __dirname;

const playground = new Playground(TESTING_DIR);
/**
 * Templates testing
 */
describe('[Templates] Render Process:', () => {
  beforeAll(() => playground.create());

  afterAll(() => playground.destory());

  describe('Rendering', () => {
    beforeEach(() => playground.createBox('render_process'));

    it('should be able to render a local template', done => {
      let tps = new Templates();
      tps.use('testing');

      const destPath = playground.pathTo('App');

      tps.render(destPath, {}).then(() => {
        expect(
          utils.hasAllFileAndDirs(destPath, TESTING_PACKAGE_FILES)
        ).toBeTruthy();
        done();
      });
    });

    it('should be able to render packages', done => {
      let tps = new Templates({ default: false });
      tps.use('testing');
      tps.loadPackages(['main', 'store']);

      const destPath = playground.pathTo('App');

      tps.render(destPath, {}).then(() => {
        expect(
          utils.hasAllFileAndDirs(destPath, TESTING_PACKAGE_FILES)
        ).toBeTruthy();
        done();
      });
    });
  });

  describe('Render with prompts', () => {
    let tps;
    beforeEach(() => {
      // add no default to this test to only test packages
      tps = new Templates({ default: false });
      tps.use('testing-prompt');

      return playground.createBox('render_process_prompts');
    });

    it('should be able to render a local template by default', done => {
      const destPath = playground.pathTo('App');
      inquirer.prompt = jest.fn().mockResolvedValue({ cssType: 'css' });

      tps.render(destPath, {}).then(() => {
        expect(utils.hasAllFileAndDirs(destPath, ['index.css'])).toBeTruthy();
        done();
      });
    });

    it('should be able to render a local template by default', done => {
      const destPath = playground.pathTo('App');
      inquirer.prompt = jest.fn().mockResolvedValue({ cssType: 'less' });

      tps.render(destPath, {}).then(() => {
        expect(utils.hasAllFileAndDirs(destPath, ['index.less'])).toBeTruthy();
        done();
      });
    });
  });
});
