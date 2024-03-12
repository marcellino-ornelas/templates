import { DirectoryNode, FileNode } from '@tps/fileSystemTree';
import { MAIN_DIR } from '@tps/utilities/constants';
import fs from 'fs';
import path from 'path';

const TESTING_DIR = path.join(__dirname, '../__tests__');

const directories = [
	new DirectoryNode('.tps', TESTING_DIR),
	new DirectoryNode('.tps', MAIN_DIR),
	new DirectoryNode('tps-test-3rd-party-package', `${MAIN_DIR}/node_modules`),
];

(async () => {
	const DEFAULT_FILES = {};

	directories.forEach((dir) => {
		dir.find({ type: 'file' }).forEach((a: FileNode) => {
			const data = fs.readFileSync(a.path);
			DEFAULT_FILES[a.path] = data?.toString() ?? '';
		});
	});

	await fs.promises.writeFile(
		path.join(TESTING_DIR, 'templates.json'),
		JSON.stringify(DEFAULT_FILES, null, '\t'),
	);
})();
