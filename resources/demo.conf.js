module.exports = function (clix) {
  clix.subtle('opts', clix.opts);
  return {
    options: {
      //banner: opts.banner
    },
    target1: {
      src: './some-file.js',
      dest: './some-file.out.js'
    }
  };
};
