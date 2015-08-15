module.exports = function expandGlobs( globs, options ) {
  var expand = require( 'glob-expand' );
  var extend = require( 'extend' );
  var normalizeRelative = require( './normalize-relative' );

  var process = require( './process' );
  var opts = { };
  var homeDir = require( 'os-homedir' )();

  extend( true, opts, options );

  var resolvePaths = opts.resolvePaths;

  delete opts.resolvePaths;

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

    cleanGlob = normalizeRelative( cleanGlob );

    return prefix + (resolvePaths ? path.resolve( process.cwd(), cleanGlob ) : cleanGlob);
  } );

  files = expand( opts, files );
  return files;
};
