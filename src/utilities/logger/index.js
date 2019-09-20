import CreateDebug from './createDebug';

const logger = {
  tps: new CreateDebug('tps'),
  prompter: new CreateDebug('prompter'),
  prompt: new CreateDebug('prompt')
};

export default logger;
