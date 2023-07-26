import { FileNode } from '@tps/fileSystemTree';

export class DotError extends Error {
  public fileName: string;

  public path: string;

  constructor(fileNode: FileNode, errorMessage: string) {
    super();
    this.name = 'DotError';
    this.fileName = fileNode.name;
    this.path = fileNode.path;

    this.message = `${errorMessage} ( ${fileNode.path} )`;
  }
}
