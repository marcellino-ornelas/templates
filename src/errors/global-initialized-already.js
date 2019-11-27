export default class GlobalInitializedAlreadyError extends Error {
  constructor(filePath) {
    super();
    this.name = 'GlobalInitializedAlreadyError';
    this.path = filePath;
    this.message = `tps is already initialized globally initialized`;
  }
}
