import fs from 'fs';
import yargs from 'yargs/yargs';
import Templates from '@tps/templates';
import list from '@tps/cli/commands/list';
import {
  createFs,
  reset,
  init,
  mkTemplate,
  loadDefaultTemplates,
} from '@test/utilities/cli_v2';
import { mockConsoleLog } from '@test/utilities/mocks';

const vol = createFs();

describe('Command Line: list', () => {
  let log;

  beforeEach(() => {
    // log.reset();
    log = mockConsoleLog();
    reset(vol);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should be able to list out all templates', async () => {
    // jest.mocked(fs.readdirSync).mockImplementation(vol.readdirSync.bind(vol));
    jest.spyOn(fs, 'readdirSync').mockImplementation(vol.readdirSync.bind(vol));
    jest.spyOn(Templates, 'hasGloablTps').mockReturnValue(false);

    await init(vol);

    const parser = yargs().command(list);

    await parser.parseAsync('list');

    expect(log.get()).toContain('testing');
  });

  it('should be able to list out global templates', async () => {
    // jest.mocked(fs.readdirSync).mockImplementation(vol.readdirSync.bind(vol));
    jest.spyOn(fs, 'readdirSync').mockImplementation(vol.readdirSync.bind(vol));
    jest.spyOn(Templates, 'hasGloablTps').mockReturnValue(true);
    // ignore local folder, no need to do extra work
    jest.spyOn(Templates, 'hasLocalTps').mockReturnValue(false);

    await init(vol, true);

    mkTemplate(vol, 'testing-global', undefined, true);

    const parser = yargs().command(list);

    // ignore default folder, no need to do extra work
    await parser.parseAsync(['list', '--no-default']);

    expect(log.get()).toContain('testing-global');
  });

  it('should be able to list out default templates', async () => {
    // jest.mocked(fs.readdirSync).mockImplementation(vol.readdirSync.bind(vol));
    jest.spyOn(fs, 'readdirSync').mockImplementation(vol.readdirSync.bind(vol));
    // ignore global folder, no need to do extra work
    jest.spyOn(Templates, 'hasGloablTps').mockReturnValue(false);

    /**
     * Currently its impossible to test default packages because its
     * the same folder as your local packages. This happens because these
     * test are ran in the templates main folder
     *
     * To test default packages we turn off local packages so even tho its
     * the same folder as local we wont local packages
     */
    jest.spyOn(Templates, 'hasLocalTps').mockReturnValue(false);

    await init(vol);

    loadDefaultTemplates(vol);

    const parser = yargs().command(list);

    // ignore default folder, no need to do extra work
    await parser.parseAsync(['list']);

    expect(log.get()).toContain('react-component');

    expect(log.get()).not.toContain('init');
  });
});
