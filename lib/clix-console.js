module.exports = function ( options ) {
  var console = require( './console' );
  var chalk = require( 'chalk' );
  var extend = require( 'extend' );

  var opts = extend( { coloredOutput: false }, options );

  return {
    ok: function () {
      var args = [ ].slice.call( arguments );
      args.unshift( '>>' );

      if ( opts.coloredOutput ) {
        args = args.map( function ( arg ) {
          return chalk.yellow( arg );
        } );
      }

      console.log.apply( console, args );
    },
    error: function () {
      var args = [ ].slice.call( arguments );
      args.unshift( '>>' );

      if ( opts.coloredOutput ) {
        args = args.map( function ( arg ) {
          return chalk.red( arg );
        } );
      }

      console.error.apply( console, args );
    },
    log: function () {
      if ( opts.quiet ) {
        return;
      }
      var args = [ ].slice.call( arguments );
      args.unshift( '>>' );
      if ( opts.coloredOutput ) {
        args = args.map( function ( arg ) {
          return chalk.white( arg );
        } );
      }

      console.error.apply( console, args );
    },
    subtle: function () {
      if ( opts.quiet ) {
        return;
      }

      var args = [ ].slice.call( arguments );
      args.unshift( '>>' );

      if ( opts.coloredOutput ) {
        args = args.map( function ( arg ) {
          return chalk.gray( arg );
        } );
      }

      console.log.apply( console, args );
    },
    success: function () {
      var args = [ ].slice.call( arguments );
      args.unshift( '>>' );

      if ( opts.coloredOutput ) {
        args = args.map( function ( arg ) {
          return chalk.green( arg );
        } );
      }

      console.log.apply( console, args );
    }
  };
};
