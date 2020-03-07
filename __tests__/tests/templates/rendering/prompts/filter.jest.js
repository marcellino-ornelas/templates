/*
 * Modules
 */
import Playground from '@test/utilities/playground';
import { TESTING_DIR } from '@test/utilities/constants';
import Templates from '@test/templates';

/*
 * Constants
 */
const playground = new Playground(TESTING_DIR);

describe('[Templates] Prompts Process:', () => {
  let tps;

  beforeAll(() => playground.create());
  afterAll(() => playground.destroy());

  beforeEach(() => {
    tps = new Templates('testing-prompt-filter');
    return playground.createBox('render_process_prompts_filter');
  });

  it('should be able to use inquirers filter with setAnswers', () => {
    tps.setAnswers({ test_filter: 'hey' });

    expect(tps._prompts.needsAnswers()).toBeFalsy();

    return tps.render(playground.box(), 'app').then(() => {
      expect(playground.pathTo('app/index.js')).toBeFile();
      expect(playground.pathTo('app/index.js')).toHaveFileContents(
        'Answer: hey__filtered END'
      );
    });
  });
});
