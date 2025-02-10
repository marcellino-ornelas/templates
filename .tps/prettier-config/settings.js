// @ts-check

/** @type {import('../../src/types/settings').SettingsFile} */
module.exports = {
	prompts: [
		{
			name: 'type',
			description: 'Type of config file you want to use',
			message: 'What type of config file do you want?',
			type: 'list',
			tpsType: 'package',
			choices: ['json', 'js'],
			default: 'json',
		},
		{
			name: 'spacing',
			description: 'Type of spacing you want to use',
			message: 'What type of spacing do you want to use?',
			type: 'list',
			tpsType: 'data',
			choices: ['spaces', 'tab'],
			default: 'spaces',
		},
		{
			name: 'ignore',
			hidden: true,
			description: 'Renders a .prettierignore file',
			message: 'Do you want a .prettierignore file?',
			type: 'confirm',
			tpsType: 'package',
			default: true,
		},
	],
};
