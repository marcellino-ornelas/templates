import Playground from '@test/utilities/playground';
import {
  INIT_PACKAGE_FILES,
  TESTING_INIT_DIR
} from '@test/utilities/constants';
import fs from 'fs-extra';
import { init } from '@test/support/cli';

/**
 * Constants
 */

const playground = new Playground(TESTING_INIT_DIR);

/**
 * @docs api/cli/commands/init.md
 */
describe('Command Line: Init Local', () => {
  let cwd;
  let tpsPath;

  beforeAll(() => playground.create());
  afterAll(() => playground.destroy());

  let dist;
  beforeAll(() =>
    playground.createBox('init').then(() => {
      cwd = playground.box();
      tpsPath = playground.pathTo('.tps');
      dist = playground.pathTo('dist');
      return fs.mkdir(dist);
    })
  );

  /**
   * @docs api/cli/commands/init.md#initializing-a-repo
   */
  it('should be able to initialize an .tps/ folder in repo', () => {
    expect(tpsPath).not.toBeDirectory();
    return init(cwd);
  });

  it('should error out if repo is already initialized', () => {
    return expect(init(cwd, {}, { fail: true })).rejects.toContain(
      'InitializedAlreadyError'
    );
  });

  /**
   * @docs api/cli/commands/init.md#description
   */
  it('should error out if parent directory is already initialized', () => {
    expect(dist).toBeDirectory();

    return expect(init(dist, {}, { fail: true })).rejects.toContain(
      'ParentDirectoryInitializedError'
    );
  });

  /**
   * @docs api/cli/commands/init.md#forcing-a-repo
   */
  it('should initialized directory when parent directory is already initialized and force is true', () => {
    expect(dist).toBeDirectory();

    return init(dist, { force: true }).then(() => {
      expect(playground.pathTo('dist/.tps')).toHaveAllFilesAndDirectories(
        INIT_PACKAGE_FILES
      );
    });
  });
});
