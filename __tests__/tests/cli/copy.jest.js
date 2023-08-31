/*
 * Modules
 */

import { TESTING_DIR } from '@test/utilities/constants';
import { tpsCli } from '@test/utilities/tps-cli';
import { init, newTemplate } from '@test/support/cli';
import Playground from '@test/utilities/playground_legacy';

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

  it('should be able to copy a template and add new name', async () => {
    const cwd = playground.box();

    await init(cwd, { force: true });

    return tpsCli('copy react-component new-name', { cwd }).then(() => {
      expect(playground.pathTo('.tps/new-name')).toBeDirectory();
    });
  });

  it('should error if template already exists', async () => {
    const cwd = playground.box();

    await init(cwd, { force: true });

    await newTemplate(cwd, 'react-component');

    await expect(
      tpsCli('copy react-component', { cwd, fail: true })
    ).rejects.toContain(
      `Template react-component already exists in your directory`
    );
  });

  it('should error if name already exists', async () => {
    const cwd = playground.box();

    await init(cwd, { force: true });

    await newTemplate(cwd, 'new-name');

    await expect(
      tpsCli('copy react-component new-name', { cwd, fail: true })
    ).rejects.toContain(`Template new-name already exists in your directory`);
  });

  it('should error if not initialized', () => {
    const cwd = playground.box();

    return expect(
      tpsCli('copy react-component', { cwd, fail: true })
    ).rejects.toContain('Directory must be initialized with templates');
  });
});
