const path = require('path');
const Templates = require('../src/_templates');

/**
 * Constants
 */

const TEMPLATES_PATH = __dirname;

/**
 * Templates testing
 */
// const temps = new Template();

// const packages = [];
// temps.use('<template-folder>', packages);
// temps.use('<template-name>');
// should always look in `.tps/`

describe('Templates', () => {
  describe('Packages', () => {
    let tps;

    beforeEach(() => {
      tps = new Templates();
      tps.use(TEMPLATES_PATH);
    });

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
});
