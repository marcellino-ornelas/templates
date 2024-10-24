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
	/**
	 * Name of your prompt.
	 */
	name: string;
	/**
	 * Message that will be shown to users when generating a new instance.
	 */
	message: string;
	/**
	 * Prompt description.
	 *
	 * This description will be used on the templates options table for
	 * the template and in the on the cli when `--help` is used.
	 */
	description?: string;
	/**
	 * Behavior of prompt.
	 *
	 * @link https://marcellino-ornelas.github.io/templates/docs/main/create-new-template/prompts#tps-type
	 */
	tpsType: keyof typeof SettingsFilePromptTpsType;
	/**
	 * Type of inquirer prompt you would like to use
	 *
	 * @link https://github.com/SBoudrias/Inquirer.js/tree/v6.0.0
	 */
	type: keyof typeof SettingsFilePromptType;
	/**
	 * Choices for your prompt.
	 *
	 * Only needed for prompts of type `list`, `rawlist` or `checkbox`
	 */
	choices?: PromptChoice[];
	/**
	 * Makes this prompt a hidden prompt.
	 *
	 * Hidden prompts dont get prompted to users by default but can
	 * still be answered via a confiuration file or on the cli
	 *
	 * @version templates@>v1.1.1
	 */
	hidden?: boolean;
	/**
	 * Prompt aliases
	 *
	 * @example
	 * 	{
	 * 		name: 'example',
	 * 		aliases: ['e', 'ex'],
	 * 		// other options...
	 * 	}
	 */
	aliases?: string[];

	pageSize?: number;

	prefix?: string;

	suffix?: string;
	/**
	 * Default value for this prompt
	 */
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
	/**
	 * Prompts user prompt when this function returns true
	 */
	when?: boolean | WhenFn;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DefaultFn = (answers: AnswersHash) => any;

export type WhenFn = (answers: AnswersHash) => boolean;

export type ValidateFn = (
	input: string,
	answers: AnswersHash,
) => (boolean | string) | Promise<boolean | string>;

interface SettingsFileEvents {
	/**
	 * Callback function to call before build paths are rendered
	 */
	onRender?: (tps: Templates) => Promise<void>;
	/**
	 * Callback function to call before an build path is rendered
	 */
	onBuildPathRender?: (
		tps: Templates,
		args: {
			buildPath: string;
		},
	) => Promise<void>;
	/**
	 * Callback function to call when an build path is rendered
	 */
	onBuildPathRendered?: (
		tps: Templates,
		args: {
			buildPath: string;
		},
	) => Promise<void>;
	/**
	 * Callback function to call when all build paths are rendered
	 */
	onRendered?: (
		tps: Templates,
		args: {
			dest: string;
			buildPaths: string[];
		},
	) => Promise<void>;
}

export interface SettingsFile {
	opts?: Partial<TemplateOptions>;
	prompts?: SettingsFilePrompt[];
	events?: SettingsFileEvents;
}
