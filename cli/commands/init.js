const path = require('path');
const os = require('os');
const findUp = require('find-up');
const Template = require('../../lib/templates');
const TPS = require('../../lib/utilities/constants');
const { isDir } = require('../../lib/utilities/fileSystem');

exports.command = 'init';

exports.description = 'Initialize local settings';

exports.builder = yargs =>
  yargs.option('force', {
    alias: 'f',
    describe: 'Initialize tps in cwd no matter what',
    type: 'boolean'
  });

exports.handler = function(argv) {
  const temp = new Template();
  const localDest = process.cwd();

  temp.use('init', {
    tpsPath: TPS.MAIN_TPS
  });

  // TODO: Take out
  temp.loadPackage('default');

  const inProcessBuilds = [];

  if (!TPS.HAS_GLOBAL) {
    inProcessBuilds.push(temp.render(TPS.GLOBAL_PATH));
  }

  if (argv.force || isDir(TPS.LOCAL_PATH)) {
    if (isDir(TPS.INIT_LOCAL_PATH)) {
    }
    inProcessBuilds.push(temp.render(TPS.INIT_LOCAL_PATH));
  } else {
    console.log('You already have a init folder');
    process.exit(1);
  }

  Promise.all(inProcessBuilds)
    .then(() => console.log('Init process complete'))
    .catch(err => {
      console.error(err);
      process.exit(1);
    });
};
