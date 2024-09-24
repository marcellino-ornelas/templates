// @ts-check
const { runCommand, packageManagers } = require('../../lib/tools/index');

/** @type {import('../../src/types/settings').SettingsFile} */
module.exports = {
	prompts: [
		// {
		// 	name: 'langauge',
		// 	aliases: ['l'],
		// 	description: 'Language express app will be in',
		// 	message:
		// 		'What type of language would you like to use for your express app?',
		// 	tpsType: 'data',
		// 	type: 'list',
		// 	choices: ['javascript', 'typescript'],
		// 	default: 'javascript',
		// },
		{
			name: 'packageManager',
			aliases: ['pm'],
			description: 'Type of package you want to use for package installation',
			message: 'What type of package manager would you like to use?',
			tpsType: 'data',
			type: 'list',
			choices: ['npm', 'yarn'],
			default: 'npm',
		},
		{
			name: 'api',
			aliases: ['a'],
			description: 'Adds a API route to the app',
			message: 'Do you want to add a API?',
			tpsType: 'package',
			type: 'confirm',
			default: true,
		},
		// {
		// 	name: 'routing',
		// 	aliases: ['r'],
		// 	description: 'Type of routing you want to use',
		// 	message: 'What type of router would you like to use?',
		// 	tpsType: 'package',
		// 	type: 'list',
		// 	choices: ['api', 'router'],
		// 	default: 'api', // TODO: probably should be router? maybe not?
		// },
	],
	events: {
		onRendered(tps, { buildPaths }) {
			const answers = tps.getAnswers();

			const pm = packageManagers[answers.packageManager];

			buildPaths.forEach((path) => {
				// TODO: if someone runs with multiple build paths it will display two "Running npm install"
				runCommand(pm, [path]);
			});
		},
	},
};
