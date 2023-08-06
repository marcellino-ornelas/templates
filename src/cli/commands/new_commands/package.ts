import path from 'path';
import fs from 'fs-extra';
import * as TPS from '@tps/utilities/constants';
import { isDir } from '@tps/utilities/fileSystem';
import { CommandModule } from 'yargs';

interface NewPackageArgv {
  template: string;
  package: string;
}

export default {
  command: 'package <template> <package>',

  description: 'create a new package in a template',

  builder: {},

  handler(argv) {
    const dest = path.join(process.cwd(), TPS.TPS_FOLDER, argv.template);

    if (!isDir(dest)) {
      throw new Error('TPS template was not found.');
    }
    const newPackageDir = path.join(dest, argv.package);
    fs.mkdirSync(newPackageDir);
  },
} as CommandModule<object, NewPackageArgv>;
