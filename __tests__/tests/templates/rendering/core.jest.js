import fs from 'fs-extra';
import Templates from '@test/templates';
import Playground from '@test/utilities/playground';
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
    const destPath = playground.pathTo('app');
    const randomDest = playground.pathTo('app/some-random-file.js');

    const tps = new Templates('testing', { wipe: true });

    fs.outputFileSync(randomDest, 'blah');

    return tps.render(playground.box(), 'app').then(() => {
      expect(destPath).toHaveAllFilesAndDirectories(TESTING_PACKAGE_FILES);
      expect(randomDest).not.toBeFile();
    });
  });

  it('should be able to render packages', () => {
    const tps = new Templates('testing', { defaultPackage: false });
    tps.loadPackages(['main', 'store']);

    const destPath = playground.pathTo('app');

    return tps.render(playground.box(), 'app').then(() => {
      expect(destPath).toHaveAllFilesAndDirectories(TESTING_PACKAGE_FILES);
    });
  });
});
