import fs from 'fs-extra';
import Templates from '@test/templates';
import Playground from '@test/utilities/playground';
import path from 'path';
import { TESTING_PACKAGE_FILES, TESTING_DIR } from '@test/utilities/constants';
import {
  TemplateNotFoundError,
  DirectoryNotFoundError,
  RequiresTemplateError
} from '@tps/errors';

/**
 * Constants
 */

const playground = new Playground(TESTING_DIR);

describe('[Templates] Render Process:', () => {
  beforeAll(() => playground.create());

  afterAll(() => playground.destroy());

  beforeEach(() => playground.createBox('render_process'));

  it('should throw RequiresTemplateError if no template was set', () => {
    expect(() => new Templates()).toThrow(RequiresTemplateError);
  });

  it('should throw TemplateNotFound if no template is available', () => {
    expect(() => new Templates('some-random-template')).toThrow(
      TemplateNotFoundError
    );
  });

  it('should throw DirectoryNotFoundError if dest does not exist', () => {
    const dest = playground.pathTo('non/existent/path');
    const tps = new Templates('testing');

    return expect(tps.render(dest, 'app')).rejects.toThrow(
      DirectoryNotFoundError
    );
  });

  it('should be able to render a local template', () => {
    const tps = new Templates('testing');

    const destPath = playground.pathTo('app');

    return tps.render(playground.box(), 'app').then(() => {
      expect(destPath).toHaveAllFilesAndDirectories(TESTING_PACKAGE_FILES);
    });
  });

  it('should be able to render 1000 templates with no problems', () => {
    const all = [];

    for (let i = 0; i < 1000; i++) {
      const tps = new Templates('testing');
      const destPath = playground.pathTo(`app_${i}`);
      // eslint-disable-next-line jest/valid-expect-in-promise
      const promise = tps.render(playground.box(), `app_${i}`).then(() => {
        expect(destPath).toHaveAllFilesAndDirectories(TESTING_PACKAGE_FILES);
      });

      all.push(promise);
    }

    return Promise.all(all);
  });

  it('should be able to render a local template with nested directories', () => {
    const tps = new Templates('testing');

    const destPath = playground.pathTo('hey/app');

    return tps.render(playground.box(), 'hey/app').then(() => {
      expect(destPath).toHaveAllFilesAndDirectories(TESTING_PACKAGE_FILES);
    });
  });

  it('should be able to render a local template with multiple build paths', () => {
    const tps = new Templates('testing');

    const buildPaths = ['app', 'Box', 'New'];

    return tps.render(playground.box(), buildPaths).then(() => {
      buildPaths.forEach(buildPath => {
        const destPath = playground.pathTo(buildPath);
        expect(destPath).toHaveAllFilesAndDirectories(TESTING_PACKAGE_FILES);
      });
    });
  });

  it("should be able to render a local template and keep all files that don't interfere with the template", () => {
    const tps = new Templates('testing');

    const destPath = playground.pathTo('app');
    const randomDest = playground.pathTo('app/some-random-file.js');

    fs.outputFileSync(randomDest, 'blah');

    return tps.render(playground.box(), 'app').then(() => {
      expect(destPath).toHaveAllFilesAndDirectories(TESTING_PACKAGE_FILES);
      expect(randomDest).toBeFile();
    });
  });

  it('should be able to render a template with force, if files exist', () => {
    const tps = new Templates('testing', { force: true });

    const indexFile = playground.pathTo('app/index.js');

    fs.outputFileSync(indexFile, 'blah');

    const destPath = playground.pathTo('app');

    return tps.render(playground.box(), 'app').then(() => {
      expect(destPath).toHaveAllFilesAndDirectories(TESTING_PACKAGE_FILES);
    });
  });

  it('should be able to render a template with wipe.', () => {
    /**
     * directory structure before:
     *
     * {cwd}/
     *    | - app/
     *        | - some-random-file.js
     *        | - index.js
     */
    const destPath = playground.pathTo('app');
    const randomDest = playground.pathTo('app/some-random-file.js');
    const indexFile = playground.pathTo('app/index.js');

    const tps = new Templates('testing', { wipe: true });

    fs.outputFileSync(randomDest, 'blah');
    fs.outputFileSync(indexFile, 'blah');

    return tps.render(playground.box(), 'app').then(() => {
      expect(destPath).toHaveAllFilesAndDirectories(TESTING_PACKAGE_FILES);
      expect(randomDest).not.toBeFile();
      expect(indexFile).toHaveFileContents("console.log('hey');");
    });
  });

  /**
   * @docs api/cli/commands/use.md#when-using-a-long-build-path
   */
  it('should be able to render a template with wipe and a long build path', () => {
    /**
     * directory structure before:
     *
     * {cwd}/
     *    |- dest/
     *       | - random-file.js
     *       | - app/
     *           | - random-file-2.js
     *           | - index.js
     */
    const appPath = playground.pathTo('dest/app');
    const randomFileInDest = playground.pathTo('dest/random-file.js');
    const randomFileInApp = playground.pathTo('dest/app/random-file-2.js');
    const indexFileInApp = playground.pathTo('dest/app/index.js');

    const tps = new Templates('testing', { wipe: true });

    // Make file in dest
    fs.outputFileSync(randomFileInDest, 'blah');
    // Make file in build path
    fs.outputFileSync(randomFileInApp, 'blah');
    // Make file in build path
    fs.outputFileSync(indexFileInApp, 'blah');

    return tps.render(playground.box(), 'dest/app').then(() => {
      expect(randomFileInDest).toBeFile();
      expect(appPath).toHaveAllFilesAndDirectories(TESTING_PACKAGE_FILES);
      expect(randomFileInApp).not.toBeFile();
      expect(indexFileInApp).toBeFile();
    });
  });

  /**
   * @docs api/cli/commands/use.md#when-using-no-build-path
   */
  it('should be able to render a template with wipe when there is no buildPath', () => {
    /**
     * directory structure before:
     *
     * {cwd}/
     *    | - /should-not-be-deleted.js
     *    | - app/ <--- this will be the acting CWD for tps
     *        | - some-random-file.js
     *
     */
    const cwd = playground.pathTo('app');
    const randomDest = path.join(cwd, 'some-random-file.js');
    const randomFileNotInBuildPath = playground.pathTo(
      'should-not-be-deleted.js'
    );

    const tps = new Templates('testing', { wipe: true });

    fs.outputFileSync(randomDest, 'blah');
    fs.outputFileSync(randomFileNotInBuildPath);

    return tps.render(cwd, '').then(() => {
      expect(randomDest).toBeFile();
      expect(cwd).toHaveAllFilesAndDirectories(TESTING_PACKAGE_FILES);
      expect(randomFileNotInBuildPath).toBeFile();
    });
  });

  it('should be able to render a template with wipe and no new folder', () => {
    /**
     * directory structure before:
     *
     * {cwd}/
     *    | - app/
     *        | - some-random-file.js
     */
    const destPath = playground.pathTo('app');
    const randomDest = playground.pathTo('app/some-random-file.js');

    const tps = new Templates('testing-clean-up-wipe', {
      wipe: true,
      newFolder: false
    });

    fs.outputFileSync(randomDest, 'blah');

    return tps.render(playground.box(), 'app').then(() => {
      expect(destPath).toHaveAllFilesAndDirectories(TESTING_PACKAGE_FILES);
      expect(randomDest).not.toBeFile();
    });
  });

  // it('should not delete a parent directory contents');

  // it.only('should be able to render a template with wipe and no new folder', () => {
  //   const destPath = playground.pathTo('app');
  //   const randomDest = playground.pathTo('app/some-random-file.js');

  //   const tps = new Templates('testing-clean-up-wipe', {
  //     wipe: true,
  //     newFolder: false
  //   });

  //   fs.outputFileSync(randomDest, 'blah');

  //   return tps.render(playground.box(), 'app').then(() => {
  //     expect(destPath).toHaveAllFilesAndDirectories(TESTING_PACKAGE_FILES);
  //     expect(randomDest).not.toBeFile();
  //   });
  // });

  /**
   * @docs guide/getting-started/packages.md#including-more-packages
   */
  it('should be able to render packages', () => {
    const tps = new Templates('testing');
    tps.loadPackages(['extras', 'extras2']);

    const destPath = playground.pathTo('app');

    return tps.render(playground.box(), 'app').then(() => {
      expect(destPath).toHaveAllFilesAndDirectories([
        ...TESTING_PACKAGE_FILES,
        'extras.js',
        'extras2.js'
      ]);
    });
  });
});
