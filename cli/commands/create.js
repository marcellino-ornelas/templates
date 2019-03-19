const path = require('path');
const Template = require('../../lib/templates');
const utils = require('../../lib/utils');
const TPS = require('../../lib/utilities/constants');

let TPS_CONFIG = utils.json(TPS.GLOBAL_CONFIG_PATH);

if (TPS.LOCAL_CONFIG_PATH) {
  TPS_CONFIG = utils.defaults(utils.json(TPS.LOCAL_CONFIG_PATH), TPS_CONFIG);
}

console.log(TPS_CONFIG);

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
  const temp = new Template({ verbose: argv.verbose });
  const dest = process.cwd();

  temp.use(argv.use);

  // TODO: Take out when default package is initalized
  temp.loadPackage('default');

  console.log('dest', dest);
  console.log('names', argv.names);
  // temp.loadPackages(argv.packages);

  const buildPaths = argv.names.map(name => path.join(dest, name));
  const builders = buildPaths.map(buildPath => temp.render(buildPath));

  Promise.all(builders).then(() => console.log('process done'));
};
