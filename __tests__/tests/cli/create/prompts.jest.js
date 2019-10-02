import Playground from '@test/support/playground';
import * as utils from '@test/support/utils';
import { TESTING_DIR } from '@test/support/constants';

/**
 * Constants
 */

const playground = new Playground(TESTING_DIR);

describe('[cli] Create:', () => {
  beforeAll(() => playground.create());

  afterAll(() => playground.destroy());

  beforeEach(() => playground.createBox('create_prompt'));

  describe.each([
    ['create', '--use=testing-prompt-types-select'],
    ['testing-prompt-types-select', '']
  ])('command ( %s %s )', (...command) => {
    it.each([['less'], ['css']])(
      'should be able answer prompts from command line arguments',
      (cssType, done) => {
        const destPath = playground.pathTo('App');

        const cmd = [...command, `--css=${cssType}`, '-v', 'App'];

        utils.spawn(cmd, { cwd: playground.box() }, function(err, stdout) {
          expect(destPath).toHaveAllFilesAndDirectories([`index.${cssType}`]);

          done();
        });
      }
    );
  });
});
