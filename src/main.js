'use strict';

module.exports = {
  dirname: __dirname,
  run(cli) {
    // var cfg = cli.getConfig();
    // throw new Error('error');
    // cli.print( cfg );
    setTimeout(() => {
      const cfg = cli.getConfig();
      cli.print(cfg);
    }, 100);
  },
};
