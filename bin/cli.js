#!/usr/bin/env node

var main = require( '../src/main' );
var programOptions = require( '../src/options' );

var cliLauncher = require( '../lib/cli-launcher' );

// cliLauncher.onError = function (args) {
//   //var err = args.error;
//   //args.handled = true;
//   //console.error(err.message);
// };

cliLauncher.launch( programOptions, function ( program ) {
  program.subtle( 'subtle message' );
  program.log( 'log message' );
  program.ok( 'ok message' );
  program.error( 'error message' );
  program.success( 'success message' );

  main.run( program );
} );
