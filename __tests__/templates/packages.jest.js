import Templates from '@tps/templates';

/**
 * Templates Packages
 */
describe('[Templates] Packages:', () => {
  let tps;

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
