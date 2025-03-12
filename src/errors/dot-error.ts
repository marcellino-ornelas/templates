import { FileNode } from '@tps/fileSystemTree';

export class DotError extends Error {
	public name = 'DotError';

	constructor(
		public fileName: string,
		public path: string,
		errorMessage: string,
	) {
		super(`${errorMessage} ( ${path} )`);
	}
}
