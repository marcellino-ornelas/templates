import { CommandModule } from 'yargs';
import { createHandler, options } from '@tps/cli/utils/create';

export default {
  command: '$0 <template> [buildPaths..]',

  description: 'create a new folder with template',

  builder: options,

  //   handler: createHandler,
  async handler() {
    console.log('use');
  },
} as CommandModule;
