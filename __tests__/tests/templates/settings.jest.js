/*
 * Modules
 */
import Templates from '@test/templates';

describe('[Templates] Settings:', () => {
  let tps;

  it('should load json settings correctly', () => {
    tps = new Templates('testing-settings-json');

    expect(tps.templateSettings).toEqual({
      name: 'lino',
    });
  });

  it('should load js settings correctly', () => {
    tps = new Templates('testing-settings-js');

    expect(tps.templateSettings).toEqual({
      name: 'lino',
    });
  });

  it('should be empty when no settings file is found', () => {
    tps = new Templates('testing-settings-no-settings');

    expect(tps.templateSettings).toEqual({});
  });
});
