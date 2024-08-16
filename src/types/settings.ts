// TODO: why cant I use @tps/templates :thinking:
import type { TemplateOptions, Templates } from '@tps/templates/templates';

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
export type AnswersData = any;

export type AnswersHash = Record<string, AnswersData>;

export interface PromptChoiceObject {
	name: string;
	short: string;
	value: string;
}

export type PromptChoice = string | PromptChoiceObject;

export interface SettingsFilePrompt {
	name: string;

	message: string;

	description?: string;

	tpsType: keyof typeof SettingsFilePromptTpsType;

	type: keyof typeof SettingsFilePromptType;

	choices?: PromptChoice[];

	hidden?: boolean;

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

type SettingsFileEventsFn = Promise<void>;

interface SettingsFileEvents {
	/**
	 * Callback function to call before build paths are rendered
	 */
	onRender: (tps: Templates) => SettingsFileEventsFn;
	/**
	 * Callback function to call before an build path is rendered
	 */
	onBuildPathRender: (
		tps: Templates,
		buildPath: string,
	) => SettingsFileEventsFn;
	/**
	 * Callback function to call when an build path is rendered
	 */
	onBuildPathRendered: (
		tps: Templates,
		buildPath: string,
	) => SettingsFileEventsFn;
	/**
	 * Callback function to call when all build paths are rendered
	 */
	onRendered: (
		tps: Templates,
		dest: string,
		createdPaths: string | string[],
	) => SettingsFileEventsFn;
}

export interface SettingsFile {
	opts: Partial<TemplateOptions>;
	prompts: SettingsFilePrompt[];
	events?: SettingsFileEvents;
}
