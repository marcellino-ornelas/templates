import { CommandModule } from 'yargs';

interface PublishArgv {
  flag: boolean;
}

export default {
  command: 'publish',
  aliases: [],
  describe: '...',
  builder: {
    flag: {
      alias: '',
      describe: '...',
      type: 'boolean',
    },
  },
  async handler(argv) {
    // code ...
    console.log('publish');
  },
} as CommandModule<object, PublishArgv>;
