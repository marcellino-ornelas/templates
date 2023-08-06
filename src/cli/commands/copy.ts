import fs from 'fs-extra';
import path from 'path';
import { errorExit } from '@tps/cli/utils/error-exit';
import Template from '@tps/templates';
import * as TPS from '@tps/utilities/constants';
import { CommandModule } from 'yargs';

interface CopyArgv {
  template: string;
}

export default {
  command: ['copy <template>', 'cp <template>'],
  description: 'Copy a template',
  handler(argv) {
    const template = new Template(argv.template);

    if (!TPS.IS_TPS_INITIALIZED) {
      errorExit(
        new Error(
          `Directory must be initialized with templates. Please run 'tps init'`
        )
      );
    }

    if (TPS.LOCAL_PATH === template.tpsPath) {
      errorExit(
        new Error(`Template ${argv.template} already exists in your directory`)
      );
    }

    const newLocation = path.join(TPS.LOCAL_PATH, argv.template);

    fs.copy(template.src, newLocation)
      .then(() => {
        process.exit(0);
      })
      .catch((error) => {
        errorExit(error);
      });
  },
} as CommandModule<object, CopyArgv>;
