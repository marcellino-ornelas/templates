import * as fs from 'fs';
import findFileUp from 'find-up';

/**
 * Check to see if the `path` is a valid directory
 * @param path - path to file or directory
 * @returns {boolean} - `path` is a directory
 */
export function isDir(path: string) {
  let dir;
  try {
    dir = fs.lstatSync(path);
  } catch (e) {
    return false;
  }
  return dir.isDirectory();
}

export function isFile(path: string) {
  let file;
  try {
    file = fs.lstatSync(path);
  } catch (e) {
    return false;
  }
  return file.isFile();
}

export function json(jsonFile: string) {
  try {
    const jsonContents = fs.readFileSync(jsonFile);
    return JSON.parse(jsonContents.toString());
  } catch (err) {
    return {};
  }
}

export function findUp(folder: string, cwd = process.cwd()) {
  return findFileUp.sync(folder, {
    cwd,
  });
}
