describe('expand-mapping', () => {
  describe('when passed a data object with `.src` and `.dest` properties', () => {
    it('should convert the passed structure to an array of file mappings', () => {
      const expandMapping = require('../../lib/expand-mapping');

      const mappings = expandMapping({
        src: 'resources/expand/**/*',
        dest: 'dest/',
      });

      const expected = [
        {
          src: [
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
            './resources/expand/sub-folder/sub-sub-1/demo-3.jpg',
          ],
          dest: './dest/',
        },
      ];

      expect(mappings).to.deep.equal(expected);
    });
  });

  describe('when using expand set to true', () => {
    it('should create groups of objects with src and dest', () => {
      const expandMapping = require('../../lib/expand-mapping');

      const mappings = expandMapping({
        src: 'resources/expand/**/*.less',
        dest: 'dest/',
        expand: true,
      });

      const expected = [
        {
          src: ['./resources/expand/demo-1.less'],
          dest: './dest/resources/expand/demo-1.less',
        },
        {
          src: ['./resources/expand/demo-2.less'],
          dest: './dest/resources/expand/demo-2.less',
        },
        {
          src: ['./resources/expand/demo-3.less'],
          dest: './dest/resources/expand/demo-3.less',
        },
      ];

      // console.log(JSON.stringify( mappings, null, 2));
      expect(mappings).to.deep.equal(expected);
    });

    describe('when using cwd', () => {
      it('should remove the cwd part from the matched file', () => {
        const expandMapping = require('../../lib/expand-mapping');

        const mappings = expandMapping({
          src: '**/*.less',
          dest: 'dest/css/',
          cwd: 'resources/expand',
          expand: true,
        });

        const expected = [
          {
            src: ['./resources/expand/demo-1.less'],
            dest: './dest/css/demo-1.less',
          },
          {
            src: ['./resources/expand/demo-2.less'],
            dest: './dest/css/demo-2.less',
          },
          {
            src: ['./resources/expand/demo-3.less'],
            dest: './dest/css/demo-3.less',
          },
        ];

        // console.log( JSON.stringify( mappings, null, 2 ) );
        expect(mappings).to.deep.equal(expected);
      });
    });

    describe('when using ext', () => {
      it('should replace the extension on each destination', () => {
        const expandMapping = require('../../lib/expand-mapping');

        const mappings = expandMapping({
          src: '**/*.less',
          dest: 'dest/css/',
          cwd: 'resources/expand',
          ext: '.css',
          expand: true,
        });

        const expected = [
          {
            src: ['./resources/expand/demo-1.less'],
            dest: './dest/css/demo-1.css',
          },
          {
            src: ['./resources/expand/demo-2.less'],
            dest: './dest/css/demo-2.css',
          },
          {
            src: ['./resources/expand/demo-3.less'],
            dest: './dest/css/demo-3.css',
          },
        ];

        // console.log( JSON.stringify( mappings, null, 2 ) );
        expect(mappings).to.deep.equal(expected);
      });
    });

    describe('when using rename', () => {
      it('should replace the dest with the value returned from the data.rename fn', () => {
        const expandMapping = require('../../lib/expand-mapping');
        const path = require('path');

        const mappings = expandMapping({
          src: '**/*.less',
          dest: 'dest/',
          cwd: 'resources/expand',
          ext: '.css',
          rename(dest, file) {
            return `./${path.join(dest, 'css/', file)}`;
          },
          expand: true,
        });

        const expected = [
          {
            src: ['./resources/expand/demo-1.less'],
            dest: './dest/css/demo-1.css',
          },
          {
            src: ['./resources/expand/demo-2.less'],
            dest: './dest/css/demo-2.css',
          },
          {
            src: ['./resources/expand/demo-3.less'],
            dest: './dest/css/demo-3.css',
          },
        ];

        expect(mappings).to.deep.equal(expected);
      });
    });

    it('should use the default value if no return is provided from rename', () => {
      const expandMapping = require('../../lib/expand-mapping');

      const mappings = expandMapping({
        src: '**/*.less',
        dest: 'dest/',
        cwd: 'resources/expand',
        ext: '.css',
        rename() {},
        expand: true,
      });

      const expected = [
        {
          src: ['./resources/expand/demo-1.less'],
          dest: './dest/demo-1.css',
        },
        {
          src: ['./resources/expand/demo-2.less'],
          dest: './dest/demo-2.css',
        },
        {
          src: ['./resources/expand/demo-3.less'],
          dest: './dest/demo-3.css',
        },
      ];

      expect(mappings).to.deep.equal(expected);
    });

    it('should use the matched name as dest if no destination is provided', () => {
      const expandMapping = require('../../lib/expand-mapping');

      const mappings = expandMapping({
        src: '**/*.less',
        // dest: 'dest/',
        cwd: 'resources/expand',
        ext: '.css',
        rename() {},
        expand: true,
      });

      const expected = [
        {
          src: ['./resources/expand/demo-1.less'],
          dest: './demo-1.css',
        },
        {
          src: ['./resources/expand/demo-2.less'],
          dest: './demo-2.css',
        },
        {
          src: ['./resources/expand/demo-3.less'],
          dest: './demo-3.css',
        },
      ];

      expect(mappings).to.deep.equal(expected);
    });
  });
});
