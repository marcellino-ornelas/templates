/* eslint-disable max-classes-per-file */

export class DirectoryNotFoundError extends Error {
  public name = 'DirectoryNotFoundError';

  public path: string;

  constructor(directory: string) {
    super(`Directory does not exist (${directory})`);
    this.path = directory;
    Object.setPrototypeOf(this, DirectoryNotFoundError.prototype);
  }
}

export class FileExistError extends Error {
  public name = 'FileExistError';

  public path: string;

  constructor(filePath: string) {
    super(`File already exists (${filePath})`);
    this.path = filePath;
  }
}

export class FileWriteError extends Error {
  public name = 'FileWriteError';

  public path: string;

  constructor(dest: string) {
    super(`File already exists (${dest})`);
    this.path = dest;
  }
}
