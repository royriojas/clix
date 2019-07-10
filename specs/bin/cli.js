describe('bin/cli', () => {
  const proxyquire = require('proxyquire')
    .noCallThru()
    .noPreserveCache();

  beforeEach(function be() {
    const me = this;
    me.mainMock = me.sandbox.createSpyObj('main', ['run']);
  });

  it('should launch the main module run method', function t() {
    const me = this;
    const processMock = {
      argv: ['node', './bin/cli', 'src/**/*.js'],
      env: {},
      cwd() {
        return './';
      },
    };

    const argvO = process.argv;
    const envO = process.env;
    const cwdO = process.cwd;

    process.argv = processMock.argv;
    process.env = processMock.env;
    process.cwd = processMock.cwd;

    proxyquire('../../bin/cli', {
      '../src/main': me.mainMock,
    });

    expect(me.mainMock.run.args[0][0].opts._).to.deep.equal(['src/**/*.js']);

    expect(me.mainMock.run).to.have.been.called;

    process.argv = argvO;
    process.cwd = cwdO;
    process.env = envO;
  });
});
