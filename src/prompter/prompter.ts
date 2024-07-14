import * as is from 'is';
import * as inquirer from 'inquirer';
import { hasProp, defaults } from '@tps/utilities/helpers';
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
}

const DEFAULT_OPTIONS: PrompterOptions = {
	default: false,
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

		this.opts = defaults(opts, DEFAULT_OPTIONS);
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

	setAnswers(answers: Partial<TAnswers>): void {
		if (is.object(answers) && is.empty(answers)) {
			throw new PromptInvalidAnswersError(answers);
		}

		this.prompts.forEach((prompt) => {
			const answer = prompt.answerWith(answers);
			if (is.defined(answer)) {
				this.setAnswer(prompt.name, answer);
			}
		});
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
		if (!this.needsAnswers()) return;
		const promptsLeft = this._getPromptsThatNeedAnswers();
		logger.prompter.info('Current Answers: %n', this.answers);
		logger.prompter.info(
			'Prompts that need answers: %n',
			promptsLeft.map((p) => p.name),
		);

		if (this.opts.default) {
			const allDefaults = {};
			promptsLeft.forEach((prompt) => {
				allDefaults[prompt.name] =
					prompt.default instanceof Function
						? prompt.default({ ...allDefaults, ...this.answers })
						: prompt.default;
			});
			this.setAnswers(allDefaults);
		} else {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const newAnswers = await (inquirer as any).prompt(promptsLeft);

			this.setAnswers(newAnswers);
		}

		const answers: TAnswers = {} as TAnswers;

		this.prompts.forEach((prompt) => {
			const { name } = prompt;
			const answer = this.answers[name];
			answers[name] = answer;
			return answers;
		});

		return answers;
	}
}
