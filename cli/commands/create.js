exports.command = 'create <names...>';

exports.description = 'create a new folder with template';

exports.builder = yargs =>
  yargs
    .option('use', {
      alias: 'u',
      demandOption: true,
      describe: 'Template package to create your with',
      type: 'string'
    })
    .option('packages', {
      alias: 'p',
      describe: 'Aditional Packages to use when building your template',
      type: 'array'
    });

exports.handler = function(argv) {
  // do something with argv.
  console.log('create args', argv);
};
