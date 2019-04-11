/*
 * Modules
 */

import path from 'path';
import { DirNode, FileNode } from '@tps/fileSystemTree';
import * as TPS from '@tps/utilities/constants';

/*
 * Constants
 */
const PATH_TO_TEMPLATES = path.join(TPS.MAIN_TPS, 'testing');
const PATH_TO_MAIN_DIRECORY = path.join(PATH_TO_TEMPLATES, 'main');

describe('[FileSystemTree] FileSystemNode:', () => {
  let indexFile, dbDir, dbFile, mainDir;

  beforeAll(() => {
    mainDir = new DirNode('main', PATH_TO_TEMPLATES);
    indexFile = mainDir.find({ name: 'index.js.dot' })[0];
    dbDir = mainDir.find({ name: 'db' })[0];
    dbFile = mainDir.find({ name: 'db.js' })[0];
  });

  it('should be able to get relative path from a parent node', () => {
    expect(indexFile.getRelativePathFrom(mainDir)).toEqual('main/index.js.dot');
    expect(dbDir.getRelativePathFrom(mainDir)).toEqual('main/db');
    expect(dbFile.getRelativePathFrom(mainDir)).toEqual('main/db/db.js');

    expect(indexFile.getRelativePathFrom(mainDir, false)).toEqual(
      'index.js.dot'
    );
    expect(dbDir.getRelativePathFrom(mainDir, false)).toEqual('db');
    expect(dbFile.getRelativePathFrom(mainDir, false)).toEqual('db/db.js');
  });

  it('should have a property pathFromRoot', () => {
    expect(indexFile.pathFromRoot).toBe('index.js.dot');
    expect(dbDir.pathFromRoot).toEqual('db');
    expect(dbFile.pathFromRoot).toEqual('db/db.js');
  });
});
