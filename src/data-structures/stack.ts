// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class Stack<TData = any> {
  public _stack: TData[] = [];

  constructor() {
    this._stack = [];
  }

  push(...args: TData[]) {
    this._stack.push(...args);
  }

  // remove an item from the top of the stack
  pop(): TData | null {
    return this._stack.pop() ?? null;
  }

  stack(): TData[] {
    return this._stack;
  }

  next(): TData | null {
    const len = this.size();
    if (!len) {
      return null;
    }

    return this._stack[len - 1];
  }

  // return the number of items in the stack
  size(): number {
    return this._stack.length;
  }
}
