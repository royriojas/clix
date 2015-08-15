module.exports = function expandGlobs( globs, options ) {
  var expand = require( 'glob-expand' );
  var extend = require( 'extend' );

  var process = require( './process' );
  var opts = { };
  var homeDir = require( 'os-homedir' )();
  extend( true, opts, options );

  if ( typeof globs === 'string' ) {
    globs = [ globs ];
  }

  if ( !Array.isArray( globs ) ) {
    throw new TypeError( 'globs must be an array of strings or a single string' );
  }

  var path = require( 'path' );
  var files = globs.map( function ( glob ) {
    var ctrlChar = glob.charAt( 0 );
    var hasNegation = ctrlChar === '!';

    var cleanGlob = hasNegation ? glob.substr( 1 ) : glob;
    var prefix = hasNegation ? '!' : '';

    if ( cleanGlob.charAt( 0 ) === '~' ) {
      cleanGlob = path.join( homeDir, cleanGlob.substr( 1 ) );
    }

    return prefix + path.resolve( process.cwd(), cleanGlob );
  } );

  files = expand( opts, files );
  return files;
};
