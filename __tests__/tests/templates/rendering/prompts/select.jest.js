import Templates from '@test/templates';
import Playground from '@test/utilities/playground';
import { TESTING_DIR } from '@test/utilities/constants';

import * as inquirer from 'inquirer';

jest.mock('inquirer');

/**
 * Constants
 */

const playground = new Playground(TESTING_DIR);

describe('[Templates] Prompts Process: when using select prompts', () => {
  beforeAll(() => playground.create());

  afterAll(() => playground.destroy());

  let tps;
  beforeEach(() => {
    // add no default to this test to only test packages
    tps = new Templates('testing-prompt-types-select', {
      defaultPackage: false,
    });

    return playground.createBox('render_process_prompts');
  });

  it.each([
    ['css', 'index.css'],
    ['less', 'index.less'],
  ])(
    'it should render a template with values passed into prompt',
    (answer, expected) => {
      const destPath = playground.pathTo('App');
      inquirer.prompt = jest.fn().mockResolvedValue({ cssType: answer });

      return tps.render(playground.box(), 'App').then(() => {
        expect(tps._prompts.answers.cssType).toBe(answer);
        expect(tps.packages).toHaveProperty(answer);
        expect(destPath).toHaveAllFilesAndDirectories([expected]);
      });
    }
  );

  it.only('should render a template when answering prompt with alias', (done) => {
    tps.verbose = true;
    const destPath = playground.pathTo('App');

    tps.setAnswers({ c: 'less' });

    expect(tps._prompts.needsAnswers()).toBeFalsy();

    tps.render(playground.box(), 'App').then(() => {
      expect(destPath).toHaveAllFilesAndDirectories(['index.less']);
      expect(tps.packages).toHaveProperty('less');
      done();
    });
  });
});
