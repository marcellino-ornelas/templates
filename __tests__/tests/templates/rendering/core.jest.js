import * as fs from 'fs-extra';
import Templates from '@test/templates';
import Playground from '@test/utilities/playground';
import { TESTING_PACKAGE_FILES, TESTING_DIR } from '@test/utilities/constants';
import {
  TemplateNotFoundError,
  DirectoryNotFoundError,
  RequiresTemplateError,
} from '@tps/errors';
import * as path from 'path';

/**
 * Constants
 */

const playground = new Playground(TESTING_DIR);

describe('[Templates] Render Process:', () => {
  beforeAll(() => playground.create());

  afterAll(() => playground.destroy());

  beforeEach(() => playground.createBox('render_process'));

  it('should throw RequiresTemplateError if no template was set', () => {
    console.log(RequiresTemplateError);
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

  it('should be able to render a local template with long build path', () => {
    const tps = new Templates('testing');

    const destPath = playground.pathTo('hey/app');

    return tps.render(playground.box(), 'hey/app').then(() => {
      expect(destPath).toHaveAllFilesAndDirectories(TESTING_PACKAGE_FILES);
    });
  });

  it('should be able to render a local template with short build path with no new folder', () => {
    const tps = new Templates('testing', {
      newFolder: false,
    });

    const destPath = playground.box();

    return tps.render(destPath, 'app').then(() => {
      expect(destPath).toHaveAllFilesAndDirectories(TESTING_PACKAGE_FILES);
    });
  });

  it('should be able to render a local template with long build path with no new folder', () => {
    const tps = new Templates('testing', {
      newFolder: false,
    });

    const destPath = playground.pathTo('hey');

    return tps.render(playground.box(), 'hey/app').then(() => {
      expect(destPath).toHaveAllFilesAndDirectories(TESTING_PACKAGE_FILES);
    });
  });

  it('should be able to render a local template with multiple build paths', () => {
    const tps = new Templates('testing');

    const buildPaths = ['app', 'Box', 'New'];

    return tps.render(playground.box(), buildPaths).then(() => {
      buildPaths.forEach((buildPath) => {
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
        'extras2.js',
      ]);
    });
  });

  it('should have correct tps path', () => {
    const tps = new Templates('testing');

    const cwd = process.cwd();
    const expectedPath = path.join(cwd, '__tests__/.tps');

    expect(tps.tpsPath).toBe(expectedPath);
  });
});
