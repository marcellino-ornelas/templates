import fs from 'fs';
import pjson from 'prettyjson-256';
import is from 'is';
import * as TPS from '@tps/utilities/constants';
import { CommandModule } from 'yargs';
import Templates from '@tps/templates';

interface ListArgv {
  global: boolean;
  local: boolean;
  default: boolean;
}

const removeRcFile = (arr: string[]) => {
  return arr.filter((item) => item !== '.tpsrc');
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
  async handler(argv) {
    if (argv.default) {
      const defaultTps = removeRcFile(fs.readdirSync(TPS.DEFAULT_TPS)).filter(
        // remove irrelevant templates
        (file) => !BANNED_TEMPLATES.includes(file)
      );

      // @ts-expect-error wrong types module (`is`)
      if (!is.array.empty(defaultTps)) {
        console.log('Default: ');
        console.log(pjson.render(defaultTps));
        console.log('');
      }
    }

    if (Templates.hasGloablTps() && argv.global) {
      const global = removeRcFile(fs.readdirSync(TPS.GLOBAL_PATH));

      // @ts-expect-error wrong types module (`is`)
      if (!is.array.empty(global)) {
        console.log('Global: ');
        console.log(pjson.render(global));
        console.log('');
      }
    }

    if (Templates.hasLocalTps() && argv.local) {
      const local = removeRcFile(fs.readdirSync(TPS.LOCAL_PATH));

      // @ts-expect-error wrong types module (`is`)
      if (!is.array.empty(local)) {
        console.log('Local: ');
        console.log(pjson.render(local));
      }
    }
  },
} as CommandModule<object, ListArgv>;
