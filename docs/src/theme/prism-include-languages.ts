import siteConfig from '@generated/docusaurus.config';
import type * as PrismNamespace from 'prismjs';
import type { Optional } from 'utility-types';

export default function prismIncludeLanguages(
	PrismObject: typeof PrismNamespace,
): void {
	const {
		themeConfig: { prism },
	} = siteConfig;
	const { additionalLanguages } = prism as { additionalLanguages: string[] };

	// Prism components work on the Prism instance on the window, while prism-
	// react-renderer uses its own Prism instance. We temporarily mount the
	// instance onto window, import components to enhance it, then remove it to
	// avoid polluting global namespace.
	// You can mutate PrismObject: registering plugins, deleting languages... As
	// long as you don't re-assign it
	globalThis.Prism = PrismObject;

	additionalLanguages.forEach((lang) => {
		if (lang === 'php') {
			// eslint-disable-next-line global-require
			require('prismjs/components/prism-markup-templating.js');
		}
		// eslint-disable-next-line global-require, import/no-dynamic-require
		require(`prismjs/components/prism-${lang}`);
	});
	console.log(PrismObject.languages.bash);

	// eslint-disable-next-line no-param-reassign
	PrismObject.languages.bash = PrismObject.languages.extend('bash', {
		function: [
			PrismObject.languages.bash.function as PrismNamespace.TokenObject,
			/^tps/m,
		],
		'inquirer-prompt': {
			// This pattern captures the whole Inquirer.js prompt line
			pattern: /^\? .*$/m,
			greedy: true,
			inside: {
				// The first "?" symbol (starting character)
				'inquirer-start': {
					pattern: /^\?/,
					alias: 'function',
				},
				//  The question text (everything between "? " and before the answer)
				'inquirer-question': {
					pattern: /.*?\?/,
					lookbehind: true,
				},
				//  The question text (everything between "? " and before the answer)
				'inquirer-default-value': {
					pattern: /\s\(.*?\)\s?/,
					lookbehind: true,
					alias: 'comment',
				},
				// The answer text (everything after the question)
				'inquirer-answer': {
					pattern: /.*$/,
					lookbehind: true,
				},
			},
		},
	});

	delete (globalThis as Optional<typeof globalThis, 'Prism'>).Prism;
}
