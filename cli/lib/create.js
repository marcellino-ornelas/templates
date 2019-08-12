const path = require('path');
const debug = require('debug');
const Template = require('../../lib/templates');
const is = require('is');

module.exports.createHandler = function(argv) {
  const dest = process.cwd();

  if (argv.verbose) {
    debug.enable('tps');
  }

  const tps = new Template(argv.use, {
    default: argv.default,
    newFolder: !argv.noNewFolder,
    force: argv.force,
    wipe: argv.wipe
  });

  if (is.array(argv.packages) && !is.array.empty(argv.packages)) {
    tps.loadPackages(argv.packages);
  }

  tps.loadConfig(argv);

  const hasBuildPaths = !is.array.empty(argv.buildPaths);
  const renderItems = hasBuildPaths ? argv.buildPaths : null;

  const renderData = {
    name: argv.name
  };

  tps
    .render(dest, renderItems, renderData)
    .then(() => {
      console.log('process done');
    })
    .catch(e => {
      console.log('tps error', e);
      process.exit(1);
    });
};
