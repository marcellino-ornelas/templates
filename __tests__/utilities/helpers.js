/**
 * Modules
 */
import child from 'child_process';
import path from 'path';
import is from 'is';
import { MAIN_DIR } from '@tps/utilities/constants';
import { eachObj, defaults } from '@tps/utilities/helpers';

/**
 * Constants
 */
const cliPath = path.join(MAIN_DIR, 'cli/index.js');

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

  if (!is.object(args)) {
    return flags;
  }

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
      default:
        break;
    }

    flags += ' ';
  });

  return flags;
};

const TPS_CLI_DEFAULT_OPTIONS = {
  verbose: false,
  fail: false
};

export function tpsCli(command, opts = {}) {
  const options = defaults(opts, TPS_CLI_DEFAULT_OPTIONS);
  return new Promise((resolve, reject) => {
    const fullCommand = `node ${cliPath} ${command}`.replace(/\s\s/g, ' ');

    if (process.env.DEBUG) {
      options.verbose = true;
    }

    child.exec(fullCommand, options, (err, stdout, stderr) => {
      if (err) {
        if (!options.fail) {
          console.log(
            cliErrorHelper(fullCommand, err, options.cwd, stdout, stderr)
          );
          console.log(command);
          expect(options.fail).toBeTruthy();
        }

        reject(stderr, err);
      } else {
        if (options.verbose || options.fail) {
          console.log(
            cliErrorHelper(fullCommand, err, options.cwd, stdout, stderr)
          );

          expect(options.fail).toBeFalsy();
        }
        resolve(stdout);
      }
    });
  });
}
