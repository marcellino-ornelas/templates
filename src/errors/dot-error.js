export default class DotError extends Error {
  constructor(fileNode, errorMessage) {
    super();
    this.name = 'DotError';
    this.fileName = fileNode.name;
    this.path = fileNode.path;

    this.message = `${errorMessage} ( ${fileNode.path} )`;
  }
}
