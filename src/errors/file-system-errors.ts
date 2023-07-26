/* eslint-disable max-classes-per-file */

export class DirectoryNotFoundError extends Error {
  public path: string;

  constructor(directory: string) {
    super(`Directory does not exist (${directory})`);
    this.name = 'DirectoryNotFoundError';
    this.path = directory;
    this.message = `Directory does not exist (${this.path})`;
    Object.setPrototypeOf(this, DirectoryNotFoundError.prototype);
  }
}

export class FileExistError extends Error {
  public path: string;

  constructor(filePath: string) {
    super();
    this.name = 'FileExistError';
    this.path = filePath;
    this.message = `File already exists (${this.path})`;
  }
}

export class FileWriteError extends Error {
  public path: string;

  constructor(dest) {
    super();
    this.name = 'FileWriteError';
    this.path = dest;
    this.message = `File already exists (${this.path})`;
  }
}
