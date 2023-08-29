import fs from 'fs';
import * as findFileUp from 'find-up';

// console.log('old filesystem', (fs as any).toTree);

/**
 * Check to see if the `path` is a valid directory
 */
export const isDir = (path: string): boolean => {
  let dir;
  try {
    dir = fs.lstatSync(path);
  } catch (e) {
    return false;
  }
  return dir.isDirectory();
};

/**
 * Check to see if the `path` is a valid file
 */
export const isFile = (path: string): boolean => {
  let file;
  try {
    file = fs.lstatSync(path);
  } catch (e) {
    return false;
  }
  return file.isFile();
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const json = (jsonFile: string): any => {
  try {
    const jsonContents = fs.readFileSync(jsonFile).toString();
    return JSON.parse(jsonContents);
  } catch (err) {
    return {};
  }
};

export const findUp = (folder: string, cwd: string = process.cwd()) => {
  return findFileUp.sync(folder, {
    cwd,
  });
};
