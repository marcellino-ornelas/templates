import Templates from '@test/templates';
import { RequiresTemplateError } from '@tps/errors';

/**
 * Templates Packages
 */
describe('[Templates] Packages:', () => {
  let tps;

  beforeEach(() => {
    tps = new Templates('testing');
  });

  it('should be able to compile default package', () => {
    expect(tps.packages).toHaveProperty('default');
  });

  it('should not load default package if turn off', () => {
    const tpsNoDefault = new Templates('testing', { defaultPackage: false });

    expect(tpsNoDefault.opts.default).toBeFalsy();
    expect(tpsNoDefault.packages).not.toHaveProperty('default');
  });

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
