// eslint-disable-next-line no-shadow
export enum SettingsFilePromptTpsType {
	data = 'data',
	package = 'package',
}

// eslint-disable-next-line no-shadow
export enum SettingsFilePromptType {
	confirm = 'confirm',
	input = 'input',
	list = 'list',
	rawlist = 'rawlist',
	password = 'password',
	checkbox = 'checkbox',
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnswersHash = Record<string, any>;

export interface SettingsFilePrompt {
	name: string;

	message: string;

	tpsType: keyof typeof SettingsFilePromptTpsType;

	type: keyof typeof SettingsFilePromptType;

	choices?: string[];

	aliases?: string[];

	pageSize?: number;

	prefix?: string;

	suffix?: string;

	default?:
		| string
		| number
		| boolean
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		| Array<any>
		| DefaultFn;

	validate?: ValidateFn;

	filter?: (input: string) => Promise<string> | string;

	transformer?: (input: string) => string | Promise<string>;

	when?: boolean | WhenFn;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DefaultFn = (answers: AnswersHash) => any;

export type WhenFn = (answers: AnswersHash) => boolean;

export type ValidateFn = (
	input: string,
	answers: AnswersHash,
) => (boolean | string) | Promise<boolean | string>;

export interface SettingsFile {
	prompts: SettingsFilePrompt[];
}
