process.env.DEBUG_COLORS = false;
import debug from 'debug';
import colors from 'ansi-colors';
import pjson from 'prettyjson-256';
import is from 'is';

/**
 * Initialize pretty json
 */

pjson.init({
  customColors: {
    red: { fg: [5, 0, 0] },
    atomicTorquoise: { fg: [5, 2, 0], bg: [0, 2, 4] }
  }
});

const newColors = {
  info: colors.blue,
  log: colors.blue,
  error: colors.red,
  warn: colors.yellow,
  success: colors.green
};

colors.theme(newColors);

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

debug.formatters.n = v => {
  return '\n' + pjson.render(v, 2);
};

/* only used when you want to use inline */
debug.formatters.o = v => {
  if (is.object(v)) {
    let output = pjson
      .render(v, 2, {
        depth: 1
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
  return pjson.render(v);
};

debug.formatters.s = v => {
  return colors.white(v);
};

/* All objects, arrays */
debug.formatters.O = v => {
  console.log('hello');
  return pjson.render(v, 2);
};

debug.log = function(string, ...rest) {
  const filteredString = string.replace(TITLES_RE, matched => {
    const titleName = matched.slice(1);
    return '\u001b[0m ' + colors[titleName](titleName);
  });
  console.log(filteredString, ...rest);
};

// const createDebug = name => {
//   const logger = debug(name);

//   const innerLoggers = ['info', 'error', 'debug', 'success', 'warn'].reduce(
//     (acc, logType) => {
//       acc[logType] = logger.extend(logType);
//       acc[logType].color = logger.color;
//       return acc;
//     },
//     {}
//   );

//   // alias
//   innerLoggers['log'] = innerLoggers.info;

//   return innerLoggers;
// };

class CreateDebug {
  constructor(name) {
    this.logger = debug(name);

    ['info', 'error', 'debug', 'success', 'warn'].reduce((acc, logType) => {
      acc[logType] = this.logger.extend(logType);
      acc[logType].color = this.logger.color;
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

class CreateDebugGroup extends Array {
  constructor(name) {
    super();
    this.name = name;
  }
  info(...message) {
    this.push(['info', ...message]);
  }
  error(...message) {
    this.push(['error', ...message]);
  }
  debug(...message) {
    this.push(['debug', ...message]);
  }
  success(...message) {
    this.push(['success', ...message]);
  }
  warn(...message) {
    this.push(['warn', ...message]);
  }
  log(...message) {
    this.push(['log', ...message]);
  }
}

export default CreateDebug;
