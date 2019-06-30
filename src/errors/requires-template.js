export default class RequiresTemplateError extends Error {
  constructor() {
    super();
    this.name = 'RequiresTemplateError';
    this.message = 'Must specify a template folder to use!';
  }
}
