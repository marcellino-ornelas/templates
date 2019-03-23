import fs from 'fs';
import findFileUp from 'find-up';

/**
 * Check to see if the `path` is a valid directory
 * @param   {string} path - path to file or directory
 * @returns {boolean} - `path` is a directory
 */
export function isDir(path) {
  let dir;
  try {
    dir = fs.lstatSync(path);
  } catch (e) {
    return false;
  }
  return dir.isDirectory();
}

export function json(jsonFile) {
  try {
    const jsonContents = fs.readFileSync(jsonFile);
    return JSON.parse(jsonContents);
  } catch (err) {
    return {};
  }
}

export function findUp(folder, cwd = process.cwd()) {
  return findFileUp.sync(folder, {
    cwd
  });
}
