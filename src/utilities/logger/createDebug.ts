import debug from 'debug';
import * as is from 'is';
import { defaults } from '@tps/utilities/helpers';
import './formatters';
import CreateDebugGroup from './createDebugGroup';

export const logFunctions = [
  'info',
  'error',
  'debug',
  'success',
  'warn',
  'log',
];

// function createLogFunctionsNames(name) {
//   return logFunctions.map(logName => `${name}:${logName}`).join(',');
// }

interface CreateDebugOpts {
  disableLog: boolean;
}

// type debugFn = (string, ...args: any[]) => void;./

class CreateDebug {
  static DEFAULT_OPTS: CreateDebugOpts = { disableLog: false };

  public name: string;

  public _logger: ReturnType<typeof debug>;

  public opts: CreateDebugOpts;

  public _groups: { [p: string]: CreateDebugGroup };

  public info: debug.Debugger;

  public error: debug.Debugger;

  public debug: debug.Debugger;

  public success: debug.Debugger;

  public warn: debug.Debugger;

  public log: debug.Debugger;

  constructor(name, opts = CreateDebug.DEFAULT_OPTS) {
    this.name = name;
    this._logger = debug(this.name);
    this.opts = defaults(opts, CreateDebug.DEFAULT_OPTS);
    this._groups = {};

    logFunctions.forEach((type) => {
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

  _resync(): void {
    const { disableLog } = this.opts;
    logFunctions.forEach((type) => {
      const instanceKey = `_${type}`;
      if (type === 'log') {
        // Log always is enabled
        this[instanceKey].enabled = !disableLog;
      } else {
        this[instanceKey].enabled = this.isEnabled();
      }
    });
  }

  isEnabled(): boolean {
    return this._logger.enabled;
  }

  enable(): this {
    this._logger.enabled = true;
    this._resync();
    return this;
  }

  group(name, { clear = false } = {}): CreateDebugGroup {
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
