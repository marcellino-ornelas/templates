import debug from 'debug';
import chalk from 'chalk';
import pjson from 'prettyjson-256';
import lodash from 'lodash';

/**
 * Initialize pretty json
 */
// console.log(pjson.getOptions().colors);

pjson.init({
  // alphabetizeKeys: true,
  customColors: {
    red: { fg: [5, 0, 0] },
    atomicTorquoise: { fg: [5, 2, 0], bg: [0, 2, 4] }
  },
  colors: {
    errorName: { fg: [5, 0, 0] }
  }
});

const error = new Error('hey this is a error');

console.log(pjson.render(error, 2));

const TITLES = {
  INFO: chalk.blue('info'),
  ERROR: chalk.red('error'),
  LOG: chalk.blueBright('log'),
  WARN: chalk.yellow('warn')
};

debug.formatters.h = v => {
  return '\n' + render(v, 2);
};

/* only used when you want to use inline */
debug.formatters.o = v => {
  return pjson.render(v, 2);
};

debug.formatters.j = v => {
  return 'small j';
};

/* All objects, arrays */
debug.formatters.O = v => {
  return pjson.render(v, 2);
};

debug.log = (string, milli) => {
  const TITLES_RE = /:info|:error/gi;
  const filteredString = string.replace(TITLES_RE, matched => {
    const titleName = matched.slice(1).toUpperCase();

    return ` ${TITLES[titleName]}`;
  });
  console.log(filteredString);
};

const createDebug = name => {
  const logger = debug(name);
  const info = logger.extend('info');
  const error = logger.extend('error');

  return {
    log: info,
    info,
    error
  };
};

export default createDebug;
