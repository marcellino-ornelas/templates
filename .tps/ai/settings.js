// @ts-check

/** @type {import('../../src/types/settings').SettingsFile} */
module.exports = {
	prompts: [
		{
			name: 'llm',
			description: 'Type of llm you want to use',
			tpsType: 'data',
			type: 'list',
			message: 'What type of llm do you want to use?',
			choices: ['openai', 'anthropic', 'huggingface'],
			default: 'openai',
		},
		// {
		// 	name: 'token',
		// 	description: 'Api token for llm Api',
		// 	tpsType: 'data',
		// 	type: 'input',
		// 	message: 'Enter your api token for the llm',
		// 	default: null,
		// },
	],
	events: {
		async onRender(tps) {
			console.log('hellooooo');
			const input = `hello`;

			const answers = tps.getAnswers();

			const token = `token`;

			console.log('hellooooo 22222', answers);
			const template = await getTemplateFromLLM(answers.llm, input, token);
			console.log('hellooooo 3');

			console.log(template);
		},
		// async onBuildPathRender(tps, { buildPath }) {},
		// async onBuildPathRendered(tps, { buildPath }) {},
		// async onRendered(tps, { dest, buildPaths }) {}
	},
};

const getTemplateFromLLM = async (apiType, inputPrompt, token) => {
	let response;

	console.log('using: ' + apiType);

	switch (apiType) {
		case 'openai':
			response = await fetch('https://api.openai.com/v1/chat/completions', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					model: 'gpt-4o', // Use a GPT model
					prompt: inputPrompt,
					max_tokens: 300,
				}),
			});
			console.log(await response.json());
			return (await response.json()).choices[0].text;

		case 'anthropic':
			response = await fetch('https://api.anthropic.com/v1/complete', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					model: 'claude-v1',
					prompt: inputPrompt,
					max_tokens: 300,
				}),
			});
			return (await response.json()).completion;

		// case 'huggingface':
		// 	response = await fetch(
		// 		'https://api-inference.huggingface.co/models/YOUR_MODEL',
		// 		{
		// 			method: 'POST',
		// 			headers: {
		// 				Authorization: `Bearer ${token}`,
		// 			},
		// 			body: JSON.stringify({ inputs: inputPrompt }),
		// 		},
		// 	);
		// 	return (await response.json())[0].generated_text;

		default:
			throw new Error('Unsupported API type');
	}
};
