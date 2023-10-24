import { DirectoryNode, FileNode } from '@tps/fileSystemTree';
import { MAIN_DIR } from '@tps/utilities/constants';
import fs from 'fs';
import path from 'path';

(async () => {
	const DEFAULT_FILES = {};

	const TESTING_DIR = path.join(__dirname, '../__tests__');

	const dir = new DirectoryNode('.tps', TESTING_DIR);

	dir.find({ type: 'file' }).forEach((a: FileNode) => {
		const data = fs.readFileSync(a.path);
		DEFAULT_FILES[a.path] = data?.toString() ?? '';
	});

	const defaultDir = new DirectoryNode('.tps', MAIN_DIR);

	defaultDir.find({ type: 'file' }).forEach((a: FileNode) => {
		const data = fs.readFileSync(a.path);
		DEFAULT_FILES[a.path] = data?.toString() ?? '';
	});

	await fs.promises.writeFile(
		path.join(TESTING_DIR, 'templates.json'),
		JSON.stringify(DEFAULT_FILES, null, '\t'),
	);
})();
