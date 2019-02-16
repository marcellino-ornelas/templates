/**
 * Modules
 */
const fs = require('fs');
const path = require('path');
const { DirNode } = require('../../src/FileTree');

/**
 * Constants
 */

const utils = (exports = module.exports);

utils.hasAllFileAndDirs = (path, filesAndDirs) => {
  const fileSystemTree = new DirNode(path);
  console.log(fileSystemTree);
  const hasAll = true;
  let found = 0;

  // console.log(filesAndDirs);
  const f = [];

  fileSystemTree.eachChild(tree => {
    f.push(tree.name);
  });
  // console.log('files', f);

  fileSystemTree.eachChild(tree => {
    // console.log(
    //   tree.name,
    //   '=====',
    //   tree.path,
    //   filesAndDirs.includes(tree.path)b
    // );
    const answer = filesAndDirs.includes(tree.path);

    answer && found++;
  });

  // console.log('here', filesAndDirs.length, found);

  return filesAndDirs.length === found;
};
