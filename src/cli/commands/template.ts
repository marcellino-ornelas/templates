import { CommandModule } from 'yargs';
import { commands } from './template_commands';

interface TemplateArgv {
  //   flag: boolean;
}

export default {
  //   command: '$0 <template>',
  command: 'template',
  //   aliases: ['t],
  describe: '...',
  builder: (yargs) => {
    yargs.positional(`template`, {
      type: `string`,
      describe: `What this argument is`,
    });

    // yargs.command(commands);

    return yargs;
  },
  //   builder: {
  //     flag: {
  //       alias: '',
  //       describe: '...',
  //       type: 'boolean',
  //     },
  //   },
  async handler(argv) {
    // code ...
    console.log('template');
  },
} as CommandModule<object, TemplateArgv>;
