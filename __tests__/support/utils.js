/**
 * Modules
 */
import fs from 'fs';
import child from 'child_process';
import path from 'path';
import is from 'is';
import { DirNode } from '@tps/fileSystemTree';
import { MAIN_DIR } from '@tps/utilities/constants';

/**
 * Constants
 */
const cliPath = path.join(MAIN_DIR, 'cli/index.js');

export function spawn(additionalArgs = [], opts = {}, done) {
  if (!done) {
    if (is.function(opts)) {
      done = opts;
      opts = {};
    } else {
      throw new Error('Callback function is required');
    }
  }
  const args = [cliPath].concat(additionalArgs);
  child.execFile('node', args, opts, function(err, stdout, stderr) {
    if (!opts.fail && err) {
      console.log(`[CMD: ${args.join(' ')}]`, stdout);
      console.log('Error: ', err);
      expect(err).not.toBeDefined();
    }
    done(err, stdout);
  });
}
