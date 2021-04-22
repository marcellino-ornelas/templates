import MemoryFileSystem from 'memory-fs-extra';
import path from 'path';
import { TESTING_TPS } from '@test/utilities/constants';
import { DirectoryNode } from '@tps/fileSystemTree';

const MemoryFileSystem = require('memory-fs-extra');
const fs = require('fs-extra');

const fakefs = new MemoryFileSystem({});
const PATH = `/home/runner/work/templates/templates/__tests__/.tps/`;

fakefs.ensureDir(PATH);

const tpsDirectoryContents = fs.readdirSync(TESTING_TPS);

tpsDirectoryContents.forEach((dirname) => {
  const dir = new DirectoryNode(dirname, TESTING_TPS);

  dir.eachChild((child) => {
    child;
    const path = pasth.join(PATH, child.pathFromRoot);
    if (child.is('dir')) {
      fakefs.ensureDirSync(path);
    } else {
      fakefs.outputFileSync(path, child._getFileData());
    }
  });
});

fakefs.outputFileSync('/hey/bad.txt', 'blah');
fakefs.outputFileSync('/hey/god.txt', 'blah');

console.log(fakefs);

export default fs;
