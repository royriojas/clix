module.exports = {
  launch: function ( cliOptions, callback ) {
    var me = this;
    try {
      var nodeProcess = require( './process' );

      var program = require( './cli-options' )( cliOptions, nodeProcess.argv, nodeProcess.env );

      var opts = program.opts;

      if ( opts.help ) {
        program.showHelp();
        return;
      }
      if ( opts.version ) {
        program.showVersion();
        return;
      }

      // TODO: Add domain to handle async errors

      callback && callback( program );
    } catch (ex) {

      var args = { error: ex };

      if ( me.onError ) {
        me.onError( args );
      }
      if ( args.handled ) {
        return;
      }

      program.error( ex.message );
      nodeProcess.exit( 1 );
    }
  }
};
