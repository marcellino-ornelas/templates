const path = require('path');
const Template = require('../../lib/templates');
const is = require('is');
const { json, isDir } = require('../../lib/utilities/fileSystem');
const utils = require('../../lib/utils');
const TPS = require('../../lib/utilities/constants');
const { defaults, cliLog } = require('../../lib/utilities/helpers');
let TPS_CONFIG = json(TPS.GLOBAL_CONFIG_PATH);

if (TPS.LOCAL_CONFIG_PATH) {
  TPS_CONFIG = defaults(json(TPS.LOCAL_CONFIG_PATH), TPS_CONFIG);
}

exports.command = 'create [names...]';

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

  if (argv.packages && argv.packages.length) {
    temp.loadPackage(argv.packages);
  }

  let buildPaths;

  if (is.array(argv.names) && !is.array.empty(argv.names)) {
    buildPaths = argv.names.map(name => path.join(dest, name));
  } else {
    buildPaths = [dest];
  }

  const builders = buildPaths.map(buildPath => temp.render(buildPath));

  Promise.all(builders).then(() => console.log('process done'));
};
