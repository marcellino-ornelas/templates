/*
 * Modules
 */
import Playground from '@test/support/playground';
import { TESTING_DIR } from '@test/support/constants';
import Templates from '@tps/templates';
import { isDir } from '@tps/utilities/fileSystem';

/*
 * Constants
 */
const playground = new Playground(TESTING_DIR);

describe('[Templates] Render Process:', () => {
  let tps;

  beforeAll(() => playground.create());
  afterAll(() => playground.destroy());

  beforeEach(() => {
    tps = new Templates();
    tps.use('testing');

    return playground.createBox('create_clean_up');
  });

  it('should clean up directory if encounters a error', done => {
    const dest = playground.box();
    const appDest = playground.pathTo('app');
    const _renderAllFiles = (Templates.prototype._renderAllFiles = jest
      .fn()
      .mockImplementation(() => {
        throw new Error('blah');
      }));

    tps.render(dest, 'app').catch(() => {
      expect(_renderAllFiles).toHaveBeenCalledTimes(1);
      expect(isDir(appDest)).toBeFalsy();
      done();
    });
  });
});
