export default class DotError extends Error {
  constructor(fileName, dest, originalError, originalFile) {
    super();
    this.name = 'DotError';
    this.fileName = fileName;
    this.dest = dest;
    this.originalError = originalError;
    this.message = `\
Dot File: ${originalFile}
File Being Created: ${this.fileName} 
Destination: ${dest}

Problem: ${this.originalError}
`;
  }
}
