export default class CreateDebugGroup {
  public queue: [string, ...any[]];

  public name: string;

  constructor(name) {
    this.queue = [] as any;
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
