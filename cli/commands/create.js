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
    .option('default', {
      alias: 'd',
      type: 'boolean',
      describe: 'Use all default answers to all prompts'
    })
    // .option('no-default', {
    //   alias: 'p',
    //   describe: 'Additional Packages to use when building your template',
    //   type: 'array'
    // })
    .option('name', {
      alias: 'n',
      describe:
        'Name for template rendering. defaults to base name of the destination path',
      type: 'string'
    })
    .option('noNewFolder', {
      alias: 'f',
      describe: "Don't create a new folder",
      type: 'boolean'
    })
    .option('dest', {
      alias: 'd',
      describe: 'Path to the folder you would like to render your template in',
      type: 'string'
    });

exports.handler = function(argv) {
  const dest = argv.dest || process.cwd();

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

  console.log('buildPaths', argv.buildPaths);

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
