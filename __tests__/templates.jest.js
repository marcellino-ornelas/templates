import path from 'path';
import Templates from '@tps/templates';
import Playground from './support/playground';
import { TESTING_PACKAGE_FILES } from './support/constants';
import * as utils from './support/utils';

/**
 * Constants
 */
const TEMPLATES_PATH = __dirname;

const playground = new Playground(TEMPLATES_PATH);

/**
 * Templates testing
 */
describe('Templates', () => {
  let tps;

  beforeAll(() => playground.create());

  afterAll(() => playground.destory());

  describe.skip('Packages', () => {
    beforeEach(() => {
      tps = new Templates();
      tps.use('testing');
    });

    // TODO
    it.skip('should be able to compile default packages', () => {});

    it('should be able to compile a package', () => {
      tps.loadPackages('main');
      expect(tps.packages).toHaveProperty('main');
    });

    it('should be able to compile many packages', () => {
      const pkgs = ['store', 'main'];
      tps.loadPackages(pkgs);

      pkgs.forEach(pkg => {
        expect(tps.packages).toHaveProperty(pkg);
      });
    });
    it('should throw an error when packages arnt passed in', () => {
      const errArgs = ['', {}, null, true, false];

      errArgs.forEach(errArg => {
        expect(() => {
          tps.loadPackages(errArg);
        }).toThrow();
      });
    });

    it('should not let you load a package if already loaded', () => {
      tps.loadPackage('main');

      expect(() => {
        tps.loadPackage('main');
      }).toThrow();
    });
  });

  describe('Render Process', () => {
    beforeAll(() => playground.createBox('render_process'));

    beforeEach(() => {
      tps = new Templates();
      tps.use('testing');
      tps.loadPackages(['main', 'store']);
    });

    it('should be able to render a local template', () => {
      const destPath = playground.pathTo('App');

      return tps.render(destPath, {}).then(() => {
        expect(
          utils.hasAllFileAndDirs(destPath, TESTING_PACKAGE_FILES)
        ).toBeTruthy();
      });
    });
  });
});
