const logger = require('../../lib/utilities/logger');

exports.command = 'new <command>';

// exports.command = ['new <command>', 'n <command>']; ???

exports.description = 'create a new template | package';

exports.builder = (yargs) => yargs.commandDir('new_commands');
// .positional('command', {
//   type: 'string',
//   choices: ['package', 'template']
// });
