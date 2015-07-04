module.exports = function (opts) {
  console.log('opts', opts);
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
