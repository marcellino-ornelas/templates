import is from 'is';
import inquirer from 'inquirer';
import Prompt from './prompt';
import { hasProp } from '@tps/utilities/helpers';

export default class Prompter {
  constructor(prompts, opts = {}) {
    this.opts = opts;
    this.answers = {};
    this.prompts = prompts.map(p => new Prompt(p));
    this.answered = 0;
  }

  needsAnswers() {
    return this.prompts.length !== this.answered;
  }

  getPrompt(name) {
    const prompt = this.prompts.find(p => {
      return p.name === name;
    });

    if (!prompt) throw new Error(`There is no prompt with name: ${name}`);

    return prompt;
  }

  setAnswers(answers) {
    this._getPromptsThatNeedAnswers().forEach(prompt => {
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
    return this.prompts.filter(p => !this.hasAnswerToPrompt(p));
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

          promptsLeft.forEach(prompt => {
            allDefaults[prompt.name] = prompt.default;
          });

          this.setAnswers(allDefaults);
        } else {
          return inquirer.prompt(promptsLeft).then(newAnswers => {
            this.setAnswers(newAnswers);
          });
        }
      })
      .then(() => {
        const answers = {};

        this.prompts.forEach(prompt => {
          const { name } = prompt;
          const answer = this.answers[name];

          answers[name] = answer;

          return answers;
        });

        return Promise.resolve(answers);
      });
  }
}
