import { CommandModule } from 'yargs';
import newTemplate from './template';
import newPackage from './package';

export const commands: CommandModule[] = [newTemplate, newPackage];
