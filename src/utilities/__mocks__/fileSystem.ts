import * as findFileUp from 'find-up';
import { vol } from '@test/utilities/vol';

/**
 * Check to see if the `path` is a valid directory
 */
export function isDir(path: string): boolean {
  console.log('hey');
  let dir;
  try {
    dir = vol.lstatSync(path);
  } catch (e) {
    return false;
  }
  return dir.isDirectory();
}

/**
 * Check to see if the `path` is a valid file
 */
export function isFile(path: string): boolean {
  let file;
  try {
    file = vol.lstatSync(path);
  } catch (e) {
    return false;
  }
  return file.isFile();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function json(jsonFile: string): any {
  try {
    const jsonContents = vol.readFileSync(jsonFile).toString();
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
