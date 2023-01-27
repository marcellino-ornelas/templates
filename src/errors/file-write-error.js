export default class FileWriteError extends Error {
  constructor(dest) {
    super();
    this.name = 'FileWriteError';
    this.path = dest;
    this.message = `File already exists (${this.path})`;
  }
}
