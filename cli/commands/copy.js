const debug = require('debug');
const errorExit = require('../lib/error-exit');
const Template = require('../../lib/templates');
const TPS = require('../../lib/utilities/constants');
const {
  InitializedAlreadyError,
  ParentDirectoryInitializedError,
  GlobalInitializedAlreadyError,
} = require('../../lib/errors');
const logger = require('../../lib/utilities/logger').default;

exports.command = ['copy <template>', 'cp <template>'];

exports.description = 'Copy a template';

exports.builder = {
  //   global: {
  //     type: 'boolean',
  //     description: 'List out global files',
  //     alias: 'g',
  //     default: true,
  //   },
  //   local: {
  //     type: 'boolean',
  //     description: 'List out global files',
  //     alias: 'l',
  //     default: true,
  //   },
};

exports.handler = (argv) => {
  const template = new Template(argv.template);

  console.log(template);
};
