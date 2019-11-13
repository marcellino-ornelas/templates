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

describe('Command Line: Init', () => {
  let cwd;

  beforeAll(() => playground.create());
  afterAll(() => playground.destroy());

  describe('basic', () => {
    let dist;
    beforeAll(() =>
      playground.createBox('init').then(() => {
        cwd = playground.box();
        dist = playground.pathTo('dist');
        return fs.mkdir(dist);
      })
    );

    it('should be able initialize .tps/ folder', () => {
      return init(cwd);
    });

    it('should error out if repo is already initialized', () => {
      return expect(init(cwd, { fail: true })).rejects.toContain(
        'InitializedAlready'
      );
    });

    it('should error out if parent directory is already initialized', () => {
      expect(dist).toBeDirectory();

      return expect(init(dist, { fail: true })).rejects.toContain(
        'ParentDirectoryInitializedError'
      );
    });

    it('should initialized directory when parent directory is already initialized and force is true', () => {
      expect(dist).toBeDirectory();

      return init(dist, { force: true }).then(() => {
        expect(playground.pathTo('dist/.tps')).toHaveAllFilesAndDirectories(
          INIT_PACKAGE_FILES
        );
      });
    });
  });
});
