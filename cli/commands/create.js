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
    });

exports.handler = function(argv) {
  const tps = new Template({ verbose: argv.verbose });
  const dest = process.cwd();

  tps.use(argv.use);

  if (argv.packages && !is.array.empty(argv.packages)) {
    tps.loadPackage(argv.packages);
  }

  tps.loadConfig(argv);
  console.log(tps.config);
  // console.log('heloo', tps._prompts.needsAnswers());

  console.log('after load config');
  let buildPaths;
  // if no paths specified then create items in cwd
  if (is.array(argv.names) && !is.array.empty(argv.names)) {
    buildPaths = argv.names.map(name => path.join(dest, name));
  } else {
    buildPaths = [dest];
  }

  const builders = buildPaths.map(buildPath => tps.render(buildPath));

  Promise.all(builders).then(() => console.log('process done'));
};
