export default class FileExistError extends Error {
  constructor(filePath) {
    super();
    this.name = 'FileExistError';
    this.path = filePath;
    this.message = `File already exists (${this.path})`;
  }
}
