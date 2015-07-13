'use strict';
var optionator = require( 'optionator' );
var extend = require( 'extend' );
var fs = require( 'fs' );
var nodeProcess = require( './process' );
var readJSON = require( 'read-json-sync' );

var path = require( 'path' );
var sFormat = require( 'stringformat' );

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
      this.ok( this.getVersion() );
    }
  };

  extend( cli, require( './clix-console' )( opts ) );

  var configFile = cliOptions.configFile;
  var pathToConfig;

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
      if ( !pathToConfig ) {
        throw new Error( 'Error loading the config file' );
      }
      var cfg;
      cli.subtle( 'Config:', pathToConfig );

      try {
        if ( path.extname( pathToConfig ) === '.js' ) {
          cli.subtle( 'attempting to require the configuration file', pathToConfig );
          cfg = require( pathToConfig );
          if ( typeof cfg === 'function' ) {
            cfg = cfg( cli );
          }
        } else {
          // attempt to read it as JSON
          cfg = readJSON( pathToConfig );
        }
      } catch (ex) {
        throw new Error( sFormat( 'Error loading config {0}, Error: {1}', pathToConfig, ex.message ) );
      }
      return cfg;
    };
  }
  cli.opts = opts;
  return cli;
}; //optionator(  );
