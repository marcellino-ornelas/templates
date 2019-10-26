export default class NoPromptsError extends Error {
  constructor() {
    super();
    this.name = 'NoPromptsError';
    this.message = `No prompts set.`;
  }
}
