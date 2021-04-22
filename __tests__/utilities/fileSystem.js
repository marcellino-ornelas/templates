import fs from './fs';

export function isDir(path) {
  let dir;
  try {
    dir = fs.lstatSync(path);
  } catch (e) {
    return false;
  }
  return dir.isDirectory();
}

export function isFile(path) {
  let file;
  try {
    file = fs.lstatSync(path);
  } catch (e) {
    return false;
  }
  return file.isFile();
}
