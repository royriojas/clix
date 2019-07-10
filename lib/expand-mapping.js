const path = require('path');
const trim = require('jq-trim');
const normalizeRelative = require('./normalize-relative');

const processFile = function processFile(dest, file, data) {
  dest = trim(dest);
  const ext = data.ext;
  if (ext) {
    file = file.replace(/\.\w+$/, ext);
  }

  if (data.rename) {
    const res = data.rename(dest, file);
    if (!res) {
      file = normalizeRelative(path.join(dest, file));
    } else {
      file = res;
    }
  } else {
    file = normalizeRelative(path.join(dest, file));
  }
  return file;
};

module.exports = function expandMapping(dataEntry) {
  dataEntry = dataEntry || {};

  if (Array.isArray(dataEntry.files)) {
    dataEntry = dataEntry.files;
  }

  if (!Array.isArray(dataEntry)) {
    dataEntry = [dataEntry];
  }

  let filesResult = [];

  dataEntry.forEach(data => {
    const src = Array.isArray(data.src) ? data.src : [data.src];
    let dest = data.dest;

    if (dest) {
      dest = normalizeRelative(dest);
    }

    let dataCwd;

    if (data.cwd) {
      dataCwd = normalizeRelative(data.cwd);
    }

    const result = require('./expand-globs.js')(src, {
      cwd: dataCwd || process.cwd(),
      filter: data.filter,
      resolvePaths: false,
    });

    let res = { src: result, dest };

    if (dataCwd && !data.expand) {
      res.cwd = dataCwd;
    }

    if (data.expand) {
      res = res.src.map(file => ({
        src: [normalizeRelative(path.join(trim(dataCwd), file))],
        dest: processFile(dest, file, data),
      }));
      filesResult = filesResult.concat(res);
    } else {
      filesResult.push(res);
    }
  });

  return filesResult;
};
