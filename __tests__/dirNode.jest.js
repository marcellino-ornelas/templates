/*
 * Modules
 */

const path = require('path');
const fs = require('fs');
const { DirNode, FileNode } = require('../src/FileTree');

/*
 * Constants
 */
const REPO_PATH = path.join(__dirname, '..');
const PATH_TO_TEMPLATES = path.join(REPO_PATH, './templates');
const PATH_TO_MAIN_DIRECORY = path.join(PATH_TO_TEMPLATES, 'main');

// describe('File Tree', () => {
describe('Directory Node', () => {
  let mainDir;

  beforeAll(() => {
    mainDir = new DirNode('main', PATH_TO_TEMPLATES);
    // console.log('main Directory', mainDir);
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
// });
