import Playground from '@test/utilities/playground';
import { TESTING_INIT_DIR } from '@test/utilities/constants';
import fs from 'fs';
import { init } from '@test/support/cli';
import * as TPS from '@tps/utilities/constants';

/**
 * Constants
 */

const playground = new Playground(TESTING_INIT_DIR);

/**
 * @docs api/cli/commands/init.md#global-tps
 */
describe('Command Line: Init Global', () => {
  let cwd;

  beforeAll(() => playground.create());
  afterAll(() => playground.destroy());

  let dist;
  beforeAll(() =>
    playground.createBox('init').then(() => {
      cwd = playground.box();
      dist = playground.pathTo('dist');

      return fs.promises.mkdir(dist, { recursive: true });
    })
  );

  /**
   * @docs api/cli/commands/init.md#initializing-tps-globally
   */
  it('should be able to initialize a global .tps/ folder', () => {
    expect(TPS.GLOBAL_PATH).not.toBeDirectory();
    return init(cwd, { global: true }, {});
  });

  it('should error out if global is initialized', () => {
    expect(TPS.GLOBAL_PATH).toBeDirectory();
    return expect(
      init(cwd, { global: true }, { fail: true })
    ).rejects.toContain('GlobalInitializedAlreadyError');
  });

  it.todo('should not create a local tps folder if --global flag is true');
});
