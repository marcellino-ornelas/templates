const pjson = require('prettyjson-256');

module.exports = error => {
  console.error(pjson.render(error));
  process.exit(1);
};
