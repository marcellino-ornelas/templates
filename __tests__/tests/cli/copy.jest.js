/*
 * Modules
 */

import { TESTING_DIR } from '@test/utilities/constants';
import { tpsCli } from '@test/utilities/tps-cli';
import { init } from '@test/support/cli';
import Playground from '@test/utilities/playground';

const playground = new Playground(TESTING_DIR);

describe('Command Line: Copy', () => {
  beforeAll(() => playground.create());
  afterAll(() => playground.destroy());

  beforeEach(() => playground.createBox('copy'));

  it('should be able to copy a template', async () => {
    const cwd = playground.box();

    await init(cwd, { force: true });

    return tpsCli('copy react-component', { cwd }).then(() => {
      expect(playground.pathTo('.tps/react-component')).toBeDirectory();
    });
  });

  it('should error if not initialized', () => {
    const cwd = playground.box();

    return expect(
      tpsCli('copy react-component', { cwd, fail: true })
    ).rejects.toContain('Directory must be initialized with templates');
  });
});
