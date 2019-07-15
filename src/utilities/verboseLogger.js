export default class VerboseLogger {
  constructor(/* handle = '', */ verbose = false) {
    this.verbose = verbose;
    // this.handle = handle;
  }

  /**
   * Log only if verbose is true
   * @private
   */
  _log(...args) {
    if (this.verbose) {
      this._logWithHandle(args);
    }
  }

  _logWithHandle(args) {
    // if (this.handle) {
    //   console.log(this.handle, ...args);
    // } else {
    console.log(...args);
    // }
  }

  _error(msg) {
    const message = msg;
    // if (this.handle) {
    //   message = `${this.handle}${message}`;
    // }
    throw new Error(message);
  }
}
