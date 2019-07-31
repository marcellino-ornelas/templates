import CreateDebug from './createDebug';

const logger = {
  tps: new CreateDebug('tps'),
  prompter: new CreateDebug('prompter')
};

export default logger;
