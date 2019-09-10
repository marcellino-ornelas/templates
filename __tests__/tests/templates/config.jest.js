import Templates from '@test/templates';

/**
 * Templates testing
 */
describe('[Templates] Config: ', () => {
  describe('Using basic features', () => {
    let tps;
    beforeAll(() => {
      tps = new Templates('testing', {
        noGlobalConfig: true
      });
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

    it("should throw error if it doesn't receive an object as a argument", () => {
      const badConifgs = ['hey', false, true, 3456, []];

      badConifgs.forEach(badConifg => {
        expect(() => {
          tps.loadConfig(badConifg);
        }).toThrow();
      });
    });
  });

  describe('Using Prompts features', () => {
    let tps;
    beforeEach(() => {
      tps = new Templates('testing-prompt', {
        noGlobalConfig: true
      });
    });

    it('should answer prompt when config is loaded', () => {
      tps.loadConfig({ cssType: 'less' });

      expect(tps._prompts.needsAnswers()).toBeFalsy();

      expect(tps._prompts.answers).toHaveProperty('cssType', 'less');
    });
  });
});
