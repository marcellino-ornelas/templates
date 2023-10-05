import * as path from 'path';
import { TPS_FOLDER } from '@tps/utilities/constants';
import { SettingsFilePrompt } from '@tps/types/settings';

export const TESTING_TPS: string = path.join(__dirname, `../${TPS_FOLDER}`);

export const TESTING_PACKAGE_FILES: string[] = [
	'./index.js',
	'./db',
	'./db/db.js',
	'./server',
	'./server/server.js',
	'./storeUtils',
	'./storeUtils/user.js',
];

export const INIT_PACKAGE_FILES: string[] = ['.tpsrc'];

export const TESTING_DIR: string = process.env.TEST_DIR
	? path.normalize(process.env.TEST_DIR)
	: path.join(__dirname, '../');

/**
 * In order to test init we need to use another folder other than this repo.
 * this is because tps init yells at you if your repo is already initialized.
 */
export const TESTING_INIT_DIR: string = path.join(TESTING_DIR, '../');

/**
 * Prompter constants
 */

export const PROMPTER_QUESTIONS: SettingsFilePrompt[] = [
	{
		name: 'testingPrompt',
		aliases: ['test1', 't'],
		type: 'confirm',
		tpsType: 'data',
		message: 'This is a testing testing prompt',
		default: 'default value',
	},
];
