const path = require('path');
const fs = require('fs-extra');
const TPS = require('../../../lib/utilities/constants');
const { isDir } = require('../../../lib/utilities/fileSystem');

exports.command = 'package <template> <package>';

exports.description = 'create a new package in a template';

exports.builder = {};

exports.handler = (argv) => {
  const dest = path.join(process.cwd(), TPS.TPS_FOLDER, argv.template);

  if (!isDir(dest)) {
    throw new Error('TPS template was not found.');
  }
  const newPackageDir = path.join(dest, argv.package);
  fs.mkdirSync(newPackageDir);
};
