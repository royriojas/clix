module.exports = function ( file ) {
  var isAbsolute = require( 'path-is-absolute' );
  if ( !isAbsolute( file ) && !file.match( /^\.\// ) ) {
    file = './' + file;
  }
  return file;
};
