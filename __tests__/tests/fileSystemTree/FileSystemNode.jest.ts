/*
 * Modules
 */

import * as path from 'path';
import { DirNode, FileNode } from '@tps/fileSystemTree';
import { TESTING_TPS } from '@test/utilities/constants';

/*
 * Constants
 */
const PATH_TO_TEMPLATES = path.join(TESTING_TPS, 'testing');

describe('[FileSystemTree] FileSystemNode:', () => {
  let indexFile: FileNode;
  let dbDir: DirNode;
  let dbFile: FileNode;
  let mainDir: DirNode;

  beforeAll(() => {
    mainDir = new DirNode('main', PATH_TO_TEMPLATES);
    // eslint-disable-next-line prefer-destructuring
    indexFile = mainDir.find({ name: 'index.js.dot' })[0] as FileNode;
    // eslint-disable-next-line prefer-destructuring
    dbDir = mainDir.find({ name: 'db' })[0] as DirNode;
    // eslint-disable-next-line prefer-destructuring
    dbFile = mainDir.find({ name: 'db.js' })[0] as FileNode;
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
