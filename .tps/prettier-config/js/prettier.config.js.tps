/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const config = {
	{{{? tps.answers.spacing === 'spaces'}}}
	useTabs: false,
	tabWidth: 2,
	{{{??}}}
	useTabs: true,
	{{{?}}}
	trailingComma: 'es5',
	semi: true,
	singleQuote: true,
	printWidth: 80,
	arrowParens: 'always',
	bracketSpacing: true,
};

module.exports = config;
