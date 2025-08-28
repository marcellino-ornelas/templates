import fs from 'fs';
import path from 'path';
import { errorExit } from '@tps/cli/utils/error-exit';
import { DirectoryNode } from '@tps/fileSystemTree/directoryNode';
import { FileNode } from '@tps/fileSystemTree/fileNode';
import * as TPS from '@tps/utilities/constants';
import { isDir, json } from '@tps/utilities/fileSystem';
import { TemplatesOptions } from '@tps/types/templates';

const changes = [
	{
		match: 'it.component.name',
		changeTo: 'tps.name',
	},
	{
		match: 'it.component.dir',
		changeTo: 'tps.dir',
	},
	{
		match: 'it.packages',
		changeTo: 'tps.packages',
	},
	{
		match: 'it.settings',
		changeTo: 'tps.answers',
	},
];

const convertText = (text) =>
	changes.reduce(
		(acc, { match, changeTo }) => acc.replaceAll(match, changeTo),
		text,
	);

export default {
	command: 'migrate [name]',

	description: 'Migrate from create components react',

	builder: {},

	handler(argv) {
		const name = argv.name || 'react-component';
		const localTps = TPS.LOCAL_PATH;
		const cwd = process.cwd();
		const ccrPath = path.join(cwd, '.ccr');
		const ccrTemplatesPath = path.join(ccrPath, 'templates');

		if (!TPS.IS_TPS_INITIALIZED) {
			errorExit(
				new Error(
					`Directory must be initialized with templates. Please run 'tps init'`,
				),
			);
		}

		// check to see if .ccr exists
		if (!isDir(ccrPath)) {
			errorExit(
				new Error(
					'No create components react directory. You sure your in the right place?',
				),
			);
			process.exit(1);
		}

		const ccrTemplates = new DirectoryNode(ccrTemplatesPath, null, false);
		const newTemplatePath = path.join(localTps, name);

		// fs.ensureDirSync(newTemplatePath);
		fs.mkdirSync(newTemplatePath, { recursive: true });

		ccrTemplates.depthFirstEach((child) => {
			if (ccrTemplates === child) return;

			if (child instanceof FileNode) {
				// eslint-disable-next-line no-underscore-dangle
				const data = child._getFileData().toString();
				const newFilePath = path.join(
					newTemplatePath,
					convertText(child.pathFromRoot),
				);
				console.log('Creating File: ', newFilePath);
				fs.writeFileSync(newFilePath, convertText(data));
			} else {
				const newDirPath = path.join(
					newTemplatePath,
					convertText(child.pathFromRoot),
				);
				console.log('Creating Dir: ', newDirPath);
				fs.mkdirSync(newDirPath, { recursive: true });
			}
		});

		const {
			extendCwd,
			// eslint-disable-next-line @typescript-eslint/no-unused-vars -- not supported
			default: defaultPackages,
			// eslint-disable-next-line @typescript-eslint/no-unused-vars -- not supported
			templates,
			...answers
		} = json(path.join(ccrPath, 'settings.json'));
		const tpsrcPath = path.join(TPS.DEFAULT_TPS, '.tpsrc');
		const tpsrc = json(tpsrcPath);

		const opts: Partial<TemplatesOptions> = {};

		if (extendCwd) opts.extendedDest = extendCwd;

		tpsrc[name] = {
			opts,
			answers,
		};

		// fs.writeJSONSync(tpsrcPath, tpsrc, { EOL: '\r\n', spaces: 2 });
		fs.writeFileSync(tpsrcPath, JSON.stringify(tpsrc, null, '\t'));
	},
};
