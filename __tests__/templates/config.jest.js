import Templates from '@tps/templates';

/**
 * Templates testing
 */
describe('[Templates] Config: ', () => {
  let tps;
  beforeAll(() => {
    tps = new Templates({
      noGlobalConfig: true
    });
    tps.use('testing');
  });

  it('should load local configurations', () => {
    const config = tps.config;

    expect(config).toEqual(
      expect.objectContaining({
        name: 'testing-config'
      })
    );
  });

  it('should allow user to add more configurations', () => {
    const newConfig = {
      name: 'testing-new-config',
      age: 24
    };

    tps.loadConfig(newConfig);

    const config = tps.config;

    expect(config).toEqual(expect.objectContaining(newConfig));
  });

  it('should throw error if it doesnt recieve an object as a argument', () => {
    const badConifgs = ['hey', false, true, 3456, []];

    badConifgs.forEach(badConifg => {
      expect(() => {
        tps.loadConfig(badConifg);
      }).toThrow();
    });
  });
});