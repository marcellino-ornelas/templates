// ts-expect-error library is not available in tests
import type {
	SettingsFile,
	SettingsFilePrompt,
} from 'templates-mo/src/types/settings';
// ts-expect-error library is not available in tests
import Templates from 'templates-mo';

interface TemplatesLibrariesPluginOptions {
	templates: string[];
}

export const TemplatesLibrariesPlugin = function TemplatesLibrariesPlugin(
	context,
	{ templates }: TemplatesLibrariesPluginOptions,
) {
	return {
		name: 'templates-libraries-plugin',
		async contentLoaded({ actions }) {
			const { setGlobalData } = actions;

			const templatesSettings = await getTemplateSettings(templates);

			// sanitize data so we can pass it to the frontend
			const templatesSettingsSantitize: TemplateSettings[] =
				sanitizeTemplateSettings(templatesSettings);

			const templatesSettingsMap = templatesSettingsSantitize.reduce(
				(acc, templateSettings) => {
					acc[templateSettings.name] = templateSettings;
					return acc;
				},
				{},
			);

			setGlobalData({ templates: templatesSettingsMap });
		},
	};
};

interface TemplateSettings {
	name: string;
	settings: SettingsFile;
}

const getTemplateSettings = async (
	templates: string[],
): Promise<TemplateSettings[]> => {
	const templatesSettingsPromises: Promise<TemplateSettings>[] = templates.map(
		async (template) => {
			const tps = new Templates(template);

			return {
				name: tps.template,
				settings: tps.templateSettings,
			};
		},
	);

	return Promise.all(templatesSettingsPromises);
};

/**
 * `setGlobalData` only allows passing in JSON compliant data since build is in a different enviroment
 * well need to jsonify our data which involves getting rid functions and getting the value from `default`
 */
function sanitizeTemplateSettings(
	templatesSettings: TemplateSettings[],
): TemplateSettings[] {
	return templatesSettings.map((template) => {
		const answers = {};

		const prompts = template?.settings?.prompts?.map((prompt) => {
			const {
				default: _default,
				name,
				message,
				aliases,
				choices,
				tpsType,
				type,
				description,
				hidden,
			} = prompt;
			const defaultValue =
				typeof _default === 'function' ? _default(answers) : _default;

			answers[name] = defaultValue;

			return {
				name,
				message,
				aliases,
				choices,
				tpsType,
				type,
				description,
				hidden,
				default: defaultValue,
			} satisfies SettingsFilePrompt;
		});

		return {
			...template,
			settings: {
				...template.settings,
				prompts,
			},
		};
	});
}
