/*
 * Modules
 */
import Playground from '@test/utilities/playground';
import { TESTING_DIR } from '@test/utilities/constants';
import Templates from '@test/templates';

/*
 * Constants
 */
const playground = new Playground(TESTING_DIR);

describe('[TPS] Utils:', () => {
  let tps;
  beforeAll(() => playground.create());
  afterAll(() => playground.destroy());

  beforeEach(() => {
    tps = new Templates('testing-utils');

    return playground.createBox('render_utils');
  });

  it('should be able to use change-case fn', () => {
    const indexFile = playground.pathTo('App/index.txt');
    const appFolder = playground.pathTo('App');

    tps.setAnswers({
      message: 'change case',
      fn: 'camelCase',
    });

    return tps.render(playground.box(), 'App').then(() => {
      expect(appFolder).toBeDirectory();
      expect(indexFile).toBeFile();
      expect(indexFile).toHaveFileContents('changeCase');
    });
  });

  it('should be able to use inflection fn', () => {
    const indexFile = playground.pathTo('App/index.txt');
    const appFolder = playground.pathTo('App');

    tps.setAnswers({
      message: 'inflection',
      fn: 'pluralize',
    });

    return tps.render(playground.box(), 'App').then(() => {
      expect(appFolder).toBeDirectory();
      expect(indexFile).toBeFile();
      expect(indexFile).toHaveFileContents('inflections');
    });
  });
});
