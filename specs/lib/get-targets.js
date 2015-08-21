describe( 'get-targets', function () {
  describe( 'when provided a single target', function () {
    it( 'should return the target and merge the options', function () {
      var getTargets = require( '../../lib/get-targets' );
      var targets = getTargets( {
        options: {
          global: true,
          abc: 'global'
        },
        'target-1': {
          options: {
            abc: 'local',
            demo: 'other'
          },
          src: [
            './resources/target/**/*.js'
          ],
          dest: './dest/'
        }
      } );

      var expected = [
        {
          'name': 'target-1',
          'options': {
            'global': true,
            'abc': 'local',
            'demo': 'other'
          },
          'files': [
            {
              'src': [
                './resources/target/demo-1.js',
                './resources/target/demo-2.js',
                './resources/target/demo-3.js',
                './resources/target/sub-folder/sub-sub-1/target-2.js'
              ],
              'dest': './dest/'
            }
          ]
        }
      ];

      expect( targets ).to.deep.equal( expected );
    } );
  } );

  describe( 'when provided 2 targets', function () {
    it( 'should return both targets', function () {
      var getTargets = require( '../../lib/get-targets' );
      var targets = getTargets( {
        options: {
          global: true,
          abc: 'global'
        },
        'target-1': {
          options: {
            abc: 'local',
            demo: 'other'
          },
          src: [
            './resources/target/**/*.js'
          ],
          dest: './dest/'
        },
        'target-2': {
          files: [
            {
              src: [
                'target/**/*',
                '!target/**/*.txt'
              ],
              dest: './dest/',
              cwd: './resources'
            }
          ]
        }
      } );

      var expected = [
        {
          'name': 'target-1',
          'options': {
            'global': true,
            'abc': 'local',
            'demo': 'other'
          },
          'files': [
            {
              'src': [
                './resources/target/demo-1.js',
                './resources/target/demo-2.js',
                './resources/target/demo-3.js',
                './resources/target/sub-folder/sub-sub-1/target-2.js'
              ],
              'dest': './dest/'
            }
          ]
        },
        {
          'name': 'target-2',
          'options': {
            'global': true,
            'abc': 'global'
          },
          'files': [
            {
              'src': [
                './target/demo-1.js',
                './target/demo-1.less',
                './target/demo-2.js',
                './target/demo-2.less',
                './target/demo-3.js',
                './target/demo-3.less',
                './target/sub-folder',
                './target/sub-folder/sub-sub-1',
                //'./target/sub-folder/sub-sub-1/demo-1.txt',
                './target/sub-folder/sub-sub-1/demo-2.css',
                './target/sub-folder/sub-sub-1/demo-3.jpg',
                './target/sub-folder/sub-sub-1/target-2.js'
              ],
              'dest': './dest/',
              'cwd': './resources'
            }
          ]
        }
      ];

      expect( targets ).to.deep.equal( expected );
    } );

    it( 'should return only the filtered task', function () {
      var getTargets = require( '../../lib/get-targets' );
      var targets = getTargets( {
        options: {
          global: true,
          abc: 'global'
        },
        'target-1': {
          options: {
            abc: 'local',
            demo: 'other'
          },
          src: [
            './resources/target/**/*.js'
          ],
          dest: './dest/'
        },
        'target-2': {
          files: [
            {
              src: [
                'target/**/*',
                '!target/**/*.txt'
              ],
              dest: './dest/',
              cwd: './resources'
            }
          ]
        }
      }, 'target-2' );

      var expected = [
        {
          'name': 'target-2',
          'options': {
            'global': true,
            'abc': 'global'
          },
          'files': [
            {
              'src': [
                './target/demo-1.js',
                './target/demo-1.less',
                './target/demo-2.js',
                './target/demo-2.less',
                './target/demo-3.js',
                './target/demo-3.less',
                './target/sub-folder',
                './target/sub-folder/sub-sub-1',
                //'./target/sub-folder/sub-sub-1/demo-1.txt',
                './target/sub-folder/sub-sub-1/demo-2.css',
                './target/sub-folder/sub-sub-1/demo-3.jpg',
                './target/sub-folder/sub-sub-1/target-2.js'
              ],
              'dest': './dest/',
              'cwd': './resources'
            }
          ]
        }
      ];

      expect( targets ).to.deep.equal( expected );
    } );

    it( 'should return only the filtered task with expanded mappings', function () {
      var getTargets = require( '../../lib/get-targets' );
      var targets = getTargets( {
        options: {
          global: true,
          abc: 'global'
        },
        'target-1': {
          options: {
            abc: 'local',
            demo: 'other'
          },
          src: [
            './resources/target/**/*.js'
          ],
          dest: './dest/'
        },
        'target-2': {
          files: [
            {
              src: [
                'target/**/*',
                '!target/**/*.txt'
              ],
              dest: './dest/',
              cwd: './resources',
              expand: true
            }
          ]
        }
      }, 'target-2' );

      var expected = [
        {
          'name': 'target-2',
          'options': {
            'global': true,
            'abc': 'global'
          },
          'files': [
            {
              'src': [
                './resources/target/demo-1.js'
              ],
              'dest': './dest/target/demo-1.js'
            },
            {
              'src': [
                './resources/target/demo-1.less'
              ],
              'dest': './dest/target/demo-1.less'
            },
            {
              'src': [
                './resources/target/demo-2.js'
              ],
              'dest': './dest/target/demo-2.js'
            },
            {
              'src': [
                './resources/target/demo-2.less'
              ],
              'dest': './dest/target/demo-2.less'
            },
            {
              'src': [
                './resources/target/demo-3.js'
              ],
              'dest': './dest/target/demo-3.js'
            },
            {
              'src': [
                './resources/target/demo-3.less'
              ],
              'dest': './dest/target/demo-3.less'
            },
            {
              'src': [
                './resources/target/sub-folder'
              ],
              'dest': './dest/target/sub-folder'
            },
            {
              'src': [
                './resources/target/sub-folder/sub-sub-1'
              ],
              'dest': './dest/target/sub-folder/sub-sub-1'
            },
            {
              'src': [
                './resources/target/sub-folder/sub-sub-1/demo-2.css'
              ],
              'dest': './dest/target/sub-folder/sub-sub-1/demo-2.css'
            },
            {
              'src': [
                './resources/target/sub-folder/sub-sub-1/demo-3.jpg'
              ],
              'dest': './dest/target/sub-folder/sub-sub-1/demo-3.jpg'
            },
            {
              'src': [
                './resources/target/sub-folder/sub-sub-1/target-2.js'
              ],
              'dest': './dest/target/sub-folder/sub-sub-1/target-2.js'
            }
          ]
        }
      ];

      //console.log( JSON.stringify( targets, null, 2 ) );
      expect( targets ).to.deep.equal( expected );
    } );

    it( 'should return only the filtered tasks', function () {
      var getTargets = require( '../../lib/get-targets' );
      var targets = getTargets( {
        options: {
          global: true,
          abc: 'global'
        },
        'target-0': {
          src: 'resources/target/**.jpg',
          dest: 'dest/'
        },
        'target-1': {
          options: {
            abc: 'local',
            demo: 'other'
          },
          src: [
            './resources/target/**/*.js'
          ],
          dest: './dest/'
        },
        'target-2': {
          files: [
            {
              src: [
                'target/**/*',
                '!target/**/*.txt'
              ],
              dest: './dest/',
              cwd: './resources'
            }
          ]
        }
      }, 'target-2, target-1' );

      var expected = [
        {
          'name': 'target-2',
          'options': {
            'global': true,
            'abc': 'global'
          },
          'files': [
            {
              'src': [
                './target/demo-1.js',
                './target/demo-1.less',
                './target/demo-2.js',
                './target/demo-2.less',
                './target/demo-3.js',
                './target/demo-3.less',
                './target/sub-folder',
                './target/sub-folder/sub-sub-1',
                './target/sub-folder/sub-sub-1/demo-2.css',
                './target/sub-folder/sub-sub-1/demo-3.jpg',
                './target/sub-folder/sub-sub-1/target-2.js'
              ],
              'dest': './dest/',
              'cwd': './resources'
            }
          ]
        },
        {
          'name': 'target-1',
          'options': {
            'global': true,
            'abc': 'local',
            'demo': 'other'
          },
          'files': [
            {
              'src': [
                './resources/target/demo-1.js',
                './resources/target/demo-2.js',
                './resources/target/demo-3.js',
                './resources/target/sub-folder/sub-sub-1/target-2.js'
              ],
              'dest': './dest/'
            }
          ]
        }
      ];

      expect( targets ).to.deep.equal( expected );

    } );
  } );
} );
