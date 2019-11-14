process.env.DEBUG_COLORS = false;
import debug from 'debug';
import colors from 'ansi-colors';
import pjson from 'prettyjson-256';
import is from 'is';
import { defaults } from '@tps/utilities/helpers';
import CreateDebugGroup from './createDebugGroup';
CreateDebugGroup;

/**
 * Constants
 */

const newColors = {
  info: colors.blue,
  log: colors.blue,
  error: colors.red,
  warn: colors.yellow,
  success: colors.green
};

const levels = Object.keys(newColors);

const TITLES_RE = (function() {
  const regStr = levels.map(str => `:${str}`).join('|');
  return new RegExp(regStr, 'g');
})();

let pattern = [
  '[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:[a-zA-Z\\d]*(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)',
  '(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))'
].join('|');

const ANSII_RE = new RegExp(pattern, 'g');

const PJSON_SETTINGS = {
  depth: 10
  // alphabetizeKeys: true
  // customColors: {
  //   red: { fg: [5, 0, 0] },
  //   atomicTorquoise: { fg: [5, 2, 0], bg: [0, 2, 4] }
  // }
};

/**
 * Initialize
 */

colors.theme(newColors);

const render = (object, indent = 0, opts = {}) => {
  const options =
    is.object(opts) && !is.empty(opts)
      ? defaults(opts, PJSON_SETTINGS)
      : PJSON_SETTINGS;
  return pjson.render(object, indent, options);
};

/**
 * Formatters
 */
debug.formatters.n = v => {
  return '\n' + render(v, 2);
};

/* only used when you want to use inline */
debug.formatters.o = v => {
  if (is.object(v)) {
    let output = render(v, 2, {
      // depth: 1
    })
      .replace(/\n/g, '')
      .replace(/\s*:\s*/g, '=');

    let matched = output.match(ANSII_RE);

    matched.forEach(match => {
      const index = output.indexOf(match) + match.length;
      output = output.slice(0, index) + output.slice(index).trim();
    });

    return output.trim();
  } else if (is.array(v)) {
    return v;
  }
  return render(v);
};

debug.formatters.s = v => {
  return colors.white(v);
};

/* All objects, arrays */
debug.formatters.O = v => {
  return render(v, 2);
};

debug.log = function(string, ...rest) {
  const filteredString = string.replace(TITLES_RE, matched => {
    const titleName = matched.slice(1);
    return '\u001b[0m ' + colors[titleName](titleName);
  });
  console.log(filteredString, ...rest);
};

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
