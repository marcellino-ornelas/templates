import { CommandModule } from 'yargs';
import { createHandler, options } from '../utils/create';

export default {
  command: 'create [buildPaths...]',

  description: 'create a new folder with template',

  builder: options,

  handler: createHandler,
} as CommandModule;
