import * as is from 'is';
import * as inquirer from 'inquirer';
import { hasProp, defaults } from '@tps/utilities/helpers';
import logger from '@tps/utilities/logger';
import { PromptNoPromptFoundError } from '@tps/errors';
import Prompt from './prompt';

/**
 * Default options for Templates
 * @typedef  {Object} PrompterOpts
 * @property {boolean} default - Use all default answers
 */
const DEFAULT_OPTIONS = {
  default: false,
};

/**
 * @class
 */
export default class Prompter {
  /**
   * @param {PrompterOpts} opts - options to pass to templates
   */
  constructor(prompts, opts = {}) {
    logger.prompter.info('Prompts: %n', prompts);

    this.opts = defaults(opts, DEFAULT_OPTIONS);
    this.answers = {};
    this.prompts = prompts.map((p) => new Prompt(p));
    this.answered = 0;
  }

  needsAnswers() {
    return this.hasPrompts() && this.prompts.length !== this.answered;
  }

  hasPrompts() {
    return !!this.prompts.length;
  }

  getPrompt(name) {
    const prompt = this.prompts.find((p) => {
      return p.name === name;
    });

    if (!prompt) throw new PromptNoPromptFoundError(name);

    return prompt;
  }

  setAnswers(answers) {
    if (is.object(answers) && is.empty(answers)) {
      throw new PromptInvalidAnswers(answers);
    }

    this._getPromptsThatNeedAnswers().forEach((prompt) => {
      const answer = prompt.answerWith(answers);
      if (is.defined(answer)) {
        this.setAnswer(prompt.name, answer);
      }
    });
  }

  setAnswer(name, answer) {
    if (!hasProp(this.answers, name)) {
      this.answered += 1;
    }
    this.answers[name] = answer;
  }

  _getPromptsThatNeedAnswers() {
    return this.prompts.filter((p) => !this.hasAnswerToPrompt(p));
  }

  hasAnswerToPrompt(promptOrName, answers = this.answers) {
    const prompt = is.string(promptOrName)
      ? this.getPrompt(promptOrName)
      : promptOrName;
    return is.defined(answers[prompt.name]);
  }

  getAnswers() {
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
          return inquirer.prompt(promptsLeft).then((newAnswers) => {
            this.setAnswers(newAnswers);
          });
        }
      })
      .then(() => {
        const answers = {};

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
