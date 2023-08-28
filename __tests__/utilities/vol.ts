import { DirectoryNode, FileNode } from '@tps/fileSystemTree';
import { Volume } from 'memfs';
import { Volume as _Volume } from 'memfs/lib/volume';
import { TESTING_DIR } from './constants';

const fs = jest.requireActual('fs');

export const vol = new Volume();

const DEFAULT_FILES = {
  [`${process.cwd()}/readme.md`]: '',
};

/**
 * Inside of constants, we override CWD to point to the __tests__ directory
 *
 * We may not have to do this anymore if everything is in memory but to be continued
 */
const dir = new DirectoryNode('.tps', TESTING_DIR);

dir.find({ type: 'file' }).forEach((a: FileNode) => {
  const data = fs.readFileSync(a.path);
  DEFAULT_FILES[a.path] = data?.toString() ?? '';
});

vol.fromJSON({
  [`${process.cwd()}/readme.md`]: '',
  [`${process.cwd()}/__tests__/readme.md`]: '',
  ...DEFAULT_FILES,
});
