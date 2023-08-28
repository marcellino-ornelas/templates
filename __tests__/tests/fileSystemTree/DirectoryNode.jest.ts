/*
 * Modules
 */
import * as path from 'path';
import fs from 'fs';
import { DirNode, FileSystemNode } from '@tps/fileSystemTree';
import { TESTING_TPS } from '@test/utilities/constants';

/*
 * Constants
 */
const PATH_TO_TEMPLATES = path.join(TESTING_TPS, 'testing');
const PATH_TO_MAIN_DIRECORY = path.join(PATH_TO_TEMPLATES, 'main');

describe('[FileSystemTree] DirectoryNode:', () => {
  let mainDir: DirNode;

  beforeAll(() => {
    mainDir = new DirNode('main', PATH_TO_TEMPLATES);
  });

  it('should have a name, path, fullPath and type properties', () => {
    expect(mainDir.name).toBe('main');
    expect(mainDir.parentPath).toBe(PATH_TO_TEMPLATES);
    expect(mainDir.type).toBe('dir');
    expect(mainDir.path).toBe(PATH_TO_MAIN_DIRECORY);
    expect(mainDir.pathFromRoot).toBe('.');
  });

  it('should render correct amount of child nodes', () => {
    const directoryCount = fs.readdirSync(PATH_TO_MAIN_DIRECORY).length;

    expect(mainDir.children).toHaveLength(directoryCount);
  });

  it('should be able to find element with find function', () => {
    const fileName = 'index.js.dot';
    const index = mainDir.find({ name: fileName });
    expect(index).toHaveLength(1);
    expect(index[0].name).toEqual(fileName);

    const dirs = mainDir.find({ type: 'dir' });
    expect(dirs).toHaveLength(2);
    expect(dirs.map((f) => f.name)).toEqual(
      expect.arrayContaining(['server', 'db'])
    );
  });

  it('should have a correct relative path from root node', () => {
    const fileName = 'db.js';
    const dbFile = mainDir.find({ name: fileName })[0];
    expect(dbFile.name).toEqual(fileName);
    expect(dbFile.pathFromRoot).toEqual('db/db.js');
  });

  it('should exclude files that match ignore files', () => {
    const filename = 'extras2.js';
    FileSystemNode.ignoreFiles = `**/${filename}.js`;
    mainDir = new DirNode('main', PATH_TO_TEMPLATES);
    const files = mainDir.find({ name: filename });
    expect(files).toHaveLength(0);
  });
});
