/*
 * Modules
 */
import Playground from '@test/utilities/playground';
import { TESTING_DIR } from '@test/utilities/constants';
import { tpsCli } from '@test/utilities/helpers';
import * as path from 'path';
import { init } from '@test/support/cli';

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
      .then(() => init(playground.box(), { force: true }))
      .then(() => {
        return tpsCli('new template test', { cwd: playground.box() });
        // return utils.spawn(['new', 'template', 'test'], {
        //   cwd: playground.box()
        // });
      })
      .then(() => {
        const testTemplateDefault = playground.pathTo('.tps/test/default');
        expect(testTemplateDefault).toBeDirectory();
      });
  });

  it('should create a new package', () => {
    return tpsCli('new package test, test-package', {
      cwd: playground.box()
    }).then(() => {
      const testTemplatePackage = playground.pathTo('.tps/test/test-package');
      expect(testTemplatePackage).toBeDirectory();
    });
  });
});
