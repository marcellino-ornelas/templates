import createDebug from './createDebug';
import debug from 'debug';

// debug.enable('tps:core:*');

const logger = {
  tps: {
    core: createDebug('tps:core')
  },
  prompter: createDebug('prompter')
};

// logger.tps.core.error(new Error('you suck'));

// logger.tps.core.log(`Here is your src`);
// logger.tps.core.log(`Here is your src`, 'name');
// logger.tps.core.log([1, 2, 3]);
// logger.tps.core.log('This is a error that happened %h', {
//   name: 'lino',
//   age: 23456,
//   timestamp: 123456789
// });

// logger.tps.core.error([1, 2, 3], {
//   name: 'lino',
//   age: 23456,
//   timestamp: 123456789
// });

export default logger;
