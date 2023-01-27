/*
 * Modules
 */

import CreateDebug, { logFunctions } from '@tps/utilities/logger/createDebug';
import { debug } from 'debug';
import * as stripAnsi from 'strip-ansi';

/*
 * Constants
 */
const TIME_STRING = '2019-05-14T11:01:58.135Z';
const time = new Date(TIME_STRING);
jest.spyOn(global, 'Date').mockImplementation(() => time);

// let debug = require('debug');

// process.env.DEBUG = 'name:*';

/* let debug = require('debug');

console.log('hello yes me');
let name = debug('name');
let first = debug('name:first');
let firstLetter = debug('name:first:letter');
let extendLast = name.extend('first');
let extendLastNumber = extendLast.extend('blah');

console.log('DEBUG=' + process.env.DEBUG);
console.log(name.namespace, '---', name.enabled);
console.log(first.namespace, '---', first.enabled);
console.log(extendLast.namespace, '---', extendLast.enabled);
console.log(firstLetter.namespace, '---', firstLetter.enabled);
console.log(extendLastNumber.namespace, '---', extendLastNumber.enabled); */

// ==================================================
// DEBUG=name
// name --- true
// name:first --- false
// name:last --- false
// name:first:letter --- false
// name:last:number --- false
// ==================================================
// DEBUG=name:*
// name --- false                     ++++++++
// name:first --- true
// name:last --- true
// name:first:letter --- true
// name:last:number --- true
// ==================================================
// DEBUG=name:first
// name --- false
// name:first --- true
// name:last --- false
// name:first:letter --- false
// name:last:letter --- false
// // ==================================================
// DEBUG=name:first:*
// name --- false
// name:first --- false               ++++++++
// name:first:letter --- true
// name:first:blah --- true
// ==================================================
// DEBUG=name:*:letter
// name --- false
// name:first --- false               ++++++++
// name:last --- false                ++++++++
// name:first:letter --- true
// name:last:letter --- true
// ==================================================
// DEBUG=name:*:*
// name --- false
// name:first --- false
// name:last --- false
// name:first:letter --- true
// name:last:number --- true

/**
 * DEBUG=tps ....
 *    DEBUG=tps:info ....
 *    DEBUG=tps:log ....
 *    DEBUG=tps:error ....
 *    DEBUG=tps:warning ....
 *    DEBUG=tps:debug ....
 *
 * DEBUG=tps:log ....
 * DEBUG=tps:info ....
 * DEBUG=tps:error ....
 * DEBUG=tps:warning ....
 * DEBUG=tps:debug ....
 *
 * DEBUG=tps:* ....
 *    DEBUG=tps:log ....
 *    DEBUG=tps:info ....
 *    DEBUG=tps:error ....
 *    DEBUG=tps:warning ....
 *    DEBUG=tps:debug ....
 *    DEBUG=tps:cli:* ....
 *
 * DEBUG=tps:cli ....
 *    DEBUG=tps:cli:info ....
 *    DEBUG=tps:cli:log ....
 *    DEBUG=tps:cli:error ....
 *    DEBUG=tps:cli:warning ....
 *    DEBUG=tps:cli:debug ....
 *
 * DEBUG=tps:cli:* ....
 *    DEBUG=tps:cli:info ....
 *    DEBUG=tps:cli:log ....
 *    DEBUG=tps:cli:error ....
 *    DEBUG=tps:cli:warning ....
 *    DEBUG=tps:cli:debug ....
 *    DEBUG=tps:cli:run:*
 *
 */

