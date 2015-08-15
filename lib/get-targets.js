module.exports = function ( config, execTarget ) {
  config = config || { };

  var extend = require( 'extend' );
  var expandMapping = require( './expand-mapping' );
  var commonOpts = { };

  if ( execTarget ) {
    if ( config[ execTarget ] ) {
      commonOpts[ execTarget ] = config[ execTarget ];
    } else {
      commonOpts = config;
    }
  } else {
    commonOpts = config;
  }

  var targets = Object.keys( commonOpts ).filter( function ( key ) {
    return key !== 'options';
  } );

  return targets.map( function ( target ) {
    var currentTarget = commonOpts[ target ];
    var def = { name: target };

    Object.defineProperty( def, 'data', { value: currentTarget } );

    Object.defineProperty( def, 'options', {
      enumerable: true,
      get: function () {
        return extend( true, { }, config.options, currentTarget.options );
      }
    } );

    Object.defineProperty( def, 'files', {
      enumerable: true,
      get: function () {
        return expandMapping( currentTarget );
      }
    } );
    return def;
  } );
};
