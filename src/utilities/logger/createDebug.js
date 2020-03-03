import debug from 'debug';
import is from 'is';
import './formatters';
import CreateDebugGroup from './createDebugGroup';

export const logFunctions = [
  'info',
  'error',
  'debug',
  'success',
  'warn',
  'log'
];

// function createLogFunctionsNames(name) {
//   return logFunctions.map(logName => `${name}:${logName}`).join(',');
// }

class CreateDebug {
  constructor(name) {
    this.name = name;
    this._logger = debug(this.name);
    this._groups = {};

    logFunctions.forEach(type => {
      const instanceKey = `_${type}`;
      this[instanceKey] = this._logger.extend(type);
      this[instanceKey].color = this._logger.color;
      this[type] = (...args) => {
        this._resync();
        this[instanceKey](...args);
      };
    });

    this._resync();
  }

  _resync() {
    logFunctions.forEach(type => {
      const instanceKey = `_${type}`;
      if (type === 'log') {
        // Log always is enabled
        this[instanceKey].enabled = true;
      } else {
        this[instanceKey].enabled = this.isEnabled();
      }
    });
  }

  isEnabled() {
    return this._logger.enabled;
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

// class CreateDebug {
//   constructor(name) {
//     if (name === 'tps') {
//       console.log('2 DEBUG', process.env.DEBUG);
//     }
//     this.name = name;
//     this.logger = debug(this.name);

//     if (name === 'tps') {
//       console.log('IS DEBUG ENABLED', debug.enabled(this.name));
//       console.log('IS DEBUG ENABLED 2', this.logger.enabled);
//     }

//     logFunctions.reduce((acc, logType) => {
//       const loggerFunction = this.logger.extend(logType);

//       // inherit parent logger color
//       loggerFunction.color = this.logger.color;

//       // wrapper around the log functions
//       // This is because we want to check to see if the parent
//       // logger is enabled. if it is then enable the child logger
//       acc[logType] = (...args) => {
//         if (!seen) {
//           console.dir(this);
//           console.log('MAIN LOGGER', this.name);
//           console.dir(this.logger);
//           console.log('MAIN LOGGER ENABLED', this.logger.enabled);
//           console.log('SUB LOGGER ENABLED', logType, loggerFunction.enabled);
//         }

//         if (this.logger.enabled && !loggerFunction.enabled) {
//           !seen &&
//             console.log('MAIN LOG ENABLED TURNING ON SUB', this.name, logType);
//           // this.enable();
//           logger;
//         }
//         if (!seen) {
//           console.log('LOG TYPE:', logType);
//           console.log('LOG FUNCTION ENABLED', loggerFunction.enabled);
//           seen = true;
//         }
//         loggerFunction(...args);
//       };

//       return acc;
//     }, this);

//     if (this.isEnabled()) {
//       console.log('TURNING ON SUB FUNCTIONS');
//       // console.log(this.logger.enabled);
//       // console.log('logs to enable', createLogFunctionsNames(name));
//       // debug.enable(createLogFunctionsNames(name));

//       // Enabled everything
//       this.enable();
//       // console.log(this.logger.enabled);
//     }

//     // always allow logging
//     this.log.enabled = true;
//     // if (name === 'tps') {
//     //   console.log('DEBUG', process.env.DEBUG);

//     //   console.log('name', this.name);

//     //   console.log('enabled', debug.enabled(this.name));

//     //   console.log(debug);
//     // }

//     // always enable log
//     // debug.enable(`${name}:log`);
//     // this.log.enabled = true;

//     // console.log('AFTER log', this.logger.enabled);

//     this._groups = {};
//   }

//   isEnabled() {
//     return this.logger.enabled;
//   }

//   enable() {
//     this.logger.enabled = true;

//     logFunctions.forEach(name => {
//       this[name].enabled = true;
//       console.log('enabled', name, this[name].enabled);
//     });
//     // debug.enable(this.name);
//     return this;
//   }

//   disable() {
//     // debug.disable(this.name);
//     this.logger.enabled = false;

//     logFunctions.forEach(name => {
//       this[name].enabled = false;
//     });

//     this.log.enabled = true;
//     return this;
//   }

//   group(name, { clear = false } = {}) {
//     if (this._groups[name] && !clear) {
//       return this._groups[name];
//     }

//     const newGroup = new CreateDebugGroup(name);

//     this._groups[name] = newGroup;

//     return newGroup;
//   }

//   printGroup(group) {
//     let groupArray = group;

//     if (is.string(group)) {
//       groupArray = this._groups[group];
//     }

//     for (let i = 0; i < groupArray.length; i++) {
//       const [level, ...args] = groupArray[i];

//       this[level](...args);
//     }

//     this._groups[groupArray.name] = undefined;
//   }
// }

export default CreateDebug;
