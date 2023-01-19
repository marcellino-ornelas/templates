import debug from 'debug';
import pjson from 'prettyjson-256';
import { defaults } from '@tps/utilities/helpers';
import * as is from 'is';
import * as colors from 'ansi-colors';

process.env.DEBUG_COLORS = false;

/**
 * Constants
 */

const newColors = {
  info: colors.blue,
  log: colors.blue,
  error: colors.red,
  warn: colors.yellow,
  success: colors.green,
};

const TITLES_RE = (() => {
  const levels = Object.keys(newColors);
  const regStr = levels.map((str) => `:${str}`).join('|');
  return new RegExp(regStr, 'g');
})();

const pattern = [
  '[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:[a-zA-Z\\d]*(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)',
  '(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))',
].join('|');

/**
 * Initialize
 */

colors.theme(newColors);

const ANSII_RE = new RegExp(pattern, 'g');

const PJSON_SETTINGS = {
  depth: 10,
  // alphabetizeKeys: true
  // customColors: {
  //   red: { fg: [5, 0, 0] },
  //   atomicTorquoise: { fg: [5, 2, 0], bg: [0, 2, 4] }
  // }
};

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
debug.formatters.n = (v) => {
  return `\n${render(v, 2)}`;
};

/* All objects, arrays */
debug.formatters.O = (v) => {
  return render(v, 2);
};

/* only used when you want to use inline */
debug.formatters.o = (v) => {
  if (is.object(v)) {
    let output = render(v, 2, {
      // depth: 1
    })
      .replace(/\n/g, '')
      .replace(/\s*:\s*/g, '=');

    const matched = output.match(ANSII_RE);

    matched.forEach((match) => {
      const index = output.indexOf(match) + match.length;
      output = output.slice(0, index) + output.slice(index).trim();
    });

    return output.trim();
  }
  if (is.array(v)) {
    return v;
  }
  return render(v);
};

debug.formatters.s = (v) => {
  return colors.white(v);
};

/**
 * Override log
 */
debug.log = (string, ...rest) => {
  const filteredString = string.replace(TITLES_RE, (matched) => {
    const titleName = matched.slice(1);
    return `\u001b[0m ${colors[titleName](titleName)}`;
  });
  console.log(filteredString, ...rest);
};
