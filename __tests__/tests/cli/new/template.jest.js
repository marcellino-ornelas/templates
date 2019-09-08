/*
 * Modules
 */
import Playground from '@test/support/playground';
import { TESTING_DIR } from '@test/support/constants';
import * as utils from '@test/support/utils';
import * as path from 'path';

/*
 * Constants
 */
const playground = new Playground(TESTING_DIR);

describe('[TPS][cli] new ', () => {
  beforeAll(() => playground.create());
  afterAll(() => playground.destroy());

  beforeEach(() => {
    return playground
      .createBox('new_package')
      .then(() => {
        return utils.spawn(['init', '--force'], { cwd: playground.box() });
      })
      .then(() => {
        const tpsPath = playground.pathTo('.tps');
        const tpsPathRc = playground.pathTo('.tps/.tpsrc');
        expect(tpsPath).toBeDirectory();
        expect(tpsPathRc).toBeFile();
      });
  });

  it('should create a new template', () => {
    return utils
      .spawn(['new', 'template', 'test'], {
        cwd: playground.box()
      })
      .then(() => {
        const testTemplateDefault = playground.pathTo('.tps/test/default');
        expect(testTemplateDefault).toBeDirectory();
      });
  });
});
