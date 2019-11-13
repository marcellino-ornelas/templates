export default class InitializedAlready extends Error {
  constructor(filePath) {
    super();
    this.name = 'InitializedAlready';
    this.path = filePath;
    this.message = `tps is already initialized in this repo. ${filePath}`;
  }
}
