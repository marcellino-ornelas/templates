export default class Stack {
  constructor() {
    this._stack = [];
  }

  push(...args) {
    this._stack.push(...args);
  }

  // remove an item from the top of the stack
  pop() {
    return this._stack.pop();
  }

  stack() {
    return this._stack;
  }

  next() {
    const len = this.size();
    if (!len) {
      return undefined;
    }

    return this._stack[len - 1];
  }

  // return the number of items in the stack
  size() {
    return this._stack.length;
  }
}
