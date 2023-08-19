/*
 * Modules
 */

// import { TESTING_DIR } from '@test/utilities/constants';
import yargs from 'yargs/yargs';
import list from '@tps/cli/commands/list';
import { createFs, reset, init, mockConsoleLog } from '@test/utilities/cli_v2';
import * as c from '@tps/utilities/constants';
import fs from 'fs-extra';

jest.mock('fs-extra');
jest.mock('@tps/utilities/constants', () => {
  const actual = jest.requireActual('@tps/utilities/constants');

  return {
    ...actual,
    HAS_GLOBAL: false,
  };
});

const vol = createFs();

const log = mockConsoleLog();

describe('Command Line: list', () => {
  beforeEach(() => {
    log.reset();
    reset(vol);
  });

  it('should be able to list out all templates', async () => {
    jest.mocked(fs.readdirSync).mockImplementation(vol.readdirSync.bind(vol));

    await init(vol);

    const parser = yargs().command(list);

    await parser.parseAsync('list');

    // Verify the output is correct
    expect(log.get()).toBe(expect.stringContaining('testing'));
  });
});
