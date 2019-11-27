/*
 * Modules
 */
import Playground from '@test/utilities/playground';
import { TESTING_DIR } from '@test/utilities/constants';
import { init, newTemplate } from '@test/support/cli';

/*
 * Constants
 */
const playground = new Playground(TESTING_DIR);

describe('[TPS][cli] new ', () => {
  beforeAll(() => playground.create());
  afterAll(() => playground.destroy());

  beforeEach(() =>
    playground
      .createBox('new_package')
      .then(() => init(playground.box(), { force: true }))
  );

  /**
   * @docs api/cli/commands/new_commands/template.md
   */
  it('should create a new template', () => {
    return newTemplate(playground.box(), 'test');
  });
});