describe('CreateDebug', () => {
  let createDebug;

  describe('basic', () => {
    beforeEach(() => {
      createDebug = new CreateDebug('test');
    });
    it('should be enabled when debug is same name (DEBUG=test)', () => {
      debug.enable('test');
      expect(createDebug.isEnabled()).toBeTruthy();
    });

    it('should enabled child loggers log, error, debug, success, warn, log if debug is already enabled', () => {
      debug.enable('test');

      // Needs to have this enabled already before creating debug
      createDebug = new CreateDebug('test');

      expect(createDebug.isEnabled()).toBeTruthy();

      logFunctions.forEach((type) => {
        const instanceKey = `_${type}`;
        expect(createDebug[instanceKey].enabled).toBeTruthy();
      });
    });

    it('should enabled child loggers log, error, debug, success, warn, log even after enabling after', () => {
      debug.enable('test');

      expect(createDebug.isEnabled()).toBeTruthy();

      // Need to manually cause a resync. In prod calling any of the logging functions will cause a resync
      // eslint-disable-next-line no-underscore-dangle
      createDebug._resync();

      logFunctions.forEach((type) => {
        const instanceKey = `_${type}`;
        expect(createDebug[instanceKey].enabled).toBeTruthy();
      });
    });

    it('should enabled child loggers log, error, debug, success, warn, log when a log functions gets called', () => {
      const mockChildLogger = jest.fn();
      const resyncMock = jest.fn(() =>
        // eslint-disable-next-line no-underscore-dangle
        CreateDebug.prototype._resync.call(createDebug)
      );

      createDebug = new CreateDebug('test', true);
      debug.enable('test');

      expect(createDebug.isEnabled()).toBeTruthy();

      logFunctions.forEach((type) => {
        const instanceKey = `_${type}`;
        expect(createDebug[instanceKey].enabled).toBeFalsy();
      });

      // eslint-disable-next-line no-underscore-dangle
      createDebug._resync = resyncMock;
      // eslint-disable-next-line no-underscore-dangle
      createDebug._log = mockChildLogger;

      createDebug.log('blah');

      expect(resyncMock).toHaveBeenCalled();
      expect(mockChildLogger).toHaveBeenCalled();

      logFunctions.forEach((type) => {
        const instanceKey = `_${type}`;
        expect(createDebug[instanceKey].enabled).toBeTruthy();
      });
    });
  });

  describe('logging', () => {
    let data = '';
    const oldConsoleLog = console.log;

    beforeAll(() => {
      // Do not show colors when testing
      debug.useColors = () => false;

      // Replace console.log with our mocked version.
      // The point of this is to save all logs to a variable so we can make assertions on it.
      // IN prod the logs that we get will look like:
      //  `tps log hello there +0ms`
      // when testing we switch to no colors and replace all asciis colors
      console.log = (...consoleArgs) => {
        const str = consoleArgs.join(' ').replace(`${TIME_STRING} `, '');
        data += stripAnsi(str);
      };
    });

    afterAll(() => {
      console.log = oldConsoleLog;
    });

    beforeEach(() => {
      data = '';
      debug.enable('');
      createDebug = new CreateDebug('test');
    });

    it('should enable child logger `log` by default', () => {
      // disable logging
      expect(createDebug.isEnabled()).toBeFalsy();

      // eslint-disable-next-line no-underscore-dangle
      expect(createDebug._log.enabled).toBeTruthy();

      createDebug.log('hello');

      expect(data).toBe('test log hello');
    });

    it('should not enable child loggers by default', () => {
      expect(createDebug.isEnabled()).toBeFalsy();

      logFunctions
        .filter((type) => type !== 'log')
        .forEach((type) => {
          expect(createDebug[`_${type}`].enabled).toBeFalsy();
          createDebug[type]('hello');
        });

      expect(data).toBe('');
    });

    it('should enable child logger `log` by default even when enabled after', () => {
      // disable logging
      debug.enable('test');
      createDebug = new CreateDebug('test', true);

      expect(createDebug.isEnabled()).toBeTruthy();

      debug.enable('');

      expect(createDebug.isEnabled()).toBeFalsy();

      createDebug.log('hello'); // will cause resync

      // eslint-disable-next-line no-underscore-dangle
      expect(createDebug._log.enabled).toBeTruthy();

      expect(data).toBe('test log hello');
    });
  });
});
