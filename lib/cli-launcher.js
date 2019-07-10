module.exports = {
  launch(cliOptions, callback) {
    const me = this;
    const d = require('domain').create();
    const nodeProcess = require('./process');
    const env = nodeProcess.env || {};

    const logger = require('clix-logger')({
      coloredOutput: env.__CLIX_COLORED_OUTPUT__ === 'true',
    });

    function handleError(ex) {
      const args = { error: ex };

      if (me.onError) {
        me.onError(args);
      }

      if (args.handled) {
        return;
      }

      if (nodeProcess.argv.indexOf('--stack') > -1) {
        logger.error(ex.message, ex.stack);
      } else {
        logger.error(ex.message);
      }

      nodeProcess.exit(1);
    }

    d.on('error', handleError);

    d.run(() => {
      const program = require('./cli-options')(cliOptions, nodeProcess.argv, nodeProcess.env);

      const opts = program.opts;

      if (opts.help) {
        program.showHelp();
        return;
      }
      if (opts.version) {
        program.showVersion();
        return;
      }
      callback && callback(program);
    });
  },
};
