import CreateDebug from './createDebug';

const logger = {
  tps: new CreateDebug('tps'),
  prompter: new CreateDebug('prompter'),
  prompt: new CreateDebug('prompt'),
  cli: new CreateDebug('tps:cli'),
};

/* legacy support */
export default logger;
// export default logger;
