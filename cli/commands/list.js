const TPS = require('../../lib/utilities/constants');
const fs = require('fs-extra');
const pjson = require('prettyjson-256');
const { LIST_OPTIONS } = require('../options');

exports.command = ['list', 'ls'];

exports.description = 'create a new folder with template';

exports.builder = LIST_OPTIONS;

const removeRcFile = arr => {
  const i = arr.indexOf('.tpsrc');

  if (i === -1) {
    return arr;
  } else {
    const copy = arr.concat();
    copy.splice(i, 1);
    return copy;
  }
};

exports.handler = function(argv) {
  let templates = [];

  if (TPS.HAS_GLOBAL && argv.global) {
    const global = removeRcFile(fs.readdirSync(TPS.GLOBAL_PATH));

    templates = templates.concat(global);
  }

  if (TPS.HAS_LOCAL && argv.local) {
    const local = removeRcFile(fs.readdirSync(TPS.LOCAL_PATH));

    templates = templates.concat(local);
  }

  console.log(pjson.render(templates));
};
