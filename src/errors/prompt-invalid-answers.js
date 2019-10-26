export default class PromptInvalidAnswersError extends Error {
  constructor(answers) {
    super();
    this.name = 'PromptInvalidAnswersError';
    this.answers = answers;
    this.message = `Invalid answers passed in. Answers needs to be an object. Got ${JSON.stringify(
      answers
    )}`;
  }
}
