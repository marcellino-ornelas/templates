import * as is from 'is';
import * as inquirer from 'inquirer';
import { hasProp, defaults } from '@tps/utilities/helpers';
import logger from '@tps/utilities/logger';
import {
  PromptNoPromptFoundError,
  PromptInvalidAnswersError,
} from '@tps/errors';
import type { SettingsFilePrompt } from '@tps/types/settings';
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

interface Answers {
  [prop: string]: any;
}

export default class Prompter<TAnswers = Answers> {
  public opts: PrompterOptions;

  public answers: TAnswers;

  public prompts: Prompt[];

  public answered: number;

  constructor(
    prompts: SettingsFilePrompt[],
    opts: Partial<PrompterOptions> = {}
  ) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    logger.prompter.info('Prompts: %n', prompts);

    this.opts = defaults(opts, DEFAULT_OPTIONS);
    this.answers = {} as TAnswers;
    this.prompts = prompts.map((p) => new Prompt(p));
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

    this._getPromptsThatNeedAnswers().forEach((prompt) => {
      const answer = prompt.answerWith(answers);
      if (is.defined(answer)) {
        this.setAnswer(prompt.name, answer);
      }
    });
  }

  setAnswer(name: string, answer: any): void {
    if (!hasProp(this.answers, name)) {
      this.answered += 1;
    }
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

  getAnswers(): Promise<TAnswers> {
    return Promise.resolve()
      .then(() => {
        if (!this.needsAnswers()) return;
        const promptsLeft = this._getPromptsThatNeedAnswers();
        if (this.opts.default) {
          const allDefaults = {};

          promptsLeft.forEach((prompt) => {
            allDefaults[prompt.name] = prompt.default;
          });

          this.setAnswers(allDefaults);
        } else {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          return (inquirer as any).prompt(promptsLeft).then((newAnswers) => {
            this.setAnswers(newAnswers);
          });
        }
      })
      .then(() => {
        const answers: TAnswers = {} as TAnswers;

        this.prompts.forEach((prompt) => {
          const { name } = prompt;
          const answer = this.answers[name];

          answers[name] = answer;

          return answers;
        });

        return Promise.resolve(answers);
      });
  }
}
