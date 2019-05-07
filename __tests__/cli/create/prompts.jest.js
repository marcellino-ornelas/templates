import Playground from '@test/support/playground';
import * as utils from '@test/support/utils';
import { TESTING_DIR } from '@test/support/constants';

/**
 * Constants
 */

const playground = new Playground(TESTING_DIR);

describe('[cli] Create:', () => {
  beforeAll(() => playground.create());

  afterAll(() => playground.destory());

  beforeEach(() => playground.createBox('create_prompt'));

  it.each([['less'], ['css']])(
    'should be able answer prompts from command line arguments',
    (cssType, done) => {
      const destPath = playground.pathTo('App');

      const cmd = [
        'create',
        '--use=testing-prompt',
        `--css=${cssType}`,
        '-v',
        'App'
      ];

      utils.spawn(cmd, { cwd: playground.box() }, function(err, stdout) {
        expect(
          utils.hasAllFileAndDirs(destPath, [`index.${cssType}`])
        ).toBeTruthy();

        done();
      });
    }
  );
});
