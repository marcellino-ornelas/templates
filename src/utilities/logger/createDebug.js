import debug from 'debug';
import is from 'is';
import './formatters';
import CreateDebugGroup from './createDebugGroup';

const logFunctions = ['info', 'error', 'debug', 'success', 'warn'];

const enableLogFuntions = logFunctions
  .map(logName => `tps:${logName}`)
  .join(',');

class CreateDebug {
  constructor(name) {
    this.logger = debug(name);

    if (debug.enabled(name)) {
      debug.enable(enableLogFuntions);
    }

    /* I think this should be name????? */
    logFunctions.reduce((acc, logType) => {
      const logger = this.logger.extend(logType);

      logger.color = this.logger.color;
      acc[logType] = (...args) => {
        if (this.logger.enabled && !logger.enabled) {
          logger.enabled = true;
        }
        logger(...args);
      };

      return acc;
    }, this);

    // alias
    this.log = this.info;
    this._groups = {};
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
