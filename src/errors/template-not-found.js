export default class TemplateNotFoundError extends Error {
  constructor(templateName) {
    super();
    this.name = 'TemplateNotFoundError';
    this.template = templateName;
    this.message = `Template (${this.template}) was not found.`;
  }
}
