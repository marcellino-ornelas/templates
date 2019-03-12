const path = require('path');
const os = require('os');
const findUp = require('find-up');
const Template = require('../../lib/templates');
const TPS = require('../../lib/utilities/constants');
const utils = require('../../lib/utils');

exports.command = 'init';

exports.description = 'Initialize local settings';

exports.builder = yargs =>
  yargs.option('override', {
    alias: 'o',
    describe: 'Overwrite global and local settings',
    type: 'boolean'
  });

exports.handler = function(argv) {
  console.log(argv);

  const temp = new Template();
  const localDest = process.cwd();
  temp.use(TPS.MAIN_DIR);

  temp.loadPackage('init');

  const inProcessBuilds = [];

  if (argv.override || !TPS.HAS_GLOBAL) {
    inProcessBuilds.push(temp.render(TPS.GLOBAL_PATH));
  }

  if (utils.isDir(TPS.LOCAL_PATH)) {
  }

  inProcessBuilds.push(temp.render(TPS.INIT_LOCAL_PATH));

  Promise.all(inProcessBuilds)
    .then(() => console.log('init complete'))
    .catch(err => console.error(err));

  // const buildPaths = argv.names.map(name => path.join(dest, name));
  // const builders = buildPaths.map(buildPath => temp.render(buildPath));

  // Promise.all(builders).then(() => console.log('process done'));
};
