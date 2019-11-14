const path = require('path');
const debug = require('debug');
const is = require('is');
const pjson = require('prettyjson-256');
const Template = require('../../lib/templates');

module.exports.createHandler = function(argv) {
  const dest = process.cwd();

  // if (argv.verbose) {
  //   debug.enable('tps');
  // }

  const {
    noNewFolder,
    force,
    wipe,
    default: _default,
    packages,
    buildPaths,
    ...answers
  } = argv;

  const tps = new Template(argv.use, {
    default: _default,
    newFolder: !noNewFolder,
    force,
    wipe
  });

  if (is.array(packages) && !is.array.empty(packages)) {
    tps.loadPackages(packages);
  }

  if (tps.hasPrompts()) {
    tps.setAnswers(answers);
  }

  const hasBuildPaths = !is.array.empty(buildPaths);
  const renderItems = hasBuildPaths ? buildPaths : null;

  const renderData = {
    name: argv.name
  };

  tps
    .render(dest, renderItems, renderData)
    .then(() => {
      console.log('process done');
      process.exit(0);
    })
    .catch(e => {
      // console.error('tps error');
      console.error(pjson.render(e));
      process.exit(1);
    });
};
