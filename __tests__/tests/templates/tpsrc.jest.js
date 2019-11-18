import { TESTING_DIR } from '@test/utilities/constants';
import Templates from '@test/templates';
import Playground from '@test/utilities/playground';
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

  /* Should separate opts from answers */
  // it('should load local tpsrc file', () => {
  //   const { opts } = tps;
  //   const { answers } = tps._prompts;

  //   expect(opts).toMatchObject({
  //     extendedDest
  //   });

  //   expect(answers).toEqual(
  //     expect.objectContaining({
  //       test: 'oh-yea'
  //     })
  //   );
  // });

  it('should be able to set opts in tpsrc', () => {
    const { opts } = tps;

    expect(opts).toMatchObject({
      extendedDest
    });
  });

  it('should be able to set answers in tpsrc', () => {
    const { answers } = tps._prompts;

    expect(answers).toEqual(
      expect.objectContaining({
        test: 'oh-yea'
      })
    );
  });

  it.todo(`
    should be able to set configurations for a global template
  `);

  it.todo(`
    should be able to set configurations for a local template
  `);

  it.todo(`
    should be able to override configurations from global tpsrc when a user has tpsrc in tps project
  `);

  it.todo(`
    should be able to override configurations from the root directory when: 
      A subdirectory has a tpsrc file and 
        A user cwd is inside of the subdirectory that has the tpsrcs
  `);

  it.todo(`
    should be able to override configurations from the root directory when: 
      A subdirectory has a tpsrc file and:
        renders a template with a buildpath that will go to a directory that has a tpsrc file
  `);

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
