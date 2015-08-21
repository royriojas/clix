var normalizeRelative = require( './normalize-relative' );
var path = require( 'path' );
var trim = require( 'jq-trim' );

var processFile = function ( dest, file, data ) {
  dest = trim( dest );
  var ext = data.ext;
  if ( ext ) {
    file = file.replace( /\.\w+$/, ext );
  }

  if ( data.rename ) {
    var res = data.rename( dest, file );
    if ( !res ) {
      file = normalizeRelative( path.join( dest, file ) );
    } else {
      file = res;
    }
  } else {
    file = normalizeRelative( path.join( dest, file ) );
  }
  return file;
};

module.exports = function expandMapping( dataEntry ) {
  dataEntry = dataEntry || { };

  if ( Array.isArray( dataEntry.files ) ) {
    dataEntry = dataEntry.files;
  }

  if ( !Array.isArray( dataEntry ) ) {
    dataEntry = [ dataEntry ];
  }

  var filesResult = [ ];

  dataEntry.forEach( function ( data ) {

    var src = Array.isArray( data.src ) ? data.src : [ data.src ];
    var dest = data.dest;

    if ( dest ) {
      dest = normalizeRelative( dest );
    }

    var dataCwd;

    if ( data.cwd ) {
      dataCwd = normalizeRelative( data.cwd );
    }

    var result = require( './expand-globs.js' )( src, {
      cwd: dataCwd,
      filter: data.filter,
      resolvePaths: false
    } );

    var res = { src: result, dest: dest };

    if ( dataCwd && !data.expand ) {
      res.cwd = dataCwd;
    }

    if ( data.expand ) {
      res = res.src.map( function ( file ) {
        return {
          src: [
            normalizeRelative( path.join( trim( dataCwd ), file ) )
          ],
          dest: processFile( dest, file, data )
        };
      } );
      filesResult = filesResult.concat( res );
    } else {
      filesResult.push( res );
    }
  } );

  return filesResult;
};
