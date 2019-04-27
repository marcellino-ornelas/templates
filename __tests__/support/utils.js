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

export function hasAllFileAndDirs(dirPath, filesAndDirs = [], verbose) {
  if (!is.string(dirPath)) {
    throw new TypeError('Path must be a string');
  } else if (!is.array(filesAndDirs) || !filesAndDirs.length) {
    throw new TypeError(
      'filesAndDirs must be a array of file paths and directory paths'
    );
  }

  const fileSystemTree = new DirNode(dirPath, null);

  if (verbose) fileSystemTree.logTree(['pathFromRoot', 'path']);

  const hasAll = true;
  let found = 0;
  let paths = {};

  // Create full paths
  const check = filesAndDirs.map(fileOrDir => path.join(dirPath, fileOrDir));

  // save all paths to compare later
  check.forEach(fileOrDir => {
    if (paths.hasOwnProperty(fileOrDir)) {
      throw new Error('There are duplicate file paths array');
    }

    paths[fileOrDir] = false;
  });

  fileSystemTree.eachChild(tree => {
    const answer = paths.hasOwnProperty(tree.path);

    if (answer && paths[tree.path]) {
      throw new Error(
        'Looks like you have duplicate files in your DirNode tree???'
      );
    } else if (answer) {
      paths[tree.path] = true;
    }
  });

  for (let key in paths) {
    if (!paths[key]) {
      console.log('does not have file', key);
      return false;
    }
  }

  return true;
}

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
    }
    done(err, stdout);
  });
}
