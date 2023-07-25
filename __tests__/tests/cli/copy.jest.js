/*
 * Modules
 */

import { TESTING_DIR } from '@test/utilities/constants';
import { tpsCli, init } from '@test/utilities/tps-cli';
import Playground from '@test/utilities/playground';

const playground = new Playground(TESTING_DIR);

describe('Command Line: Copy', () => {
  beforeAll(() => playground.create());
  afterAll(() => playground.destroy());

  beforeEach(() => playground.createBox('copy'));

  it('should be able to copy a template', () => {
    const cwd = playground.box();

    init(cwd, { force: true });

    return tpsCli('copy testing', { cwd }).then(() => {
      expect(playground.pathTo('.tps/testing')).toBeDirectory();
    });
  });

  it('should error if not initialized', () => {
    const cwd = playground.box();

    return expect(
      tpsCli('copy testing', { cwd, fail: true })
    ).rejects.toContain('Directory must be initialized with templates');
  });
});
