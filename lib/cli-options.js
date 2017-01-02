'use strict';
var optionator = require( 'optionator' );
var extend = require( 'extend' );
var fs = require( 'fs' );
var nodeProcess = require( './process' );
var readJSON = require( 'read-json-sync' );

var path = require( 'path' );

var getOptions = function ( cliOptions ) {

  var optionatorOptions = extend( true, cliOptions.optionator, {
    concatRepeatedArrays: true,
    mergeRepeatedObjects: true
  } );

  optionatorOptions.options = optionatorOptions.options || [ ];

  optionatorOptions.options = optionatorOptions.options.concat( {
    option: 'help',
    alias: 'h',
    type: 'Boolean',
    description: 'Show this help'
  }, {
    option: 'version',
    alias: 'v',
    type: 'Boolean',
    description: 'Outputs the version number'
  }, {
    option: 'quiet',
    alias: 'q',
    type: 'Boolean',
    default: 'false',
    description: 'Show only the summary info'
  }, {
    option: 'colored-output',
    type: 'Boolean',
    description: 'Use colored output in logs'
  }, {
    option: 'stack',
    type: 'Boolean',
    description: 'if true, uncaught errors will show the stack trace if available'
  } );

  var configFile = cliOptions.configFile;
  if ( configFile ) {
    var configOption = {
      option: 'config',
      alias: 'c',
      type: 'String',
      description: configFile.description
    };

    optionatorOptions.options.push( configOption );
  }

  return optionator( optionatorOptions );
};

module.exports = function ( cliOptions, processArgsv, processEnv ) {

  var options = getOptions( cliOptions );

  var opts = options.parse( processArgsv );
  processEnv = processEnv || { };

  if ( processEnv.__CLIX_COLORED_OUTPUT__ === 'true' ) {
    opts.coloredOutput = true;
  }

  var cli = {
    showHelp: function () {
      console.log( options.generateHelp() );
    },
    getVersion: function () {
      if ( !this.version ) {
        this.version = readJSON( cliOptions.pkgJSONPath ).version;
      }
      return this.version;
    },
    showVersion: function () {
      // what to do if the pkgJSONPath is not passed?
      this.ok( (cliOptions.cliName ? cliOptions.cliName + ' ' : '') + 'version: ' + this.getVersion() );
    }
  };

  extend( cli, require( 'clix-logger' )( opts ) );

  var configFile = cliOptions.configFile;
  var pathToConfig;

  cli.loadConfig = function ( pathToFile ) {
    if ( !pathToFile ) {
      throw new Error( 'Error loading file', pathToFile );
    }
    var cfg;
    cli.subtle( 'Config:', pathToFile );

    try {
      if ( path.extname( pathToFile ) === '.js' ) {
        cli.subtle( 'requiring...', pathToFile );
        cfg = require( pathToFile );
        if ( typeof cfg === 'function' ) {
          cfg = cfg( cli );
        }
      } else {
        // attempt to read it as JSON
        cfg = readJSON( pathToFile );
      }
    } catch (ex) {
      throw new Error( 'Error loading file ' + pathToFile + ', Error: ' + ex.message );
    }
    return cfg;
  };

  if ( configFile ) {
    // if we have a config file
    // use it. We assume is relative to the current working directory
    if ( opts.config ) {
      pathToConfig = path.resolve( nodeProcess.cwd(), opts.config );
    } else {
      if ( configFile.defaultName ) {
        var localConfig = path.resolve( nodeProcess.cwd(), configFile.defaultName );
        if ( fs.existsSync( localConfig ) ) {
          pathToConfig = localConfig;
        }
      }
      if ( !pathToConfig && configFile.pathToLocalConfig ) {
        pathToConfig = configFile.pathToLocalConfig;
      }
    }

    cli.pathToConfig = pathToConfig;

    cli.getConfig = function () {
      return this.loadConfig( pathToConfig );
    };
  }

  cli.opts = opts;

  cli.expandGlobs = require( './expand-globs' );
  cli.getTargets = require( './get-targets' );

  return cli;
};
