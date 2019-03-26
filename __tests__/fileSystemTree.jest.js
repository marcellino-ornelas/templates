/*
 * Modules
 */

import path from 'path';
import fs from 'fs';
import { DirNode, FileNode } from '@tps/fileSystemTree';
import * as TPS from '@tps/utilities/constants';

/*
 * Constants
 */
const PATH_TO_TEMPLATES = path.join(TPS.MAIN_TPS, 'testing');
const PATH_TO_MAIN_DIRECORY = path.join(PATH_TO_TEMPLATES, 'main');

describe('File Tree', () => {
  describe('Directory Node', () => {
    let mainDir;

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

    it('should have a correct relative path from root node', () => {
      const fileName = 'db.js';
      const dbFile = mainDir.find({ name: fileName })[0];
      expect(dbFile.name).toEqual(fileName);
      expect(dbFile.pathFromRoot).toEqual('db/db.js');
    });
  });

  describe('File Node', () => {
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

  describe('FsNode', () => {
    let indexFile, dbDir, dbFile, mainDir;

    beforeAll(() => {
      mainDir = new DirNode('main', PATH_TO_TEMPLATES);
      indexFile = mainDir.find({ name: 'index.js.dot' })[0];
      dbDir = mainDir.find({ name: 'db' })[0];
      dbFile = mainDir.find({ name: 'db.js' })[0];
    });

    it('should be able to get relative path from a parent node', () => {
      expect(indexFile.getRelativePathFrom(mainDir)).toEqual(
        'main/index.js.dot'
      );
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
});
