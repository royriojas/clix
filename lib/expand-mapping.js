module.exports = function ( data ) {
  //var files = data.files;

  var src = Array.isArray( data.src ) ? data.src : [ data.src ];
  var dest = data.dest;

  var result = require( './expand-globs.js' )( src, {
    cwd: data.cwd,
    filter: data.filter,
    resolvePaths: data.resolvePaths
  } );

  return {
    files: [
      {
        src: result,
        dest: dest
      }
    ]
  };
};
