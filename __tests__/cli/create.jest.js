import Playground from './support/playground';
import * as utils from './support/utils';
import { TESTING_PACKAGE_FILES, TESTING_DIR } from './support/constants';

/**
 * Constants
 */

const playground = new Playground(TESTING_DIR);

describe('[cli] Create: ', () => {
  let cwd;
  beforeAll(() =>
    playground.create().then(() => playground.createBox('create'))
  );

  afterAll(() => playground.destory());

  it('should be able to use the create command in cli', done => {
    const destPath = playground.pathTo('App');
    const cmd = ['create', '--use=testing', '-v', 'App'];

    utils.spawn(cmd, { cwd: playground.box() }, function(err, stdout) {
      expect(
        utils.hasAllFileAndDirs(destPath, TESTING_PACKAGE_FILES)
      ).toBeTruthy();

      done();
    });
  });
});
