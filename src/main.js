'use strict';

module.exports = {
  dirname: __dirname,
  run: function ( cli ) {
    //var cfg = cli.getConfig();
    //throw new Error('error');
    //cli.print( cfg );
    setTimeout( function () {
      var cfg = cli.getConfig();
      cli.print( cfg );
    }, 100 );
  }
};
