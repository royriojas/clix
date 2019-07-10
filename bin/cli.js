#!/usr/bin/env node

const main = require('../src/main');
const programOptions = require('../src/options');

const cliLauncher = require('../lib/cli-launcher');

// cliLauncher.onError = function (args) {
//   //var err = args.error;
//   //args.handled = true;
//   //console.error(err.message);
// };

cliLauncher.launch(programOptions, program => {
  program.subtle('subtle message');
  program.log('log message');
  program.ok('ok message');
  program.error('error message');
  program.success('success message');

  main.run(program);
});
