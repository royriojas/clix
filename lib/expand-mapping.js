module.exports = function expandMapping( dataEntry ) {
  dataEntry = dataEntry || { };
  var normalizeRelative = require( './normalize-relative' );

  if ( Array.isArray( dataEntry.files ) ) {
    dataEntry = dataEntry.files;
  }

  if ( !Array.isArray( dataEntry ) ) {
    dataEntry = [ dataEntry ];
  }

  var filesResult = [ ];

  dataEntry.forEach( function ( data ) {
    var path = require( 'path' );

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
      res.cwd = data.resolvePaths ? path.resolve( dataCwd ) : dataCwd;
    }

    if ( data.expand ) {
      res = res.src.map( function ( file ) {
        return {
          src: [
            normalizeRelative( path.join( dataCwd, file ) )
          ],
          dest: normalizeRelative( path.join( dest, file ) )
        };
      } );
      filesResult = filesResult.concat( res );
    } else {
      filesResult.push( res );
    }
  } );

  return filesResult;
};
