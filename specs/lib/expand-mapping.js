describe( 'expand-mapping', function () {
  describe( 'when passed a data object with `.src` and `.dest` properties', function () {
    it( 'should convert the passed structure to an array of file mappings', function () {
      var expandMapping = require( '../../lib/expand-mapping' );

      var mappings = expandMapping( {
        src: 'resources/expand/**/*',
        dest: 'dest/'
      } );

      var expected = {
        'files': [
          {
            'src': [
              './resources/expand/demo-1.js',
              './resources/expand/demo-1.less',
              './resources/expand/demo-2.js',
              './resources/expand/demo-2.less',
              './resources/expand/demo-3.js',
              './resources/expand/demo-3.less',
              './resources/expand/sub-folder',
              './resources/expand/sub-folder/sub-sub-1',
              './resources/expand/sub-folder/sub-sub-1/demo-1.txt',
              './resources/expand/sub-folder/sub-sub-1/demo-2.css',
              './resources/expand/sub-folder/sub-sub-1/demo-3.jpg'
            ],
            'dest': 'dest/'
          }
        ]
      };

      expect( mappings ).to.deep.equal( expected );
    } );
  } );
} );
