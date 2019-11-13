/*
 * Modules
 */
import Playground from '@test/utilities/playground';
import { TESTING_DIR } from '@test/utilities/constants';
import * as utils from '@test/utilities/helpers';
import * as path from 'path';

/*
 * Constants
 */
const playground = new Playground(TESTING_DIR);

describe('[TPS][cli] new package', () => {
  beforeAll(() => playground.create());
  afterAll(() => playground.destroy());

  beforeEach(() => {
    return playground
      .createBox('new_package')
      .then(() => {
        return utils.spawn(['init', '--force'], { cwd: playground.box() });
      })
      .then(() => {
        return utils.spawn(['new', 'template', 'test'], {
          cwd: playground.box()
        });
      })
      .then(() => {
        const tpsPath = playground.pathTo('.tps');
        const tpsPathRc = playground.pathTo('.tps/.tpsrc');
        const testTemplateDefault = playground.pathTo('.tps/test/default');
        expect(tpsPath).toBeDirectory();
        expect(tpsPathRc).toBeFile();
        expect(testTemplateDefault).toBeDirectory();
      });
  });

  it('should create a new package', () => {
    return utils
      .spawn(['new', 'package', 'test', 'test-package'], {
        cwd: playground.box()
      })
      .then(() => {
        const testTemplatePackage = playground.pathTo('.tps/test/test-package');
        expect(testTemplatePackage).toBeDirectory();
      });
  });
});
