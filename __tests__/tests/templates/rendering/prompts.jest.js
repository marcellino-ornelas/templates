import Templates from '@tps/templates';
import Playground from '@test/support/playground';
import { TESTING_DIR } from '@test/support/constants';
import * as utils from '@test/support/utils';

import inquirer from 'inquirer';

jest.mock('inquirer');

/**
 * Constants
 */

const playground = new Playground(TESTING_DIR);

describe('[Templates] Render Process:', () => {
  beforeAll(() => playground.create());

  afterAll(() => playground.destroy());

  describe('When Rendering with prompts', () => {
    let tps;
    beforeEach(() => {
      // add no default to this test to only test packages
      tps = new Templates({ defaultPackage: false });
      tps.use('testing-prompt');

      return playground.createBox('render_process_prompts');
    });

    it.each([['css', 'index.css'], ['less', 'index.less']])(
      'it should render a template with values passed into prompt',
      (answer, expected, done) => {
        const destPath = playground.pathTo('App');
        inquirer.prompt = jest.fn().mockResolvedValue({ cssType: answer });

        tps.render(playground.box(), 'App').then(() => {
          expect(tps.config.cssType).toBe(answer);
          expect(utils.hasAllFileAndDirs(destPath, [expected])).toBeTruthy();
          expect(tps.packages).toHaveProperty(answer);
          done();
        });
      }
    );

    it('should render a template when answering prompt with alias', done => {
      tps.verbose = true;
      const destPath = playground.pathTo('App');

      tps.loadConfig({ c: 'less' });

      expect(tps._prompts.needsAnswers()).toBeFalsy();

      tps.render(playground.box(), 'App').then(() => {
        expect(utils.hasAllFileAndDirs(destPath, ['index.less'])).toBeTruthy();
        expect(tps.packages).toHaveProperty('less');
        done();
      });
    });

    it('should render a template when answering prompt with alias', done => {
      const destPath = playground.pathTo('App');
      tps.loadConfig({ c: 'less' });

      expect(tps._prompts.needsAnswers()).toBeFalsy();

      tps.render(playground.box(), 'App').then(() => {
        expect(utils.hasAllFileAndDirs(destPath, ['index.less'])).toBeTruthy();
        expect(tps.packages).toHaveProperty('less');
        done();
      });
    });
  });
});
