// @ts-check

/** @type {import('../../src/types/settings').SettingsFile} */
module.exports = {
	prompts: [
		{
			name: 'annotate',
			type: 'confirm',
			tpsType: 'data',
			message:
				'Do you want to include helpful comments to help you get started?',
			description:
				'Generates more verbose comments in the output to help users get started',
			default: true,
		},
		{
			name: 'type',
			type: 'list',
			tpsType: 'package',
			message: 'What type of settings file do you want?',
			description: 'Type of settings file you want generated',
			choices: ['js', 'json'],
			hidden: true,
			default: 'js',
		},
		{
			name: 'experimental',
			type: 'confirm',
			tpsType: 'data',
			message: 'Would you like to enable experimental features?',
			description: 'Use experimental features',
			hidden: true,
			default: false,
		},
	],
	events: {},
};
