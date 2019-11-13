import { tpsCli } from '@test/utilities/helpers';
import { INIT_PACKAGE_FILES } from '@test/utilities/constants';
import path from 'path';

/**
 * Init
 */
export const init = (repoPath, { force = false, fail = false } = {}) => {
  const tpsFolder = path.join(repoPath, '.tps');
  const forced = force ? '--force' : '';

  expect(repoPath).toBeDirectory();

  return tpsCli(`init ${forced}`, { cwd: repoPath, fail }).then(stdout => {
    expect(stdout).toContain('tps initialized');
    expect(tpsFolder).toBeDirectory();
    expect(tpsFolder).toHaveAllFilesAndDirectories(INIT_PACKAGE_FILES);
  });
};
