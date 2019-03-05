const path = require('path');
const os = require('os');
const findUp = require('find-up');
const Template = require('../../lib/templates');
const utils = require('../lib/utils');

const TPS_GLOBAL_PATH = path.join(os.homedir(), '.tps');
const TPS_LOCAL_PATH = findUp.sync('.tps');
const TPS_GLOBAL_CONFIG_PATH = path.join(TPS_GLOBAL_PATH, '.tpsrc');
const TPS_CONFIG = utils.json(TPS_GLOBAL_CONFIG_PATH);

if (TPS_LOCAL_PATH && TPS_LOCAL_PATH !== TPS_GLOBAL_PATH) {
  const TPS_LOCAL_CONFIG_PATH = path.join(TPS_LOCAL_PATH, '.tpsrc');
  TPS_CONFIG = utils.defaults(utils.json(TPS_LOCAL_CONFIG_PATH), TPS_CONFIG);
}

// TEST
// make ~/.tps/.tpsrc
// cd __test__
// npm run ct

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
  console.log(argv);
  // const temp = new Template();
  // const dest = process.cwd();
  // const src = path.join(dest, '__tests__');

  // temp.use(src);

  // // TODO: Take out when default package is initalized
  // temp.loadPackage('main');

  // const buildPaths = argv.names.map(name => path.join(dest, name));
  // const builders = buildPaths.map(buildPath => temp.render(buildPath));

  // Promise.all(builders).then(() => console.log('process done'));
};
