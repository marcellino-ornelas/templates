/*
 * Modules
 */
import Playground from '@test/utilities/playground';
import { TESTING_DIR } from '@test/utilities/constants';
import { tpsCli } from '@test/utilities/helpers';

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
        return tpsCli('init --force', { cwd: playground.box() });
      })
      .then(() => {
        const tpsPath = playground.pathTo('.tps');
        const tpsPathRc = playground.pathTo('.tps/.tpsrc');
        expect(tpsPath).toBeDirectory();
        expect(tpsPathRc).toBeFile();
      });
  });

  it('should create a new template', () => {
    const testTemplateDefault = playground.pathTo('.tps/test/default');
    expect(testTemplateDefault).not.toBeDirectory();
    return tpsCli('new template test', { cwd: playground.box() }).then(() => {
      expect(testTemplateDefault).toBeDirectory();
    });
  });
});
