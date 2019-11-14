export default class CreateDebugGroup extends Array {
  constructor(name) {
    super();
    this.name = name;
  }

  info(...message) {
    this.push(['info', ...message]);
  }

  error(...message) {
    this.push(['error', ...message]);
  }

  debug(...message) {
    this.push(['debug', ...message]);
  }

  success(...message) {
    this.push(['success', ...message]);
  }

  warn(...message) {
    this.push(['warn', ...message]);
  }

  log(...message) {
    this.push(['log', ...message]);
  }
}
