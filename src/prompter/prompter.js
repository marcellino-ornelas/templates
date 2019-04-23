import is from 'is';
import inquirer from 'inquirer';
import Prompt from './prompt';

export default class Prompter {
  constructor(prompts, answers) {
    this.answers = {};
    this.prompts = prompts.map(p => new Prompt(p));
    if (answers) {
      this.setAnswers(answers);
    }
  }

  getPrompt(name) {
    const prompt = this.prompts.find(p => {
      return p.name === name;
    });

    if (!prompt) throw new Error(`There is no prompt with name: ${name}`);

    return prompt;
  }

  setAnswers(answers) {
    this._getPromptsThatNeedAnswers().forEach(p => {
      if (this.hasAnswerToPrompt(p, answers)) {
        const answer = this._getAnswerToPrompt(p, answers);
        this.setAnswer(p.name, answer);
      }
    });
  }

  setAnswer(name, answer) {
    this.answers[name] = answer;
  }

  _getAnswerToPrompt(prompt, answers) {
    const { shortFlag, longFlag, name } = prompt;
    return answers[shortFlag] || answers[longFlag] || answers[name];
  }

  _getPromptsThatNeedAnswers() {
    return this.prompts.filter(p => !this.hasAnswerToPrompt(p));
  }

  hasAnswerToPrompt(prompt, answers = this.answers) {
    return !!this._getAnswerToPrompt(prompt, answers);
  }

  getAnswers() {
    const needAnswers = this._getPromptsThatNeedAnswers();
    let action;

    if (is.array.empty(needAnswers)) {
      action = Promise.resolve();
    } else {
      action = inquirer.prompt(this.prompts).then(newAnswers => {
        this.setAnswers(newAnswers);
      });
    }

    return action.then(() => {
      const answers = this.prompts.reduce((answerObj, prompt) => {
        const { name } = prompt;
        const answer = this.answers[name];

        answerObj[name] = answer;

        return answerObj;
      }, {});

      return Promise.resolve(answers);
    });
  }
}
