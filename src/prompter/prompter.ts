import * as is from 'is';
import * as inquirer from 'inquirer';
import { hasProp } from '@tps/utilities/helpers';
import logger from '@tps/utilities/logger';
import {
	PromptNoPromptFoundError,
	PromptInvalidAnswersError,
} from '@tps/errors';
import type {
	SettingsFilePrompt,
	AnswersHash,
	AnswersData,
} from '@tps/types/settings';
import Prompt from './prompt';

interface PrompterOptions {
	/**
	 * Use all default answers
	 */
	default: boolean;
	/**
	 * prompt hidden prompts to users
	 */
	showHiddenPrompts: boolean;
}

const DEFAULT_OPTIONS: PrompterOptions = {
	default: false,
	showHiddenPrompts: false,
};

export default class Prompter<TAnswers = AnswersHash> {
	public opts: PrompterOptions;

	public answers: TAnswers;

	public prompts: Prompt[];

	public answered: number;

	constructor(
		prompts: SettingsFilePrompt[],
		opts: Partial<PrompterOptions> = {},
	) {
		logger.prompter.info('Prompts: %n', prompts);

		this.opts = {
			...DEFAULT_OPTIONS,
			...opts,
		};
		this.answers = {} as TAnswers;
		this.prompts = prompts.map((p) => new Prompt(p, this));
		this.answered = 0;
	}

	needsAnswers(): boolean {
		return this.hasPrompts() && this.prompts.length !== this.answered;
	}

	hasPrompts(): boolean {
		return !!this.prompts.length;
	}

	getPrompt(name: string): Prompt {
		const prompt = this.prompts.find((p) => p.name === name);

		if (!prompt) throw new PromptNoPromptFoundError(name);

		return prompt;
	}

	setAnswers(answers: Partial<TAnswers>): TAnswers {
		if (!is.object(answers)) {
			throw new PromptInvalidAnswersError(answers);
		}

		this.prompts.forEach((prompt) => {
			const answer = prompt.answerWith(answers);
			if (is.defined(answer)) {
				this.setAnswer(prompt.name, answer);
			}
		});

		return this.answers;
	}

	setAnswer(name: string, answer: AnswersData): void {
		if (!hasProp(this.answers, name)) {
			this.answered += 1;
		}
		logger.prompter.info('Answer set: %n', {
			[name]: answer,
		});
		this.answers[name] = answer;
	}

	_getPromptsThatNeedAnswers(): Prompt[] {
		return this.prompts.filter((p) => !this.hasAnswerToPrompt(p));
	}

	hasAnswerToPrompt(promptOrName, answers = this.answers): boolean {
		const prompt = is.string(promptOrName)
			? this.getPrompt(promptOrName)
			: promptOrName;
		return is.defined(answers[prompt.name]);
	}

	async getAnswers(): Promise<TAnswers> {
		logger.prompter.info('Fetching answers...');
		if (!this.needsAnswers()) return this.answers;

		let promptsLeft = this._getPromptsThatNeedAnswers();
		logger.prompter.info('Current Answers: %n', this.answers);
		logger.prompter.info(
			'Prompts that need answers: %n',
			promptsLeft.map((p) => p.name),
		);

		if (this.opts.default) {
			const allDefaults = {};
			promptsLeft.forEach((prompt) => {
				// TODO: should default to null
				allDefaults[prompt.name] = prompt.getDefaultValue({
					...allDefaults,
					...this.answers,
				});
			});

			return this.setAnswers(allDefaults);
		}
		const hiddenPrompts = promptsLeft.filter((prompt) => prompt.hidden);

		// remove hidden prompts if we arent showing them
		if (!this.opts.showHiddenPrompts) {
			promptsLeft = promptsLeft.filter((prompt) => !prompt.hidden);
		}

		if (promptsLeft.length) {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const newAnswers = await (inquirer as any).prompt(promptsLeft);

			this.setAnswers(newAnswers);
		}

		// Calculate hidden prompts after user prompts so user answers can be used
		if (!this.opts.showHiddenPrompts) {
			const allHiddenDefaults = {};
			logger.prompter.info(
				'Hidden prompts: %n',
				hiddenPrompts.map((p) => p.name),
			);
			hiddenPrompts.forEach((prompt) => {
				const defaultValue = prompt.getDefaultValue({
					...allHiddenDefaults,
					...this.answers,
				});
				// TODO: getDefaultValue really should be doing this but dont want to break any functionality with `default` option
				allHiddenDefaults[prompt.name] = defaultValue ?? null;
			});
			logger.prompter.info('Hidden answers: %n', allHiddenDefaults);
			this.setAnswers(allHiddenDefaults);
		}

		return this.answers;
	}
}
