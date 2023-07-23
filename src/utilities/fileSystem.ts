import * as fs from 'fs';
import * as findFileUp from 'find-up';

/**
 * Check to see if the `path` is a valid directory
 * @param   {string} path - path to file or directory
 * @returns {boolean} - `path` is a directory
 */
export function isDir(path: string): boolean {
  let dir;
  try {
    dir = fs.lstatSync(path);
  } catch (e) {
    return false;
  }
  return dir.isDirectory();
}

export function isFile(path: string): boolean {
  let file;
  try {
    file = fs.lstatSync(path);
  } catch (e) {
    return false;
  }
  return file.isFile();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function json(jsonFile: string): any {
  try {
    const jsonContents = fs.readFileSync(jsonFile).toString();
    return JSON.parse(jsonContents);
  } catch (err) {
    return {};
  }
}

export function findUp(folder: string, cwd: string = process.cwd()) {
  return findFileUp.sync(folder, {
    cwd,
  });
}
