/* eslint-disable max-classes-per-file */
import { LOCAL_PATH } from '@tps/utilities/constants';

export class TemplateNotFoundError extends Error {
	public name = 'TemplateNotFoundError';

	public template: string;

	constructor(templateName: string) {
		super(`Template (${templateName}) was not found.`);
		this.template = templateName;
		Object.setPrototypeOf(this, TemplateNotFoundError.prototype);
	}
}

export class RequiresTemplateError extends Error {
	public name = 'RequiresTemplateError';

	constructor() {
		super('Must specify a template folder to use!');

		Object.setPrototypeOf(this, RequiresTemplateError.prototype);
	}
}

export class PackageAlreadyCompiledError extends Error {
	public name = 'PackageAlreadyCompiledError';

	constructor(packageName: string) {
		super(`Package (${packageName}) was already compiled`);
	}
}

export class SettingsUnkownFileTypeError extends Error {
	public name = 'TpsSettingsUnknownFileTypeError';

	public settings: string;

	constructor(settingsPath: string) {
		super(`\
Could not load settings file! Please make sure this file is a json or js file 
settings path: ${settingsPath}
`);
		this.settings = settingsPath;
	}
}

export class NoPromptsError extends Error {
	public name = 'NoPromptsError';

	public message = 'No prompts set';
}

export class PromptNoPromptFoundError extends Error {
	public name = 'PromptNoPromptFoundError';

	public promptName: string;

	constructor(name: string) {
		super(`There was no prompt found with the name of: ${name}`);
		this.promptName = name;
	}
}

export class PromptInvalidAnswersError extends Error {
	public name = 'PromptInvalidAnswersError';

	public answers: Record<string, any>;

	constructor(answers: Record<string, any>) {
		super(
			`Invalid answers passed in. Answers needs to be an object. Got ${JSON.stringify(
				answers,
			)}`,
		);
		this.answers = answers;
	}
}

export class InitializedAlreadyError extends Error {
	public name = 'InitializedAlreadyError';

	public path: string;

	constructor(filePath: string) {
		super(`tps is already initialized in this repo. ${filePath}`);
		this.path = filePath;
	}
}

export class GlobalInitializedAlreadyError extends Error {
	public name = 'GlobalInitializedAlreadyError';

	public path: string;

	constructor(filePath) {
		super('tps is already initialized globally initialized');
		this.path = filePath;
	}
}
