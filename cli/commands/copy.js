const fs = require('fs-extra');
const path = require('path');
const errorExit = require('../lib/error-exit');
const Template = require('../../lib/templates');
const TPS = require('../../lib/utilities/constants');

exports.command = ['copy <template>', 'cp <template>'];

exports.description = 'Copy a template';

exports.builder = {};

exports.handler = (argv) => {
  const template = new Template(argv.template);

  if (TPS.LOCAL_PATH === template.tpsPath) {
    errorExit(
      new Error(`Template ${argv.template} already exists in your directory`)
    );
  }

  const newLocation = path.join(TPS.LOCAL_PATH, argv.template);

  fs.copy(template.src, newLocation)
    .then(() => {
      process.exit(0);
    })
    .catch((error) => {
      errorExit(error);
    });

  console.log(template);
};
