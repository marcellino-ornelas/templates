import debug from 'debug';
import is from 'is';
import './formatters';
import CreateDebugGroup from './createDebugGroup';

const logFunctions = ['info', 'error', 'debug', 'success', 'warn', 'log'];

function createLogFunctionsNames(name) {
  return logFunctions.map(logName => `${name}:${logName}`).join(',');
}

class CreateDebug {
  constructor(name) {
    this.name = name;
    this.logger = debug(name);

    if (debug.enabled(name)) {
      debug.enable(createLogFunctionsNames(name));
    }

    // always enable log
    debug.enable(`${name}:log`);

    logFunctions.reduce((acc, logType) => {
      const loggerFunction = this.logger.extend(logType);

      // inherit parent logger color
      loggerFunction.color = this.logger.color;

      // wrapper around the log functions
      // This is because we want to check to see if the parent
      // logger is enabled. if it is then enable the child logger
      acc[logType] = (...args) => {
        if (this.logger.enabled && !loggerFunction.enabled) {
          loggerFunction.enabled = true;
        }
        loggerFunction(...args);
      };

      return acc;
    }, this);

    this._groups = {};
  }

  enable() {
    debug.enable(this.name);
    return this;
  }

  disable() {
    debug.disable(this.name);
    return this;
  }

  group(name, { clear = false } = {}) {
    if (this._groups[name] && !clear) {
      return this._groups[name];
    }

    const newGroup = new CreateDebugGroup(name);

    this._groups[name] = newGroup;

    return newGroup;
  }

  printGroup(group) {
    let groupArray = group;

    if (is.string(group)) {
      groupArray = this._groups[group];
    }

    for (let i = 0; i < groupArray.length; i++) {
      const [level, ...args] = groupArray[i];

      this[level](...args);
    }

    this._groups[groupArray.name] = undefined;
  }
}

export default CreateDebug;
