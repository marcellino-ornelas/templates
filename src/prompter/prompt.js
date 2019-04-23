import is from 'is';

export default class Prompt {
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
