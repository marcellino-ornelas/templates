import { Stack } from './stack';

export default class Queue {
  constructor() {
    this.inbox = new Stack();
    this.outbox = new Stack();
  }

  enqueue(...args) {
    args.forEach((item) => {
      this.inbox.push(item);
    });
  }

  dequeue() {
    if (this.outbox.size() === 0) {
      while (this.inbox.size() !== 0) {
        this.outbox.push(this.inbox.pop());
      }
    }
    return this.outbox.pop();
  }

  size() {
    return this.inbox.size() + this.outbox.size();
  }

  peek() {
    return this.outbox.next() || this.inbox.next();
  }

  log(filter) {
    const cb = filter || ((c) => c);
    const queue = this.inbox
      .stack()
      .reverse()
      .concat(this.outbox.stack())
      .map(cb);
    console.log('queue: ', queue);
  }
}
