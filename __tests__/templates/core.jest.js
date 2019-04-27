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

  describe('When Rendering', () => {
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

  describe('When Rendering with prompts', () => {
    let tps;
    beforeEach(() => {
      // add no default to this test to only test packages
      tps = new Templates({ default: false });
      tps.use('testing-prompt');

      return playground.createBox('render_process_prompts');
    });

    it.each([['css', 'index.css'], ['less', 'index.less']])(
      'it should render a template with values passed into prompt',
      (answer, expected, done) => {
        const destPath = playground.pathTo('App');
        inquirer.prompt = jest.fn().mockResolvedValue({ cssType: answer });

        tps.render(destPath, {}).then(() => {
          expect(utils.hasAllFileAndDirs(destPath, [expected])).toBeTruthy();
          expect(tps.packages).toHaveProperty(answer);
          done();
        });
      }
    );

    it('should render a template when answering prompt with alias', done => {
      const destPath = playground.pathTo('App');
      tps.loadConfig({ c: 'less' });

      expect(tps._prompts.needsAnswers()).toBeFalsy();

      tps.render(destPath, {}).then(() => {
        expect(utils.hasAllFileAndDirs(destPath, ['index.less'])).toBeTruthy();
        expect(tps.packages).toHaveProperty('less');
        done();
      });
    });
  });
});
