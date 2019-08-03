import fs from 'fs-extra';
import Templates from '@tps/templates';
import Playground from '@test/support/playground';
import { TESTING_PACKAGE_FILES, TESTING_DIR } from '@test/support/constants';
import {
  TemplateNotFound,
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
    expect(() => new Templates()).toThrowError(RequiresTemplateError);
  });

  it('should throw TemplateNotFound if no template is available', () => {
    expect(() => new Templates('some-random-template')).toThrowError(
      TemplateNotFound
    );
  });

  it('should throw DirectoryNotFoundError if dest does not exist', () => {
    let dest = playground.pathTo('non/existent/path');
    let tps = new Templates('testing');

    expect(tps.render(dest, 'app')).rejects.toThrowError(
      DirectoryNotFoundError
    );
  });

  it('should be able to render a local template', done => {
    let tps = new Templates('testing');

    const destPath = playground.pathTo('app');

    tps.render(playground.box(), 'app').then(() => {
      expect(destPath).toHaveAllFilesAndDirectories(TESTING_PACKAGE_FILES);
      done();
    });
  });

  it('should be able to render a local template with nested directories', done => {
    let tps = new Templates('testing');

    const destPath = playground.pathTo('hey/app');

    tps.render(playground.box(), 'hey/app').then(() => {
      expect(destPath).toHaveAllFilesAndDirectories(TESTING_PACKAGE_FILES);
      done();
    });
  });

  it('should be able to render a local template with multiple build paths', done => {
    let tps = new Templates('testing');

    const buildPaths = ['app', 'Box', 'New'];

    tps.render(playground.box(), buildPaths).then(() => {
      buildPaths.forEach(buildPath => {
        const destPath = playground.pathTo(buildPath);
        expect(destPath).toHaveAllFilesAndDirectories(TESTING_PACKAGE_FILES);
      });
      done();
    });
  });

  it("should be able to render a local template and keep all files that don't interfere with the template", done => {
    let tps = new Templates('testing');

    const destPath = playground.pathTo('app');
    const randomDest = playground.pathTo('app/some-random-file.js');

    fs.outputFileSync(randomDest, 'blah');

    tps.render(playground.box(), 'app').then(() => {
      expect(destPath).toHaveAllFilesAndDirectories(TESTING_PACKAGE_FILES);
      expect(randomDest).toBeFile();
      done();
    });
  });

  it('should be able to render a template with force, if files exist', done => {
    let tps = new Templates('testing', { force: true });

    const indexFile = playground.pathTo('app/index.js');

    fs.outputFileSync(indexFile, 'blah');

    const destPath = playground.pathTo('app');

    tps.render(playground.box(), 'app').then(() => {
      expect(destPath).toHaveAllFilesAndDirectories(TESTING_PACKAGE_FILES);
      done();
    });
  });

  it('should be able to render a template with wipe.', done => {
    const destPath = playground.pathTo('app');
    const randomDest = playground.pathTo('app/some-random-file.js');

    let tps = new Templates('testing', { wipe: true });

    fs.outputFileSync(randomDest, 'blah');

    tps.render(playground.box(), 'app').then(() => {
      expect(destPath).toHaveAllFilesAndDirectories(TESTING_PACKAGE_FILES);
      expect(randomDest).not.toBeFile();
      done();
    });
  });

  it('should be able to render packages', done => {
    let tps = new Templates('testing', { defaultPackage: false });
    tps.loadPackages(['main', 'store']);

    const destPath = playground.pathTo('app');

    tps.render(playground.box(), 'app').then(() => {
      expect(destPath).toHaveAllFilesAndDirectories(TESTING_PACKAGE_FILES);
      done();
    });
  });
});
