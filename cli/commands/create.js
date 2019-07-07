const path = require('path');
const Template = require('../../lib/templates');
const is = require('is');
const CREATE_OPTIONS = require('../options/create');

exports.command = 'create [buildPaths...]';

exports.description = 'create a new folder with template';

exports.builder = CREATE_OPTIONS;

exports.handler = function(argv) {
  const dest = process.cwd();

  console.log(argv);
  const tps = new Template({
    verbose: argv.verbose,
    default: argv.default,
    newFolder: !argv.noNewFolder
  });

  tps.use(argv.use);

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
