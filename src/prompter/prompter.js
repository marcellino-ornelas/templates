import is from 'is';
import inquirer from 'inquirer';
import Prompt from './prompt';
import { hasProp } from '@tps/utilities/helpers';

export default class Prompter {
  constructor(prompts, answers) {
    this.answers = {};
    this.prompts = prompts.map(p => new Prompt(p));
    this.answered = 0;
    if (answers) {
      this.setAnswers(answers);
    }
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
    let action;

    if (!this.needsAnswers()) {
      action = Promise.resolve();
    } else {
      action = inquirer
        .prompt(this._getPromptsThatNeedAnswers())
        .then(newAnswers => {
          this.setAnswers(newAnswers);
        });
    }

    return action.then(() => {
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
