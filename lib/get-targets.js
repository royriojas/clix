module.exports = function getTargets(config, execTarget) {
  const { merge } = require('lodash');

  config = config || {};

  const expandMapping = require('./expand-mapping');
  let commonOpts = {};

  if (execTarget) {
    const parts = execTarget.split(/,/);

    parts.forEach(part => {
      part = part.trim();
      if (part && config[part]) {
        commonOpts[part] = config[part];
      }
    });

    if (Object.keys(commonOpts).length === 0) {
      commonOpts = config;
    }
  } else {
    commonOpts = config;
  }

  const targets = Object.keys(commonOpts).filter(key => key !== 'options');

  return targets.map(target => {
    const currentTarget = commonOpts[target];
    const def = { name: target };

    Object.defineProperty(def, 'data', { value: currentTarget });

    Object.defineProperty(def, 'options', {
      enumerable: true,
      get() {
        return merge({}, config.options, currentTarget.options);
      },
    });

    Object.defineProperty(def, 'files', {
      enumerable: true,
      get() {
        return expandMapping(currentTarget);
      },
    });
    return def;
  });
};
