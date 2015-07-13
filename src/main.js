'use strict';

module.exports = {
  dirname: __dirname,
  run: function ( cli ) {
    var cfg = cli.getConfig();
    cli.print( cfg );
  }
};
