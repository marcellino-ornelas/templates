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

debug.formatters.h = v => {
  return '\n' + render(v, 2);
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
  return '\n' + pjson.render(v, 2);
};

debug.log = function(string, ...rest) {
  const filteredString = string.replace(TITLES_RE, matched => {
    const titleName = matched.slice(1);
    return '\u001b[0m ' + colors[titleName](titleName);
  });
  console.log(filteredString, ...rest);
};

const createDebug = name => {
  const logger = debug(name);

  const innerLoggers = ['info', 'error', 'debug', 'success'].reduce(
    (acc, logType) => {
      acc[logType] = logger.extend(logType);
      acc[logType].color = logger.color;
      return acc;
    },
    {}
  );

  // alias
  innerLoggers['log'] = innerLoggers.info;

  return innerLoggers;
};

export default createDebug;
