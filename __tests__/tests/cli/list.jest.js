/*
 * Modules
 */

import * as fs from 'fs-extra';
import { TESTING_TPS } from '@test/utilities/constants';
import { tpsCli } from '@test/utilities/tps-cli';

/*
 * Constants
 */
const ALL_LOCAL_TEMPLATES = fs.readdirSync(TESTING_TPS).filter((file) => {
  return file !== '.tpsrc';
});

/**
 * @docs api/cli/commands/list.md
 */
describe('Command Line: List', () => {
  /**
   * @docs api/cli/commands/list.md#list-all-templates
   */
  it('should be able to list out all templates', () => {
    return tpsCli('list').then((stdout) => {
      ALL_LOCAL_TEMPLATES.forEach((template) => {
        expect(stdout).toContain(template);
      });
    });
  });

  it.todo('should be able to get only local templates when passed --local');
  it.todo('should be able to get only local templates when passed --global');
});
