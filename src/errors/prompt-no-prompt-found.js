export default class PromptNoPromptFoundError extends Error {
  constructor(name) {
    super();
    this.name = 'PromptNoPromptFoundError';
    this.promptName = name;
    this.message = `There was no prompt found with the name of: ${name}`;
  }
}
