/*
 * Modules
 */

const path = require('path');
const fs = require('fs');
const { DirNode, FileNode } = require('../src/FileTree');

/*
 * Constants
 */
const PATH_TO_TEMPLATES = path.join(__dirname, '.tps');
const PATH_TO_MAIN_DIRECORY = path.join(PATH_TO_TEMPLATES, 'main');

// describe('File Tree', () => {
describe('Directory Node', () => {
  let mainDir;

  beforeAll(() => {
    mainDir = new DirNode('main', PATH_TO_TEMPLATES);
    // console.log("main Directory", mainDir);
  });

  it('should have a name, path, fullPath and type properties', () => {
    expect(mainDir.name).toBe('main');
    expect(mainDir.parentPath).toBe(PATH_TO_TEMPLATES);
    expect(mainDir.type).toBe('dir');
    expect(mainDir.path).toBe(PATH_TO_MAIN_DIRECORY);
  });

  it('should render correct amout of child nodes', () => {
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
    expect(dirs.map(f => f.name)).toEqual(
      expect.arrayContaining(['server', 'db'])
    );
  });
});

describe('File Node', () => {
  let indexFile;
  const indexFileName = 'index.js.dot';
  const pathToFile = path.join(PATH_TO_MAIN_DIRECORY, indexFileName);

  beforeAll(() => {
    indexFile = new FileNode(indexFileName, PATH_TO_MAIN_DIRECORY);
    // console.log('index File', indexFile);
  });

  it('should have a name, path, parentPath, ext, fileName, data and type properties', () => {
    const { ext, name } = path.parse(pathToFile);

    expect(indexFile.name).toBe(indexFileName);
    expect(indexFile.parentPath).toBe(PATH_TO_MAIN_DIRECORY);
    expect(indexFile.type).toBe('file');
    expect(indexFile.ext).toBe(ext);
    expect(indexFile.fileName).toBe(name);

    expect(indexFile.data).toEqual(fs.readFileSync(indexFile.path));
  });
});

describe('FsNode', () => {
  let indexFile, dbDir, dbFile, mainDir;

  beforeAll(() => {
    mainDir = new DirNode('main', PATH_TO_TEMPLATES);
  });

  it('should have a name, path, parentPath, ext, fileName, data and type properties', () => {
    indexFile = mainDir.find({ name: 'index.js.dot' })[0];
    dbDir = mainDir.find({ name: 'db' })[0];
    dbFile = mainDir.find({ name: 'db.js' })[0];

    expect(indexFile.getRelativePathFrom(mainDir)).toEqual('main/index.js.dot');
    expect(dbDir.getRelativePathFrom(mainDir)).toEqual('main/db');
    expect(dbFile.getRelativePathFrom(mainDir)).toEqual('main/db/db.js');

    expect(indexFile.getRelativePathFrom(mainDir, false)).toEqual(
      'index.js.dot'
    );
    expect(dbDir.getRelativePathFrom(mainDir, false)).toEqual('db');
    expect(dbFile.getRelativePathFrom(mainDir, false)).toEqual('db/db.js');
  });
});
// });
