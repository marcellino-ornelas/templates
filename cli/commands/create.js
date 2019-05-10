const path = require('path');
const Template = require('../../lib/templates');
const is = require('is');

exports.command = 'create [buildPaths...]';

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
      describe: 'Additional Packages to use when building your template',
      type: 'array'
    })
    .option('no-default', {
      alias: 'p',
      describe: 'Additional Packages to use when building your template',
      type: 'array'
    })
    .option('name', {
      alias: 'n',
      describe:
        'Name for template rendering. defaults to base name of the destination path',
      type: 'string'
    })
    .option('dest', {
      alias: 'd',
      describe: 'Path to the folder you would like to render your template in',
      type: 'string'
    });

exports.handler = function(argv) {
  const hasExtraPackages = !is.array.empty(argv.packages);
  const hasBuildPaths = is.array.empty(argv.buildPaths);
  const dest = argv.dest || process.cwd();

  const tps = new Template({
    verbose: argv.verbose
  });

  tps.use(argv.use);

  if (hasExtraPackages) {
    tps.loadPackage(argv.packages);
  }

  tps.loadConfig(argv);

  const renderItems = hasBuildPaths ? argv.buildPaths : null;

  const renderData = {
    name: argv.name
  };

  tps.render(dest, renderItems, renderData).then(() => {
    console.log('process done');
  });

  // let buildPaths;
  // // if no paths specified then create items in cwd
  // if (is.array(argv.names) && !is.array.empty(argv.names)) {
  //   buildPaths = argv.names.map(name => path.join(dest, name));
  // } else {
  //   buildPaths = [dest];
  // }

  // const builders = buildPaths.map(buildPath =>
  //   tps.render(buildPath, renderData)
  // );

  // Promise.all(builders).then(() => console.log('process done'));
};
