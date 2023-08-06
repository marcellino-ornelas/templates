import fs from 'fs-extra';
import pjson from 'prettyjson-256';
import is from 'is';
import * as TPS from '@tps/utilities/constants';
import { CommandModule } from 'yargs';

const removeRcFile = (arr: string[]) => {
  const i = arr.indexOf('.tpsrc');

  if (i === -1) {
    return arr;
  }
  const copy = arr.concat();
  copy.splice(i, 1);
  return copy;
};

const BANNED_TEMPLATES: string[] = ['init', 'new-template', 'new-test'];

export default {
  command: ['list', 'ls'],
  description: 'Show all available templates',
  builder: {
    global: {
      type: 'boolean',
      description: 'List out global files',
      alias: 'g',
      default: true,
    },
    local: {
      type: 'boolean',
      description: 'List out global files',
      alias: 'l',
      default: true,
    },
    default: {
      type: 'boolean',
      description: 'List out default templates',
      alias: 'd',
      default: true,
    },
  },
  handler(argv) {
    if (argv.default) {
      const defaultTps = removeRcFile(fs.readdirSync(TPS.DEFAULT_TPS)).filter(
        // remove irrelevant templates
        (file) => !BANNED_TEMPLATES.includes(file)
      );

      if (!(is.array as any).empty(defaultTps)) {
        console.log('Default: ');
        console.log(pjson.render(defaultTps));
        console.log('');
      }
    }

    if (TPS.HAS_GLOBAL && argv.global) {
      const global = removeRcFile(fs.readdirSync(TPS.GLOBAL_PATH));

      if (!(is.array as any).empty(global)) {
        console.log('Global: ');
        console.log(pjson.render(global));
        console.log('');
      }
    }

    if (TPS.HAS_LOCAL && argv.local) {
      const local = removeRcFile(fs.readdirSync(TPS.LOCAL_PATH));

      if (!(is.array as any).empty(local)) {
        console.log('Local: ');
        console.log(pjson.render(local));
      }
    }
  },
} as CommandModule;
