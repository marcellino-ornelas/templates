import Playground from '../support/playground';
import * as utils from '../support/utils';
import { TESTING_PACKAGE_FILES, TESTING_DIR } from '../support/constants';

/**
 * Constants
 */

const playground = new Playground(TESTING_DIR);

describe('[cli] Create: ', () => {
  beforeAll(() => playground.create());

  afterAll(() => playground.destory());

  beforeEach(() => playground.createBox('create'));

  it.skip('should be able to use the create command in cli', done => {
    const destPath = playground.pathTo('App');
    const cmd = ['create', '--use=testing', '-v', 'App'];

    utils.spawn(cmd, { cwd: playground.box() }, function(err, stdout) {
      console.log('stdout', stdout);
      expect(
        utils.hasAllFileAndDirs(destPath, TESTING_PACKAGE_FILES)
      ).toBeTruthy();

      done();
    });
  });

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
