exports.command = 'new <command>';

exports.description = 'create a new template | package';

exports.builder = yargs => yargs.commandDir('new_commands');

exports.handler = () => {};
