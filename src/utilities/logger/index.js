import createDebug from './createDebug';
import debug from 'debug';

const tps = createDebug('tps');

const logger = {
  tps: tps,
  prompter: createDebug('prompter')
};

export default logger;
