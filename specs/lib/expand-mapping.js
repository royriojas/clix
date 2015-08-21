describe( 'expand-mapping', function () {
  describe( 'when passed a data object with `.src` and `.dest` properties', function () {
    it( 'should convert the passed structure to an array of file mappings', function () {
      var expandMapping = require( '../../lib/expand-mapping' );

      var mappings = expandMapping( {
        src: 'resources/expand/**/*',
        dest: 'dest/'
      } );

      var expected = [
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
          'dest': './dest/'
        }
      ];

      expect( mappings ).to.deep.equal( expected );
    } );
  } );

  describe( 'when using expand set to true', function () {
    it( 'should create groups of objects with src and dest', function () {
      var expandMapping = require( '../../lib/expand-mapping' );

      var mappings = expandMapping( {
        src: 'resources/expand/**/*.less',
        dest: 'dest/',
        expand: true
      } );

      var expected = [
        {
          'src': [
            './resources/expand/demo-1.less'
          ],
          'dest': './dest/resources/expand/demo-1.less'
        },
        {
          'src': [
            './resources/expand/demo-2.less'
          ],
          'dest': './dest/resources/expand/demo-2.less'
        },
        {
          'src': [
            './resources/expand/demo-3.less'
          ],
          'dest': './dest/resources/expand/demo-3.less'
        }
      ];

      //console.log(JSON.stringify( mappings, null, 2));
      expect( mappings ).to.deep.equal( expected );
    } );

    describe( 'when using cwd', function () {
      it( 'should remove the cwd part from the matched file', function () {
        var expandMapping = require( '../../lib/expand-mapping' );

        var mappings = expandMapping( {
          src: '**/*.less',
          dest: 'dest/css/',
          cwd: 'resources/expand',
          expand: true
        } );

        var expected = [
          {
            'src': [
              './resources/expand/demo-1.less'
            ],
            'dest': './dest/css/demo-1.less'
          },
          {
            'src': [
              './resources/expand/demo-2.less'
            ],
            'dest': './dest/css/demo-2.less'
          },
          {
            'src': [
              './resources/expand/demo-3.less'
            ],
            'dest': './dest/css/demo-3.less'
          }
        ];

        //console.log( JSON.stringify( mappings, null, 2 ) );
        expect( mappings ).to.deep.equal( expected );
      } );
    } );

    describe( 'when using ext', function () {
      it( 'should replace the extension on each destination', function () {
        var expandMapping = require( '../../lib/expand-mapping' );

        var mappings = expandMapping( {
          src: '**/*.less',
          dest: 'dest/css/',
          cwd: 'resources/expand',
          ext: '.css',
          expand: true
        } );

        var expected = [
          {
            'src': [
              './resources/expand/demo-1.less'
            ],
            'dest': './dest/css/demo-1.css'
          },
          {
            'src': [
              './resources/expand/demo-2.less'
            ],
            'dest': './dest/css/demo-2.css'
          },
          {
            'src': [
              './resources/expand/demo-3.less'
            ],
            'dest': './dest/css/demo-3.css'
          }
        ];

        //console.log( JSON.stringify( mappings, null, 2 ) );
        expect( mappings ).to.deep.equal( expected );
      } );
    } );

    describe( 'when using rename', function () {
      it( 'should replace the dest with the value returned from the data.rename fn', function () {
        var expandMapping = require( '../../lib/expand-mapping' );
        var path = require( 'path' );

        var mappings = expandMapping( {
          src: '**/*.less',
          dest: 'dest/',
          cwd: 'resources/expand',
          ext: '.css',
          rename: function ( dest, file ) {
            return './' + path.join( dest, 'css/', file );
          },
          expand: true
        } );

        var expected = [
          {
            'src': [
              './resources/expand/demo-1.less'
            ],
            'dest': './dest/css/demo-1.css'
          },
          {
            'src': [
              './resources/expand/demo-2.less'
            ],
            'dest': './dest/css/demo-2.css'
          },
          {
            'src': [
              './resources/expand/demo-3.less'
            ],
            'dest': './dest/css/demo-3.css'
          }
        ];

        expect( mappings ).to.deep.equal( expected );
      } );
    } );

    it( 'should use the default value if no return is provided from rename', function () {
      var expandMapping = require( '../../lib/expand-mapping' );

      var mappings = expandMapping( {
        src: '**/*.less',
        dest: 'dest/',
        cwd: 'resources/expand',
        ext: '.css',
        rename: function () {},
        expand: true
      } );

      var expected = [
        {
          'src': [
            './resources/expand/demo-1.less'
          ],
          'dest': './dest/demo-1.css'
        },
        {
          'src': [
            './resources/expand/demo-2.less'
          ],
          'dest': './dest/demo-2.css'
        },
        {
          'src': [
            './resources/expand/demo-3.less'
          ],
          'dest': './dest/demo-3.css'
        }
      ];

      expect( mappings ).to.deep.equal( expected );
    } );

    it( 'should use the matched name as dest if no destination is provided', function () {
      var expandMapping = require( '../../lib/expand-mapping' );

      var mappings = expandMapping( {
        src: '**/*.less',
        //dest: 'dest/',
        cwd: 'resources/expand',
        ext: '.css',
        rename: function () {},
        expand: true
      } );

      var expected = [
        {
          'src': [
            './resources/expand/demo-1.less'
          ],
          'dest': './demo-1.css'
        },
        {
          'src': [
            './resources/expand/demo-2.less'
          ],
          'dest': './demo-2.css'
        },
        {
          'src': [
            './resources/expand/demo-3.less'
          ],
          'dest': './demo-3.css'
        }
      ];

      expect( mappings ).to.deep.equal( expected );
    } );

  } );
} );
