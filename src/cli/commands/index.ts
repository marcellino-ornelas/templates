import { CommandModule } from 'yargs';
import list from './list';
import init from './init';
import copy from './copy';
import migrate from './migrate';
import newCmd from './new';
import use from './use';
import create from './create';
import template from './template';

export const commands: CommandModule[] = [
  list,
  init,
  copy,
  migrate,
  newCmd,
  //   use,
  template,
  create,
];
