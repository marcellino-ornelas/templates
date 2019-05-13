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

    let defaultValue;
    const isPrompterDefaultIndex = ['list', 'rawlist', 'expand'].includes(
      prompt.type
    );

    if (isPrompterDefaultIndex) {
      let defaultFromChoices = this.choices[prompt.default];

      if (is.func(this.filter)) {
        defaultFromChoices = this.filter(defaultFromChoices);
      }

      defaultValue = defaultFromChoices;
    } else {
      defaultValue = prompt.default;
    }

    this.default = defaultValue;
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
