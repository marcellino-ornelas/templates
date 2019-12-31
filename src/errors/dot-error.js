export default class DotError extends Error {
  constructor(fileName, dest, originalError) {
    super();
    this.name = 'DotError';
    this.fileName = fileName;
    this.dest = dest;
    this.originalError = originalError;
    this.message = `
File: ${this.fileName} 
Destination: ${dest}

Problem: ${this.originalError}
`;
  }
}
