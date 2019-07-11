const path = require('path');

module.exports = function normalizeRelative(file) {
  if (!path.isAbsolute(file) && !file.match(/^\.\//)) {
    file = `./${file}`;
  }
  return file;
};
