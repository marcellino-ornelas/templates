/*
 * Modules
 */
import Playground from '@test/utilities/playground';
import { TESTING_DIR } from '@test/utilities/constants';
import Templates from '@test/templates';
import path from 'path';

/*
 * Constants
 */
const playground = new Playground(TESTING_DIR);

describe('[TPS] Rendering dynamic:', () => {
  let tps;

  beforeAll(() => playground.create());
  afterAll(() => playground.destroy());

  beforeEach(() => {
    tps = new Templates('testing-dynamic');
    return playground.createBox('rendering_dynamic');
  });

  it('should allow dot templating in filenames', () => {
    const destPath = path.join(playground.box(), 'App');
    const dynamicFile = path.join(destPath, 'App.js');

    return tps.render(playground.box(), ['App']).then(() => {
      expect(destPath).toBeDirectory();
      expect(dynamicFile).toBeFile();
    });
  });

  it.todo('should be able to use def files with one helper');
  it.todo('should be able to use def files that has multiple helpers');

  it("should set 'tps.name' to the new template being created", () => {
    const destPath = path.join(playground.box(), 'App');
    const indexFile = path.join(destPath, 'index.txt');
    return tps.render(playground.box(), ['App']).then(() => {
      expect(destPath).toBeDirectory();
      expect(indexFile).toHaveFileContents('App');
    });
  });

  it("should set 'tps.name' to the new template being created when using extended path", () => {
    const destPath = path.join(playground.box(), 'App/Nav');
    const indexFile = path.join(destPath, 'index.txt');
    return tps.render(playground.box(), ['App/Nav']).then(() => {
      expect(destPath).toBeDirectory();
      expect(indexFile).toHaveFileContents('Nav');
    });
  });

  it("should set 'tps.name' to the new template being created when using multiple build paths", () => {
    const destPaths = [
      [path.join(playground.box(), 'App'), 'App'],
      [path.join(playground.box(), 'Nav'), 'Nav'],
      [path.join(playground.box(), 'Nav/NavList'), 'NavList']
    ];

    return tps
      .render(playground.box(), ['App', 'Nav', 'Nav/NavList'])
      .then(() => {
        destPaths.forEach(([dest, contents]) => {
          expect(dest).toBeDirectory();
          expect(path.join(dest, 'index.txt')).toHaveFileContents(contents);
        });
      });
  });
});
