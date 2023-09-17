import { CommandModule } from 'yargs';
import publish from './publish';
import use from './use';

export const commands: CommandModule[] = [publish, use];
