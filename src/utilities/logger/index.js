import CreateDebug from './createDebug';

const tps = new CreateDebug('tps');

const logger = {
  tps: tps,
  prompter: new CreateDebug('prompter')
};

// process.exit(0);

export default logger;
