export default class DirectoryNotFoundError extends Error {
  constructor(directory) {
    super();
    this.name = 'DirectoryNotFoundError';
    this.path = directory;
    this.message = `Directory does not exist (${this.path})`;
  }
}
