const { createFsFromVolume } = require('memfs');
const { vol } = require('../__tests__/utilities/vol');

const fs = createFsFromVolume(vol);

module.exports = fs;
