import { TESTING_TPS } from '@test/support/constants';
import Templates from '@test/templates';
import Playground from '@test/support/playground';
import { TESTING_DIR } from '@test/support/constants';
import fs from 'fs';

/**
 * Templates testing tpsrc
 */
const playground = new Playground(TESTING_DIR);
const extendedDest = './new-path';

describe('[Templates] tpsrc: ', () => {
  beforeAll(() => playground.create());
  afterAll(() => playground.destroy());

  let tps;
  beforeAll(() => {
    tps = new Templates('testing-tpsrc', {
      noGlobalConfig: true
    });
  });

  it('should load local tpsrc file', () => {
    const opts = tps.opts;
    const answers = tps._prompts.answers;

    expect(opts).toMatchObject({
      extendedDest
    });

    expect(answers).toEqual(
      expect.objectContaining({
        test: 'oh-yea'
      })
    );
  });

  describe('when adding options in tpsrc', () => {
    beforeEach(() => playground.createBox('templates_tpsrc'));

    it('should be able to use extendDest', () => {
      const dest = playground.pathTo(`${extendedDest}`);
      const file = `${dest}/App/index.js`;
      fs.mkdirSync(dest);

      return tps.render(playground.box(), 'App').then(() => {
        expect(file).toBeFile();
      });
    });
  });
});
