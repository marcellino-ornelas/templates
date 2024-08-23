import type {
	SettingsFile,
	SettingsFilePrompt,
} from '../../src/types/settings';

const TEMPLATES_LIBRARIES: string[] = ['react-component', 'yargs-cli-cmd'];

interface TemplateSettings {
	name: string;
	settings: SettingsFile;
}

export const TemplatesLibrariesPlugin = function TemplatesLibrariesPlugin() {
	return {
		name: 'templates-libraries-plugin',
		async contentLoaded({ actions }) {
			const { setGlobalData } = actions;

			const templatesSettingsPromises: Promise<TemplateSettings>[] =
				TEMPLATES_LIBRARIES.map(async (template) => {
					return {
						name: template,
						settings: (await import(
							`templates-mo/.tps/${template}/settings`
						)) as SettingsFile,
					};
				});

			const templatesSettings = await Promise.all(templatesSettingsPromises);

			// `setGlobalData` only allows passing in JSON compliant data since build is in a different enviroment
			// well need to jsonify our data which involves getting rid functions and getting the value from `default`
			const templatesSettingsSantitize: TemplateSettings[] =
				templatesSettings.map((template) => {
					const answers = {};

					const prompts = template?.settings?.prompts.map(
						({
							default: _default,
							name,
							message,
							aliases,
							choices,
							tpsType,
							type,
							description,
							hidden,
						}) => {
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
						},
					);

					return {
						...template,
						settings: {
							...template.settings,
							prompts,
						},
					};
				});

			console.log(templatesSettingsSantitize);

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
