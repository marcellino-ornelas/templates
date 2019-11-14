/**
 * Modules
 */
import fs from 'fs';
import child from 'child_process';
import path from 'path';
import is from 'is';
import { DirNode } from '@tps/fileSystemTree';
import { MAIN_DIR } from '@tps/utilities/constants';
import { eachObj } from '@tps/utilities/helpers';

/**
 * Constants
 */
const cliPath = path.join(MAIN_DIR, 'cli/index.js');

export function spawn(additionalArgs = [], opts = {}, done) {
  if (!done) {
    if (is.function(opts)) {
      done = opts;
      opts = {};
    }
  }
  const args = [cliPath].concat(additionalArgs);
  if (done) {
    child.execFile('node', args, opts, function(err, stdout, stderr) {
      if (!opts.fail && err) {
        console.log(`[CMD: ${args.join(' ')}]`, stdout);
        console.log('Error: ', err);
        expect(err).not.toBeDefined();
      }
      done(err, stdout);
    });
  } else {
    return new Promise((resolve, reject) => {
      child.execFile('node', args, opts, function(err, stdout, stderr) {
        if (!opts.fail && err) {
          console.log(`[CMD: ${args.join(' ')}]`, stdout);
          console.log('Error: ', err);
          expect(err).not.toBeDefined();
        }
        return err ? reject(err) : resolve(stdout);
      });
    });
  }
}

export function tpsCli(command, opts = {}) {
  return new Promise((resolve, reject) => {
    const fullCommand = `node ${cliPath} ${command}`.replace(/\s\s/g, ' ');

    child.exec(fullCommand, opts, (err, stdout, stderr) => {
      if (err) {
        if (!opts.fail) {
          console.log(
            cliErrorHelper(fullCommand, err, opts.cwd, stdout, stderr)
          );
        }

        reject(stderr, err);
      } else {
        if (opts.verbose || opts.fail) {
          console.log(
            cliErrorHelper(fullCommand, err, opts.cwd, stdout, stderr)
          );
        }
        resolve(stdout);
      }
    });
  });
}

const cliErrorHelper = (command, err, cwd, stdout, stderr) => `\
Command: ${command}
Cwd: ${cwd}

-----------------------------
Error
-----------------------------

${err}

-----------------------------
stdout
-----------------------------

${stdout}

-----------------------------
stderr
-----------------------------

${stderr}
`;

const getFlagString = flag => {
  return `${flag.length === 1 ? `-` : `--`}${flag}`;
};

export const buildFlags = args => {
  let flags = '';

  eachObj(args, (value, flag) => {
    const flagString = getFlagString(flag);
    switch (true) {
      case is.boolean(value):
        // true
        flags += `${flagString}`;
        break;
      case is.string(value) || is.number(value):
        flags += `${flagString} ${value}`;
        break;
      case is.array(value):
        flags += `${flagString} ${value.join(' ')} --`;
        break;
    }

    flags += ' ';
  });

  return flags;
};

// console.log(buildFlags({ force: true }));

// console.log(buildFlags({ force: true, packages: ['hey', 'bye'], css: 'less' }));
