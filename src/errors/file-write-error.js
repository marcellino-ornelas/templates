export default class FileWriteError extends Error {
  constructor(dest, error) {
    super();
    this.name = 'FileWriteError';
    this.path = filePath;
    this.message = `File already exists (${this.path})`;
  }
}
