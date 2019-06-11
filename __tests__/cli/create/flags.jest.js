/*
 * Modules
 */
import Playground from '@test/support/playground';
import * as utils from '@test/support/utils';
import { TESTING_DIR, TESTING_PACKAGE_FILES } from '@test/support/constants';
/*
 * Constants
 */
const playground = new Playground(TESTING_DIR);

describe('[cli] Create:', () => {
  beforeAll(() => playground.create());
  afterAll(() => playground.destroy());

  beforeEach(() => playground.createBox('cli_create_flags'));

  it('should be able to use -f flag', done => {
    const destPath = playground.pathTo('App');
    const cmd = ['create', '--use=testing', '-vf', 'App'];

    utils.spawn(cmd, { cwd: playground.box() }, function(err, stdout) {
      expect(
        utils.hasAllFileAndDirs(playground.box(), TESTING_PACKAGE_FILES)
      ).toBeTruthy();

      done();
    });
  });
});
