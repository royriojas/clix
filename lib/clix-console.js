module.exports = function ( options ) {
  var console = require( './console' );
  var chalk = require( 'chalk' );
  var extend = require( 'extend' );
  var util = require( 'util' );

  var inspect = function ( arg ) {
    if ( typeof arg !== 'object' & !Array.isArray( arg ) ) {
      return arg;
    }
    return util.inspect( arg, { depth: 3 } );
  };

  var opts = extend( { coloredOutput: false }, options );

  return {
    ok: function () {
      var args = [ ].slice.call( arguments );
      args.unshift( '>>' );

      if ( opts.coloredOutput ) {
        args = args.map( function ( arg ) {
          return chalk.yellow( inspect( arg ) );
        } );
      }

      console.log.apply( console, args );
    },
    error: function () {
      var args = [ ].slice.call( arguments );
      args.unshift( '>>' );

      if ( opts.coloredOutput ) {
        args = args.map( function ( arg ) {
          return chalk.red( inspect( arg ) );
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
          return chalk.white( inspect( arg ) );
        } );
      }

      console.error.apply( console, args );
    },
    print: function () {
      var args = [ ].slice.call( arguments );

      if ( opts.coloredOutput ) {
        args = args.map( function ( arg ) {
          return chalk.gray( inspect( arg ) );
        } );
      }

      console.log.apply( console, args );
    },
    subtle: function () {
      if ( opts.quiet ) {
        return;
      }

      var args = [ ].slice.call( arguments );
      args.unshift( '>>' );

      if ( opts.coloredOutput ) {
        args = args.map( function ( arg ) {
          return chalk.gray( inspect( arg ) );
        } );
      }

      console.log.apply( console, args );
    },
    success: function () {
      var args = [ ].slice.call( arguments );
      args.unshift( '>>' );

      if ( opts.coloredOutput ) {
        args = args.map( function ( arg ) {
          return chalk.green( inspect( arg ) );
        } );
      }

      console.log.apply( console, args );
    }
  };
};
