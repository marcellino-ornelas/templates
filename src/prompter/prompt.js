import is from 'is';

export default class Prompt {
  constructor(prompt = {}) {
    this.name = prompt.name;
    this.message = prompt.message || prompt.question;
    this.default = prompt.default;
    this.choices = prompt.choices || [];
    this.aliases = prompt.aliases || [];
  }

  answerWith(answers) {
    const canAnswerBy = [this.name, ...this.aliases];

    const didAnswerBy = canAnswerBy.find(by => {
      return is.defined(answers[by]);
    });

    if (!didAnswerBy) {
      return undefined;
    }

    return answers[didAnswerBy];
  }
}
