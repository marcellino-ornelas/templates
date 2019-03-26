import path from 'path';
import Playground from './support/playground';
import * as utils from './support/utils';
import { TESTING_PACKAGE_FILES, INIT_PACKAGE_FILES } from './support/constants';
import fs from 'fs';

/**
 * Constants
 */

const playground = new Playground(__dirname);

describe('Command Line: ', () => {
  beforeAll(() => playground.create());

  afterAll(() => playground.destory());

  describe('create', () => {
    let cwd;
    beforeAll(() =>
      playground.createBox('create').then(() => {
        cwd = playground.box();
      })
    );

    it('should be able to use the create command in cli', done => {
      const destPath = playground.pathTo('App');
      const cmd = ['create', '--use=testing', 'App'];

      utils.spawn(cmd, { cwd }, function(err, stdout) {
        expect(
          utils.hasAllFileAndDirs(destPath, TESTING_PACKAGE_FILES)
        ).toBeTruthy();

        done();
      });
    });
  });

  describe('init', () => {
    let destPath;
    let cwd;

    beforeAll(() =>
      playground.createBox('init').then(() => {
        cwd = playground.box();
        destPath = playground.pathTo('.tps');
      })
    );

    it('should not initailize if parents directory is initialized', done => {
      utils.spawn(['init'], { cwd, fail: true }, function(err, stdout) {
        expect(err).toBeDefined();
        expect(stdout).toBeDefined();
        done();
      });
    });

    it('should be able initialize tps', done => {
      //need to add --force because of .tps folder in main templates repo
      utils.spawn(['init', '--force'], { cwd }, function(err, stdout) {
        expect(err).toBeNull();
        expect(
          utils.hasAllFileAndDirs(destPath, INIT_PACKAGE_FILES)
        ).toBeTruthy();

        done();
      });
    });

    it('should not initialize if folder is already initialized', () => {
      utils.spawn(['init', '--force'], { cwd, fail: true }, function(
        err,
        stdout
      ) {
        expect(err).toBeDefined();
        expect(stdout).toBeDefined();
        done();
      });
    });
  });
});
