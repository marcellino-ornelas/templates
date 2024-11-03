{{{? tps.answers.experimental }}}
// @ts-check

/** @type {import('templates-mo/lib/types/settings').SettingsFile} */
{{{?}}}
module.exports = {
	{{{? tps.answers.annotate }}}
	/**
	 * Your template prompts go here. Prompt are a way to get dynamic data from
	 * users that are generating a new instance of your template
	 *
	 * {{#def.websiteUrl}}/docs/main/create-new-template/prompts
	 */
	prompts: [
		/**
		 * Example prompt
		 *
		 * @link {{#def.websiteUrl}}/docs/api/settings/prompt
		 */
		{
			name: 'example',
			type: 'confirm',
			tpsType: 'data',
			message: 'Do you want an example?',
			description: 'Generate a example prompt',
			/**
			 * Choices are only needed when prompt `type` is `list`, `rawlist` or `checkbox`
			 */
			// choices: [],
			/**
			 * Use `when` when you want this prompt asked only when the condition is met
			 */
			// when: (answers) => {},
			/**
			 * Default value for prompt
			 */
			default: false,
		},
	],
	{{{??}}}
	prompts: [],
	{{{?}}}
	{{{? tps.answers.experimental }}}
	{{{? tps.answers.annotate }}}
	/**
	* Experimental!
	* 
	* Events let you trigger actions based on certain lifecycles events. 
	*/
	{{{?}}}
	events: {
		{{{? tps.answers.annotate }}}
		/**
		 * Callback function to call before build paths are rendered
		 */
		{{{?}}}
		// async onRender(tps) {},
		{{{? tps.answers.annotate }}}
		/**
		 * Callback function to call before an build path is rendered
		 */
		{{{?}}}
		// async onBuildPathRender(tps, { buildPath }) {},
		{{{? tps.answers.annotate }}}
		/**
		 * Callback function to call when an build path is rendered
		 */
		{{{?}}}
		// async onBuildPathRendered(tps, { buildPath }) {},
		{{{? tps.answers.annotate }}}
		/**
		 * Callback function to call when all build paths are rendered
		 */
		{{{?}}}
		// async onRendered(tps, { dest, buildPaths }) {}
	},
	{{{?}}}
};
