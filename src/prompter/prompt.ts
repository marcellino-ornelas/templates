import * as is from 'is';
import logger from '@tps/utilities/logger';
import {
	SettingsFilePrompt,
	AnswersHash,
	ValidateFn,
	DefaultFn,
	WhenFn,
	AnswersData,
} from '@tps/types/settings';
import type Prompter from './prompter';

export default class Prompt {
	public name: SettingsFilePrompt['name'];

	public message: SettingsFilePrompt['message'];

	public description: SettingsFilePrompt['description'];

	public aliases: SettingsFilePrompt['aliases'];

	public tpsType: SettingsFilePrompt['tpsType'];

	public type: SettingsFilePrompt['type'];

	public default: SettingsFilePrompt['default'];

	public hidden: SettingsFilePrompt['hidden'];

	public choices: SettingsFilePrompt['choices'];

	public validate: SettingsFilePrompt['validate'];

	public filter: SettingsFilePrompt['filter'];

	public transformer: SettingsFilePrompt['transformer'];

	public when: SettingsFilePrompt['when'];

	public pageSize: SettingsFilePrompt['pageSize'];

	public prefix: SettingsFilePrompt['prefix'];

	public suffix: SettingsFilePrompt['suffix'];

	constructor(prompt: SettingsFilePrompt, prompter: Prompter) {
		logger.prompt.info('Prompt %O', prompt);
		this.aliases = prompt.aliases || [];
		this.tpsType = prompt.tpsType || 'package';

		if (!['package', 'data'].includes(this.tpsType)) {
			throw new Error(
				"Invalid prop type in prompts. tpsType must be either 'package' or 'data'",
			);
		}

		// inquire props
		this.name = prompt.name;
		this.type = prompt.type;
		this.message = prompt.message;
		this.description = prompt.description;

		// let defaultValue;
		// const isPrompterDefaultIndex = ['list', 'rawlist', 'expand'].includes(
		//   prompt.type
		// );

		// if (isPrompterDefaultIndex) {
		//   let defaultFromChoices = this.choices[prompt.default];

		//   if (is.func(this.filter)) {
		//     defaultFromChoices = this.filter(defaultFromChoices);
		//   }

		//   defaultValue = defaultFromChoices;
		// } else {
		//   defaultValue = prompt.default;
		// }

		this.hidden = prompt.hidden ?? false;
		this.choices = prompt.choices || [];
		this.pageSize = prompt.pageSize;
		this.prefix = prompt.prefix;
		this.suffix = prompt.suffix;
		this.filter = prompt.filter;
		this.transformer = prompt.transformer;

		this.default = this.wrapFunc(
			prompt.default,
			(fn: DefaultFn, inquirerAnswers: AnswersHash) => {
				return fn({
					...prompter.answers,
					...inquirerAnswers,
				});
			},
		);

		this.when = this.wrapFunc(
			prompt.when,
			(fn: WhenFn, inquirerAnswers: AnswersHash) => {
				return fn({
					...prompter.answers,
					...inquirerAnswers,
				});
			},
		);

		this.validate = this.wrapFunc(
			prompt.validate,
			(fn: ValidateFn, input: string, inquirerAnswers: AnswersHash) => {
				return fn(input, {
					...prompter.answers,
					...inquirerAnswers,
				});
			},
		);
	}

	private wrapFunc(d, wrapper) {
		return d instanceof Function ? (...args) => wrapper(d, ...args) : d;
	}

	isData(): boolean {
		return this.tpsType === 'data';
	}

	isPkg(): boolean {
		return !this.isData();
	}

	getDefaultValue(answers: AnswersHash): AnswersData {
		return this.default instanceof Function
			? this.default(answers)
			: this.default;
	}

	answerWith<T>(answers: Record<string, T>): T {
		const canAnswerBy = [this.name, ...this.aliases];

		const didAnswerBy = canAnswerBy.find((by) => is.defined(answers[by]));

		return !didAnswerBy ? undefined : answers[didAnswerBy];
	}
}
