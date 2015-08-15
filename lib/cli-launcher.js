module.exports = {
  launch: function ( cliOptions, callback ) {
    var me = this;
    var d = require( 'domain' ).create();
    var nodeProcess = require( './process' );
    var env = nodeProcess.env || { };

    var logger = require( 'clix-logger' )( {
      coloredOutput: env.__CLIX_COLORED_OUTPUT__ === 'true'
    } );

    function handleError( ex ) {
      var args = { error: ex };

      if ( me.onError ) {
        me.onError( args );
      }

      if ( args.handled ) {
        return;
      }

      if ( nodeProcess.argv.indexOf( '--stack' ) > -1 ) {
        logger.error( ex.message, ex.stack );
      } else {
        logger.error( ex.message );
      }

      nodeProcess.exit( 1 );
    }

    d.on( 'error', handleError );

    d.run( function () {
      var program;

      program = require( './cli-options' )( cliOptions, nodeProcess.argv, nodeProcess.env );

      var opts = program.opts;

      if ( opts.help ) {
        program.showHelp();
        return;
      }
      if ( opts.version ) {
        program.showVersion();
        return;
      }
      callback && callback( program );

    } );
  }
};
