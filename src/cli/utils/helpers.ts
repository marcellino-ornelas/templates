import { sentenceCase } from 'change-case';
import Template from '@tps/templates';
import { Options } from 'yargs';

export const getCliArgsFromTemplate = (
	template: string,
): Record<string, Options> => {
	const tps = new Template(template);

	// eslint-disable-next-line no-underscore-dangle
	if (!tps?._prompts) return {};

	// eslint-disable-next-line no-underscore-dangle
	const templateOptions = tps._prompts.prompts.map((prompt) => {
		const type = ((): string => {
			switch (prompt.type ?? 'input') {
				case 'confirm':
					return 'boolean';
				case 'input':
				case 'list':
				case 'rawlist':
				case 'password':
					return 'string';
				case 'checkbox':
					return 'array';
				default:
					throw new Error(`Unsupported type: ${prompt.type}`);
			}
		})();

		return {
			describe: prompt.description,
			type,
			name: prompt.name,
			alias: prompt.aliases,
			...(prompt?.choices && { choices: prompt.choices }),
			// TODO: Will need to strip `tps-` prefix off of third party templates
			group: `${sentenceCase(tps.template)}:`,
			demandOption: false,
		};
	});

	return templateOptions?.reduce((acc, next) => {
		acc[next.name] = next;
		return acc;
	}, {});
};
