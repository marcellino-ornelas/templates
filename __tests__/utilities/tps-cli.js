import child from 'child_process';
import { defaults } from '@tps/utilities/helpers';
import path from 'path';
import { MAIN_DIR } from '@tps/utilities/constants';

const cliPath = path.join(MAIN_DIR, 'cli/index.js');

const TPS_CLI_DEFAULT_OPTIONS = {
  verbose: false,
  fail: false,
};

/**
 * run a tps command line command.
 * `tps` is already included to the string so all you need to do is write the command out
 *
 * @param {string} command - command you would like to run
 * @param {Object} opts - options
 * @param {boolean} opts.verbose - run tps verbose mode
 * @param {boolean} opts.verbose - this command will fail on purpose
 *
 * @returns {Promise<string>} - resolves with stdout. rejects with stderr and err
 *
 * @example
 *
 *   tpsCli(`list`)
 *   tpsCli(`create --verbose`)
 *
 *   // options
 *   tpsCli(`create --verbose`, {
 *       fail: true
 *   })
 */
export function tpsCli(command, opts = {}) {
  const options = defaults(opts, TPS_CLI_DEFAULT_OPTIONS);
  if (process.env.DEBUG) {
    options.verbose = true;
  }
  const debug = opts.verbose ? 'DEBUG=tps ' : '';
  return new Promise((resolve, reject) => {
    const fullCommand = `${debug}node ${cliPath} ${command}`.replace(
      /\s\s/g,
      ' '
    );

    if (options.verbose) {
      console.log('command: ', fullCommand);
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

        reject(stdout, err);
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
