import is from 'is';

export default class Prompt {
  constructor(prompt = {}) {
    this.aliases = prompt.aliases || [];
    this.tpsType = prompt.tpsType || 'package';

    if (!['package', 'data'].includes(this.tpsType)) {
      throw new Error(
        "Invalid prop type in prompts. tpsType must be either 'package' or 'data'"
      );
    }

    // inquire props
    this.name = prompt.name;
    this.type = prompt.type;
    this.message = prompt.message || prompt.question;
    this.default = prompt.default;
    this.choices = prompt.choices || [];
    this.validate = prompt.validate;
    this.filter = prompt.filter;
    this.transformer = prompt.transformer;
    this.when = prompt.when;
    this.pageSize = prompt.pageSize;
    this.prefix = prompt.prefix;
    this.suffix = prompt.suffix;
  }

  isData() {
    return this.tpsType === 'data';
  }

  isPkg() {
    return !this.isData();
  }

  answerWith(answers) {
    const canAnswerBy = [this.name, ...this.aliases];

    const didAnswerBy = canAnswerBy.find(by => {
      return is.defined(answers[by]);
    });

    return !didAnswerBy ? undefined : answers[didAnswerBy];
  }
}
