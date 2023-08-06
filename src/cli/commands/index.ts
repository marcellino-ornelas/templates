import { CommandModule } from 'yargs';
import * as list from './list';
import init from './init';

export const commands: CommandModule[] = [list, init];
