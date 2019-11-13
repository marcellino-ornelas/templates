/*
 * Modules
 */

import path from 'path';
import fs from 'fs';
import { DirNode, FileNode } from '@tps/fileSystemTree';
import { TESTING_TPS } from '@test/utilities/constants';

/*
 * Constants
 */
const PATH_TO_TEMPLATES = path.join(TESTING_TPS, 'testing');
const PATH_TO_MAIN_DIRECORY = path.join(PATH_TO_TEMPLATES, 'main');

describe('[FileSystemTree] FileNode:', () => {
  let indexFile;
  const indexFileName = 'index.js.dot';
  const pathToFile = path.join(PATH_TO_MAIN_DIRECORY, indexFileName);

  beforeAll(() => {
    indexFile = new FileNode(indexFileName, PATH_TO_MAIN_DIRECORY);
  });

  it('should have a name, path, parentPath, ext, fileName, data and type properties', () => {
    const { ext, name } = path.parse(pathToFile);

    expect(indexFile.name).toBe(indexFileName);
    expect(indexFile.parentPath).toBe(PATH_TO_MAIN_DIRECORY);
    expect(indexFile.type).toBe('file');
    expect(indexFile.ext).toBe(ext);
    expect(indexFile.fileName).toBe(name);
    expect(indexFile.pathFromRoot).toBe('.');
  });
});
