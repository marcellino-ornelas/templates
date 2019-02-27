const Template = require('../../lib/templates');
const path = require('path');

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
  const temp = new Template();
  const dest = process.cwd();
  const src = path.join(dest, '__tests__');

  temp.use(src);

  // TODO: Take out when default package is initalized
  temp.loadPackage('main');

  const buildPaths = argv.names.map(name => path.join(dest, name));
  const builders = buildPaths.map(buildPath => temp.render(buildPath));

  Promise.all(builders).then(() => console.log('process done'));
};
