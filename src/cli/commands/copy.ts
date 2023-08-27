import fs from 'fs';
import path from 'path';
import { errorExit } from '@tps/cli/utils/error-exit';
import Template from '@tps/templates';
import * as TPS from '@tps/utilities/constants';
import { CommandModule } from 'yargs';
import { isDir } from '@tps/utilities/fileSystem';

interface CopyArgv {
  template: string;
  name: string;
}

export default {
  command: ['copy <template> [name]', 'cp <template> [name]'],
  description: 'Copy a template',
  handler(argv) {
    const template = new Template(argv.template);

    const newLocation = path.join(TPS.LOCAL_PATH, argv.name || argv.template);

    if (!TPS.IS_TPS_INITIALIZED) {
      errorExit(
        new Error(
          `Directory must be initialized with templates. Please run 'tps init'`
        )
      );
    }

    if (isDir(newLocation)) {
      errorExit(
        new Error(
          `Template ${
            argv.name || argv.template
          } already exists in your directory`
        )
      );
    }

    fs.promises
      .cp(template.src, newLocation, { recursive: true })
      .then(() => {
        process.exit(0);
      })
      .catch((error) => {
        errorExit(error);
      });
  },
} as CommandModule<object, CopyArgv>;
