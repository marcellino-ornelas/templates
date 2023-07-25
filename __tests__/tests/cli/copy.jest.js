/*
 * Modules
 */

import { TESTING_TPS, TESTING_DIR } from '@test/utilities/constants';
import { tpsCli, init } from '@test/utilities/tps-cli';
import Playground from '@test/utilities/playground';

const playground = new Playground(TESTING_DIR);

/**
 * @docs api/cli/commands/list.md
 */
describe('Command Line: Copy', () => {
  beforeAll(() => playground.create());
  afterAll(() => playground.destroy());

  beforeEach(() =>
    playground
      .createBox('copy')
      .then(() => init(playground.box(), { force: true }))
  );

  it('should be able to copy a template', () => {
    const cwd = playground.box();

    return tpsCli('copy testing', { cwd }).then(() => {
      // const newTemplatePath
      expect(playground.pathTo('.tps/testing')).toBeDirectory();
    });
  });
});
