/*
 * Modules
 */
import Playground from '@test/utilities/playground';
import { TESTING_DIR } from '@test/utilities/constants';
import templates from '@test/templates';
import fileSystem from '@tps/fileSystem';
import utilities from '@tps/utilities';
import fileSystemTree from '@tps/fileSystemTree';

/*
 * Constants
 */
const playground = new Playground(TESTING_DIR);

describe('[TPS] _', () => {
  let tps;

  beforeAll(() => playground.create());
  afterAll(() => playground.destroy());

  beforeEach(() => {
    tps = new Templates();
    return playground.createBox('_');
  });

  it('should', () => {});
});
