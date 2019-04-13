import path from 'path';
import is from 'is';
import inquirer from 'inquirer';
import { defaults } from '@tps/utilities/helpers';
import { eachObj } from './utilities/helpers';

export default class Prompter {
  constructor(prompts, answers) {
    this.answers = {};
    this.prompts = prompts.map(p => new Prompt(p));
    if (answers) {
      this.setAnswers(answers);
    }
  }

  getPrompt(name) {
    const prompt = this.prompts.find(prompt => {
      return prompt.name === name;
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
    return this._getAnswerToPrompt(prompt, answers) ? true : false;
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

class Prompt {
  constructor(prompt = {}) {
    this.name = prompt.name;
    this.message = prompt.message || prompt.question;
    this.default = prompt.default;
    this.choices = prompt.choices;

    if (prompt.flag) {
      if (is.object(prompt.flag)) {
        this.longFlag = prompt.flag.long || this.name;
        this.shortFlag = prompt.flag.short || null;
      } else {
        this.longFlag = prompt.flag || this.name;
      }
    } else {
      this.longFlag = this.name;
    }
  }
}

// const prompts = [
//   {
//     name: 'global',
//     flag: 'global',
//     message: 'is this global',
//     default: 'no'
//   },
//   {
//     name: 'noCss',
//     flag: {
//       long: 'noCss',
//       short: 'c'
//     },
//     message: 'want to use css?',
//     default: 'no'
//   }
// ];

// const p = new Prompter(prompts, { c: 'yes' });

// console.log('prompts', p.prompts);

// p.getAnswers().then(answers => {
//   console.log('answers', answers);
// });
