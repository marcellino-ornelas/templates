/**
 * Modules
 */
const fs = require('fs');
const path = require('path');
const { DirNode } = require('../../lib/fileSystemTree');

/**
 * Constants
 */

const utils = (exports = module.exports);

utils.hasAllFileAndDirs = (path, filesAndDirs) => {
  const fileSystemTree = new DirNode(path);

  const hasAll = true;
  let found = 0;
  let paths = {};

  filesAndDirs.forEach(fileOrDir => {
    if (paths.hasOwnProperty(fileOrDir))
      throw new Error('There are duplicate file paths array');

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
};
