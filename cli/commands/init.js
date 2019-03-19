const path = require('path');
const os = require('os');
const findUp = require('find-up');
const Template = require('../../lib/templates');
const TPS = require('../../lib/utilities/constants');
const utils = require('../../lib/utils');

exports.command = 'init';

exports.description = 'Initialize local settings';

// exports.builder = yargs =>
//   yargs.option('override', {
//     alias: 'o',
//     describe: 'Overwrite global and local settings',
//     type: 'boolean'
//   });

exports.handler = function(argv) {
  console.log(argv);

  const temp = new Template();
  const localDest = process.cwd();

  temp.use('init', {
    tpsPath: TPS.MAIN_TPS
  });

  // TODO: Take out
  temp.loadPackage('default');

  const inProcessBuilds = [];

  if (argv.override || !TPS.HAS_GLOBAL) {
    inProcessBuilds.push(temp.render(TPS.GLOBAL_PATH));
  }

  if (argv.override || !utils.isDir(TPS.LOCAL_PATH)) {
    inProcessBuilds.push(temp.render(TPS.INIT_LOCAL_PATH));
  } else {
    console.log('You already have a init folder');
  }

  Promise.all(inProcessBuilds)
    .then(() => console.log('Init process complete'))
    .catch(err => console.error(err));
};
