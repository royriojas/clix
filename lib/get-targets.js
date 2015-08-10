module.exports = function ( commonOpts ) {
  var extend = require( 'extend' );

  var targets = Object.keys( commonOpts ).filter( function ( key ) {
    return key !== 'options';
  } );

  return targets.map( function ( target ) {
    var currentTarget = commonOpts[ target ];

    return {
      name: target,
      data: currentTarget,
      options: extend( true, { }, commonOpts.options, currentTarget.options )
    };
  } );
};
