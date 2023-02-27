export default class TemplateNotFoundError extends Error {
  constructor(templateName) {
    super(`Template (${templateName}) was not found.`);
    this.name = 'TemplateNotFoundError';
    this.template = templateName;
  }
}
