export default class InitializedAlreadyError extends Error {
  constructor(filePath) {
    super();
    this.name = 'InitializedAlreadyError';
    this.path = filePath;
    this.message = `tps is already initialized in this repo. ${filePath}`;
  }
}
