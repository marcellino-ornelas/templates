const fs = require('fs-extra');
const pjson = require('prettyjson-256');
const is = require('is');
const LIST_OPTIONS = require('../options/list.json');
const TPS = require('../../lib/utilities/constants');

exports.command = ['list', 'ls'];

exports.description = 'create a new folder with template';

exports.builder = LIST_OPTIONS;

const removeRcFile = (arr) => {
  const i = arr.indexOf('.tpsrc');

  if (i === -1) {
    return arr;
  }
  const copy = arr.concat();
  copy.splice(i, 1);
  return copy;
};

exports.handler = (argv) => {
  if (TPS.HAS_GLOBAL && argv.global) {
    const global = removeRcFile(fs.readdirSync(TPS.GLOBAL_PATH));

    if (!is.array.empty(global)) {
      console.log('Global: ');
      console.log(pjson.render(global));
      console.log('');
    }
  }

  if (TPS.HAS_LOCAL && argv.local) {
    const local = removeRcFile(fs.readdirSync(TPS.LOCAL_PATH));

    if (!is.array.empty(local)) {
      console.log('Local: ');
      console.log(pjson.render(local));
    }
  }
};
