/*
 * Modules
 */
import * as path from 'path';
import Playground from '@test/utilities/playground';
import { TESTING_DIR } from '@test/utilities/constants';
import Templates from '@tps/templates';

/*
 * Constants
 */
const playground = new Playground(TESTING_DIR);

describe('[TPS] Def files', () => {
  beforeAll(() => playground.create());
  afterAll(() => playground.destroy());

  beforeEach(() => {
    return playground.createBox('def_files');
  });

  it('should be able to render def file', () => {
    const tps = new Templates('testing-def-files');

    const destPath = path.join(playground.box(), 'app');
    const indexFile = path.join(destPath, 'index.txt');

    return tps.render(playground.box(), 'app').then(() => {
      expect(destPath).toBeDirectory();
      expect(indexFile).toHaveFileContents('This is a def file');
    });
  });

  it.todo(
    'should be able to render def file that has multiple defs in it',
    () => {}
  );
});
