// @ts-check

const { packageManagers, runCommand } = require('../../lib/tools');

/** @type {import('../../lib/types/settings').SettingsFile} */
module.exports = {
	prompts: [
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
			name: 'typescript',
			description: 'Generate typescript files',
			aliases: ['t'],
			type: 'confirm',
			tpsType: 'data',
			message: 'Would you like to use typescript?',
			default: false,
		},
	],
	events: {
		async onRendered(tps, { dest, buildPaths }) {
			const answers = tps.getAnswers();

			const pm = packageManagers[answers.packageManager];

			buildPaths.forEach((path) => {
				// TODO: if someone runs with multiple build paths it will display two "Running npm install"
				runCommand(pm, dest, [path], tps);
			});
		},
	},
};
