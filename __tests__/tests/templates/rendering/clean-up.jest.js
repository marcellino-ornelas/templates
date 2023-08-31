/* eslint-disable jest/no-conditional-expect */
/*
 * Modules
 */
import Playground from '@test/utilities/playground';
import { TESTING_DIR } from '@test/utilities/constants';
import Templates from '@test/templates';

jest.mock('fs');

const renderAllDirectoriesMock = jest
  .fn()
  .mockName('_renderAllDirectories')
  .mockImplementation(() => {
    throw new Error('_renderAllDirectories test');
  });

const renderAllFilesMock = jest
  .fn()
  .mockName('_renderAllDirectories')
  .mockImplementation(() => {
    throw new Error('_renderAllDirectories test');
  });

/*
 * Constants
 */
const playground = new Playground(TESTING_DIR);

describe('[Templates] Render Process:', () => {
  let tps;

  beforeAll(() => playground.create());
  afterAll(() => playground.destroy());

  beforeEach(() => {
    tps = new Templates('testing');

    return playground.createBox('create_clean_up');
  });

  it('should clean up directory if encounters a error in _renderAllDirectories', () => {
    tps.verbose = true;
    const dest = playground.box();
    const appDest = playground.pathTo('app');
    const renderAllDirectories = renderAllDirectoriesMock;
    // eslint-disable-next-line no-underscore-dangle
    tps._renderAllDirectories = renderAllDirectoriesMock;

    return tps.render(dest, 'app').catch(() => {
      expect(renderAllDirectories).toHaveBeenCalledTimes(1);
      expect(appDest).not.toBeDirectory();
    });
  });

  it('should clean up directory if encounters a error in _renderAllFiles', () => {
    const dest = playground.box();
    const appDest = playground.pathTo('app');

    const renderAllFiles = renderAllFilesMock;
    // eslint-disable-next-line no-underscore-dangle
    tps._renderAllFiles = renderAllFilesMock;

    return tps.render(dest, 'app').catch(() => {
      expect(renderAllFiles.mock.calls.length).toBe(1);
      expect(renderAllFiles).toHaveBeenCalledTimes(1);
      expect(appDest).not.toBeDirectory();
    });
  });
});
