import Playground from '@test/support/playground';
import { tpsCli } from '@test/support/utils';
import { INIT_PACKAGE_FILES, TESTING_INIT_DIR } from '@test/support/constants';
import fs from 'fs-extra';

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
      return tpsCli('init', { cwd }).then(stdout => {
        expect(stdout).toContain('tps initialized');
        expect(playground.pathTo('.tps')).toHaveAllFilesAndDirectories(
          INIT_PACKAGE_FILES
        );
      });
    });

    it('should error out if repo is already initialized', () => {
      return expect(tpsCli('init', { cwd, fail: true })).rejects.toContain(
        'InitializedAlready'
      );
    });

    it('should error out if parent directory is already initialized', () => {
      expect(dist).toBeDirectory();

      return expect(
        tpsCli('init', { cwd: dist, fail: true })
      ).rejects.toContain('ParentDirectoryInitializedError');
    });

    it('should initialized directory when parent directory is already initialized and force is true', () => {
      expect(dist).toBeDirectory();

      return tpsCli('init --force', { cwd: dist }).then(stdout => {
        expect(stdout).toContain('tps initialized');
        expect(playground.pathTo('.tps')).toHaveAllFilesAndDirectories(
          INIT_PACKAGE_FILES
        );
        expect(playground.pathTo('dist/.tps')).toHaveAllFilesAndDirectories(
          INIT_PACKAGE_FILES
        );
      });
    });
  });
});
