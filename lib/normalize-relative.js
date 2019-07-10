module.exports = function normalizeRelative(file) {
  const isAbsolute = require('path-is-absolute');
  if (!isAbsolute(file) && !file.match(/^\.\//)) {
    file = `./${file}`;
  }
  return file;
};
