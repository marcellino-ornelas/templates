const path = require('path');
const Template = require('../../../lib/templates');
const TPS = require('../../../lib/utilities/constants');
const { isDir } = require('../../../lib/utilities/fileSystem');

exports.command = 'template <template>';

exports.description = 'create a new template';

exports.builder = {};

exports.handler = (argv) => {
  const tps = new Template('new-template', {
    tpsPath: TPS.DEFAULT_TPS,
  });

  const dest = path.join(process.cwd(), TPS.TPS_FOLDER);

  if (isDir(path.join(dest, argv.template))) {
    throw new Error('TPS template is already created.');
  }

  tps
    .render(dest, argv.template)
    .then(() => {
      console.log(`Template created: ${argv.template}`);
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
};
