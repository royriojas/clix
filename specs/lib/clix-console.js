describe( 'clix-console', function () {
  var proxyquire = require( 'proxyquire' );

  describe( 'when opts.coloredOutput is set to true', function () {
    it( 'should print messages using colorized ouput', function () {
      var output = '';
      var pushText = function () {
        var text = [ ].join.apply( arguments, [ ' ' ] );
        output = output + text + '\n';
      };
      var csl = proxyquire( '../../lib/clix-console', {
        './console': {
          ok: pushText,
          log: pushText,
          subtle: pushText,
          error: pushText,
          success: pushText
        }
      } )( { coloredOutput: true } );

      csl.log( 'this is a test', 'of a log message' );
      csl.ok( 'this is a test', 'of an ok message' );
      csl.error( 'this is a test', 'of an error message' );
      csl.success( 'this is a test', 'of a success message' );
      csl.subtle( 'this is a test', 'of a subtle message' );
      csl.print( 'this is a test', 'of a print message' );

      var fs = require( 'fs' );
      var expected = fs.readFileSync( './resources/expected/colored-output.txt', {
        encoding: 'utf8'
      } );

      expect( output ).to.equal( expected );
      //console.log(output);

    } );
  } );

  describe( 'when opts.coloredOutput is set to false', function () {
    it( 'should print messages not using colorized ouput', function () {
      var output = '';
      var pushText = function () {
        var text = [ ].join.apply( arguments, [ ' ' ] );
        output = output + text + '\n';
      };
      var csl = proxyquire( '../../lib/clix-console', {
        './console': {
          ok: pushText,
          log: pushText,
          subtle: pushText,
          error: pushText,
          success: pushText
        }
      } )( { coloredOutput: false } );

      csl.log( 'this is a test', 'of a log message' );
      csl.ok( 'this is a test', 'of an ok message' );
      csl.error( 'this is a test', 'of an error message' );
      csl.success( 'this is a test', 'of a success message' );
      csl.subtle( 'this is a test', 'of a subtle message' );
      csl.print( 'this is a test', 'of a print message' );

      var fs = require( 'fs' );
      //fs.writeFileSync('./resources/expected/no-colored-output.txt', output);
      var expected = fs.readFileSync( './resources/expected/no-colored-output.txt', {
        encoding: 'utf8'
      } );

      expect( output ).to.equal( expected );
      //console.log(output);

    } );
  } );
} );
