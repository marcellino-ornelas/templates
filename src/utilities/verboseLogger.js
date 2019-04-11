export default class VerboseLogger {
  constructor(verbose = false) {
    this.verbose = verbose;
  }

  /**
   * Log only if verbose is true
   * @private
   */
  _log() {
    this.verbose && console.log.apply(console, arguments);
  }
}
