import Playground from '@test/utilities/playground';
import { TESTING_DIR } from '@test/utilities/constants';
import { createTemplate, checkFilesForTemplate } from '@test/support/cli';

/**
 * Constants
 */

const playground = new Playground(TESTING_DIR);

describe('[cli] Create:', () => {
  beforeAll(() => playground.create());

  afterAll(() => playground.destroy());

  beforeEach(() => playground.createBox('create_prompt'));

  it.each([['less'], ['css']])(
    'should be able answer prompts from command line arguments',
    (cssType) => {
      return createTemplate(
        playground.box(),
        'testing-prompt-types-select',
        'App',
        { css: cssType }
      ).then(() => {
        checkFilesForTemplate(playground.box(), 'App', [`index.${cssType}`]);
      });
    }
  );
});
