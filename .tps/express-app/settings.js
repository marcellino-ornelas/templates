// @ts-check

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
			name: 'routing',
			aliases: ['r'],
			description: 'Type of routing you want to use',
			message: 'What type of router would you like to use?',
			tpsType: 'package',
			type: 'list',
			choices: ['api', 'router'],
			default: 'api', // TODO: probably should be router? maybe not?
		},
	],
};
