import Templates from '@test/templates';
import Playground from '@test/support/playground';
import { TESTING_DIR } from '@test/support/constants';

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
      tps = new Templates('testing-prompt', { defaultPackage: false });

      return playground.createBox('render_process_prompts');
    });

    it.each([['css', 'index.css'], ['less', 'index.less']])(
      'it should render a template with values passed into prompt',
      (answer, expected, done) => {
        const destPath = playground.pathTo('App');
        inquirer.prompt = jest.fn().mockResolvedValue({ cssType: answer });

        tps.render(playground.box(), 'App').then(() => {
          expect(tps.config.cssType).toBe(answer);
          expect(tps.packages).toHaveProperty(answer);
          expect(destPath).toHaveAllFilesAndDirectories([expected]);
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
        expect(destPath).toHaveAllFilesAndDirectories(['index.less']);
        expect(tps.packages).toHaveProperty('less');
        done();
      });
    });
  });
});
