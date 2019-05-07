const path = require('path');
const Template = require('../../lib/templates');
const is = require('is');

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
    });

exports.handler = function(argv) {
  const tps = new Template({
    verbose: argv.verbose
  });

  const dest = process.cwd();

  tps.use(argv.use);

  if (argv.packages && !is.array.empty(argv.packages)) {
    tps.loadPackage(argv.packages);
  }

  tps.loadConfig(argv);

  let buildPaths;

  // if no paths specified then create items in cwd
  if (is.array(argv.names) && !is.array.empty(argv.names)) {
    buildPaths = argv.names.map(name => path.join(dest, name));
  } else {
    buildPaths = [dest];
  }

  const renderData = {
    name: argv.name
  };

  const builders = buildPaths.map(buildPath =>
    tps.render(buildPath, renderData)
  );

  Promise.all(builders).then(() => console.log('process done'));
};
