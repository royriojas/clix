
var lodash = require( 'lodash' );
var glob = require( 'glob' );

var difference = lodash.difference;
var union = lodash.union;

var globExclude = function globExclude( pattern, opts ) {
  var exclude = pattern.indexOf( '!' ) === 0;

  if ( exclude ) {
    pattern = pattern.slice( 1 );
  }

  return { result: glob.sync( pattern, opts ), exclude: exclude };
};

var expand = function expand( patterns, opts ) {
  var results = patterns.reduce( (acc, p) => {
    if ( p ) {
      acc.push( globExclude( p, opts ) );
    }
    return acc;
  }, [ ] );

  const matches = results.reduce( function ( acc, iter ) {
    var result = iter.result;
    var exclude = iter.exclude;

    if ( exclude ) {
      acc = difference( acc, result );
    } else {
      acc = union( acc, result );
    }

    return acc;
  }, [ ] );

  return matches.sort();
};

module.exports = function expandGlobs( globs, options ) {
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

  files = expand( files, opts );
  return files;
};
