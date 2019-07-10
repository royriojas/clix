describe('expand-globs', () => {
  // var proxyquire = require('proxyquire');
  it('should expand globs and ignore the given ones', () => {
    const expandGlobs = require('../../lib/expand-globs');

    const files = expandGlobs(['resources/expand/**/*.*', '!resources/expand/**/*.txt'], { resolvePaths: true });
    const path = require('path');

    const expected = [
      'resources/expand/demo-1.js',
      'resources/expand/demo-1.less',
      'resources/expand/demo-2.js',
      'resources/expand/demo-2.less',
      'resources/expand/demo-3.js',
      'resources/expand/demo-3.less',
      // 'resources/expand/sub-folder/sub-sub-1/demo-1.txt',
      'resources/expand/sub-folder/sub-sub-1/demo-2.css',
      'resources/expand/sub-folder/sub-sub-1/demo-3.jpg',
    ].map(file => path.resolve(process.cwd(), file));

    expect(files).to.deep.equal(expected);
  });

  it('should expand globs and ignore the given ones even if the they have different signatures to refer to relative files', () => {
    const expandGlobs = require('../../lib/expand-globs');

    const files = expandGlobs(['./resources/expand/**/*.*', '!resources/expand/**/*.txt'], { resolvePaths: true });
    const path = require('path');

    const expected = [
      'resources/expand/demo-1.js',
      'resources/expand/demo-1.less',
      'resources/expand/demo-2.js',
      'resources/expand/demo-2.less',
      'resources/expand/demo-3.js',
      'resources/expand/demo-3.less',
      // 'resources/expand/sub-folder/sub-sub-1/demo-1.txt',
      'resources/expand/sub-folder/sub-sub-1/demo-2.css',
      'resources/expand/sub-folder/sub-sub-1/demo-3.jpg',
    ].map(file => path.resolve(process.cwd(), file));

    expect(files).to.deep.equal(expected);
  });

  it('should expand globs and ignore the given ones even if the they have different signatures to refer to relative files, inverted', () => {
    const expandGlobs = require('../../lib/expand-globs');

    const files = expandGlobs(['resources/expand/**/*.*', '!./resources/expand/**/*.txt'], { resolvePaths: true });

    const path = require('path');

    const expected = [
      'resources/expand/demo-1.js',
      'resources/expand/demo-1.less',
      'resources/expand/demo-2.js',
      'resources/expand/demo-2.less',
      'resources/expand/demo-3.js',
      'resources/expand/demo-3.less',
      // 'resources/expand/sub-folder/sub-sub-1/demo-1.txt',
      'resources/expand/sub-folder/sub-sub-1/demo-2.css',
      'resources/expand/sub-folder/sub-sub-1/demo-3.jpg',
    ].map(file => path.resolve(process.cwd(), file));

    expect(files).to.deep.equal(expected);
  });

  describe('no resolve', () => {
    it('should expand globs and ignore the given ones', () => {
      const expandGlobs = require('../../lib/expand-globs');

      const files = expandGlobs(['resources/expand/**/*.*', '!resources/expand/**/*.txt']);

      // var path = require( 'path' );

      const expected = [
        './resources/expand/demo-1.js',
        './resources/expand/demo-1.less',
        './resources/expand/demo-2.js',
        './resources/expand/demo-2.less',
        './resources/expand/demo-3.js',
        './resources/expand/demo-3.less',
        // './resources/expand/sub-folder/sub-sub-1/demo-1.txt',
        './resources/expand/sub-folder/sub-sub-1/demo-2.css',
        './resources/expand/sub-folder/sub-sub-1/demo-3.jpg',
      ];

      expect(files).to.deep.equal(expected);
    });

    it('should expand globs and ignore the given ones even if the they have different signatures to refer to relative files', () => {
      const expandGlobs = require('../../lib/expand-globs');

      const files = expandGlobs(['./resources/expand/**/*.*', '!resources/expand/**/*.txt']);

      const expected = [
        './resources/expand/demo-1.js',
        './resources/expand/demo-1.less',
        './resources/expand/demo-2.js',
        './resources/expand/demo-2.less',
        './resources/expand/demo-3.js',
        './resources/expand/demo-3.less',
        // './resources/expand/sub-folder/sub-sub-1/demo-1.txt',
        './resources/expand/sub-folder/sub-sub-1/demo-2.css',
        './resources/expand/sub-folder/sub-sub-1/demo-3.jpg',
      ];

      expect(files).to.deep.equal(expected);
    });

    it('should expand globs and ignore the given ones even if the they have different signatures to refer to relative files, inverted', () => {
      const expandGlobs = require('../../lib/expand-globs');

      const files = expandGlobs(['resources/expand/**/*.*', '!./resources/expand/**/*.txt']);

      const expected = [
        './resources/expand/demo-1.js',
        './resources/expand/demo-1.less',
        './resources/expand/demo-2.js',
        './resources/expand/demo-2.less',
        './resources/expand/demo-3.js',
        './resources/expand/demo-3.less',
        // './resources/expand/sub-folder/sub-sub-1/demo-1.txt',
        './resources/expand/sub-folder/sub-sub-1/demo-2.css',
        './resources/expand/sub-folder/sub-sub-1/demo-3.jpg',
      ];

      expect(files).to.deep.equal(expected);
    });
  });
});
