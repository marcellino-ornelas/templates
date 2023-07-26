import { FileNode } from '@tps/fileSystemTree';

export class DotError extends Error {
  public name = 'DotError';

  public fileName: string;

  public path: string;

  constructor(fileNode: FileNode, errorMessage: string) {
    super(`${errorMessage} ( ${fileNode.path} )`);
    this.fileName = fileNode.name;
    this.path = fileNode.path;
  }
}
