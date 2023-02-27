export default class CreateDebugGroup {
  constructor(name) {
    this.queue = [];
    this.name = name;
  }

  info(...message) {
    this.queue.push(['info', ...message]);
  }

  error(...message) {
    this.queue.push(['error', ...message]);
  }

  debug(...message) {
    this.queue.push(['debug', ...message]);
  }

  success(...message) {
    this.queue.push(['success', ...message]);
  }

  warn(...message) {
    this.queue.push(['warn', ...message]);
  }

  log(...message) {
    this.queue.push(['log', ...message]);
  }
}
