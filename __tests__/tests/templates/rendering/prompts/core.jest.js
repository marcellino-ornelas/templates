/* eslint-disable no-import-assign */
/* eslint-disable no-underscore-dangle */
/*
 * Modules
 */
import Playground from '@test/utilities/playground';
import { TESTING_DIR } from '@test/utilities/constants';
import Templates from '@test/templates';
import * as inquirer from 'inquirer';

jest.mock('inquirer');

const defaultAnswers = {
  test1: 'package1',
};

/*
 * Constants
 */
const playground = new Playground(TESTING_DIR);

describe('[Templates] Prompts Process:', () => {
  let tps;

  beforeAll(() => playground.create());
  afterAll(() => playground.destroy());

  beforeEach(() => {
    tps = new Templates('testing-prompt-core');
    return playground.createBox('render_process_prompts_core');
  });

  it('should prompt user when needed', () => {
    expect(tps._prompts.needsAnswers()).toBeTruthy();
    inquirer.prompt = jest.fn().mockResolvedValue(defaultAnswers);

    return tps.render(playground.box(), 'App').then(() => {
      expect(playground.pathTo('App/readme.md')).toBeFile();
      expect(playground.pathTo('App/package1.js')).toBeFile();
    });
  });

  it('should not prompt a user when not needed', () => {
    expect(tps._prompts.needsAnswers()).toBeTruthy();
    const mockFunc = jest.fn().mockResolvedValue(defaultAnswers);
    inquirer.prompt = mockFunc;

    tps.setAnswers(defaultAnswers);
    expect(tps._prompts.needsAnswers()).toBeFalsy();

    return tps.render(playground.box(), 'App').then(() => {
      expect(playground.pathTo('App/readme.md')).toBeFile();
      expect(mockFunc).not.toHaveBeenCalled();
    });
  });

  it('should be able to answer prompt with alias', () => {
    const { test1, ...restOfAnswers } = defaultAnswers;

    expect(restOfAnswers).not.toHaveProperty('test1');

    tps.setAnswers({
      ...restOfAnswers,
      // Answer with alias instead of real name
      t: test1,
    });

    return tps.render(playground.box(), 'App').then(() => {
      expect(playground.pathTo('App/readme.md')).toBeFile();
      /* This file comes when test1 or t is answered as 'package1' */
      expect(playground.pathTo('App/package1.js')).toBeFile();
    });
  });

  it.todo('should add the prompt answer to tps.answers');
  describe.todo('should be able to use tpsType');
});
