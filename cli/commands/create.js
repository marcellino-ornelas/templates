const CREATE_OPTIONS = require('../options/create.json');
const { createHandler } = require('../lib/create');

exports.command = 'create [buildPaths...]';

exports.description = 'create a new folder with template';

exports.builder = CREATE_OPTIONS;

exports.handler = createHandler;
