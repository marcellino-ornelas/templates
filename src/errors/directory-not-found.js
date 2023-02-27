export default class DirectoryNotFoundError extends Error {
  constructor(directory) {
    super(`Directory does not exist (${directory})`);
    this.name = 'DirectoryNotFoundError';
    this.path = directory;
    this.message = `Directory does not exist (${this.path})`;
    Object.setPrototypeOf(this, DirectoryNotFoundError.prototype);
  }
}
