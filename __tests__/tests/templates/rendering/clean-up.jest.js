/*
 * Modules
 */
import Playground from '@test/support/playground';
import { TESTING_DIR } from '@test/support/constants';
import Templates from '@tps/templates';

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

  it('should clean up directory if encounters a error in _renderAllDirectories', done => {
    tps.verbose = true;
    const dest = playground.box();
    const appDest = playground.pathTo('app');
    const _renderAllDirectories = (tps._renderAllDirectories = renderAllDirectoriesMock);

    tps.render(dest, 'app').catch(error => {
      expect(_renderAllDirectories).toHaveBeenCalledTimes(1);
      expect(appDest).not.toBeDirectory();
      done();
    });
  });

  it('should clean up directory if encounters a error in _renderAllFiles', done => {
    const dest = playground.box();
    const appDest = playground.pathTo('app');

    const _renderAllFiles = (tps._renderAllFiles = renderAllFilesMock);

    tps.render(dest, 'app').catch(err => {
      expect(_renderAllFiles.mock.calls.length).toBe(1);
      expect(_renderAllFiles).toHaveBeenCalledTimes(1);
      expect(appDest).not.toBeDirectory();
      done();
    });
  });
});
