export default class RequiresTemplateError extends Error {
  constructor() {
    super('Must specify a template folder to use!');
    this.name = 'RequiresTemplateError';
  }
}
