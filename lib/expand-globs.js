const lodash = require('lodash');
const glob = require('glob');

const difference = lodash.difference;
const union = lodash.union;

const globExclude = function globExclude(pattern, opts) {
  const exclude = pattern.indexOf('!') === 0;

  if (exclude) {
    pattern = pattern.slice(1);
  }

  return { result: glob.sync(pattern, opts), exclude };
};

const expand = function expand(patterns, opts) {
  const results = patterns.reduce((acc, p) => {
    if (p) {
      acc.push(globExclude(p, opts));
    }
    return acc;
  }, []);

  const matches = results.reduce((acc, iter) => {
    const result = iter.result;
    const exclude = iter.exclude;

    if (exclude) {
      acc = difference(acc, result);
    } else {
      acc = union(acc, result);
    }

    return acc;
  }, []);

  return matches.sort();
};

module.exports = function expandGlobs(globs, options) {
  const normalizeRelative = require('./normalize-relative');

  const process = require('./process');
  const opts = {
    ...options,
  };
  const homeDir = require('os-homedir')();

  const resolvePaths = opts.resolvePaths;

  delete opts.resolvePaths;

  if (typeof globs === 'string') {
    globs = [globs];
  }

  if (!Array.isArray(globs)) {
    throw new TypeError('globs must be an array of strings or a single string');
  }

  const path = require('path');
  let files = globs.map(globP => {
    const ctrlChar = globP.charAt(0);
    const hasNegation = ctrlChar === '!';

    let cleanGlob = hasNegation ? globP.substr(1) : globP;
    const prefix = hasNegation ? '!' : '';

    if (cleanGlob.charAt(0) === '~') {
      cleanGlob = path.join(homeDir, cleanGlob.substr(1));
    }

    cleanGlob = normalizeRelative(cleanGlob);

    return prefix + (resolvePaths ? path.resolve(process.cwd(), cleanGlob) : cleanGlob);
  });

  files = expand(files, opts);
  return files;
};
