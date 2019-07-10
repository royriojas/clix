'use strict';
const optionator = require('optionator');
const fs = require('fs');
const readJSON = require('read-json-sync');
const { merge } = require('lodash');

const path = require('path');

const getOptions = cliOptions => {
  const optionatorOptions = merge(cliOptions.optionator, {
    concatRepeatedArrays: true,
    mergeRepeatedObjects: true,
  });

  optionatorOptions.options = optionatorOptions.options || [];

  optionatorOptions.options = optionatorOptions.options.concat(
    {
      option: 'help',
      alias: 'h',
      type: 'Boolean',
      description: 'Show this help',
    },
    {
      option: 'version',
      alias: 'v',
      type: 'Boolean',
      description: 'Outputs the version number',
    },
    {
      option: 'quiet',
      alias: 'q',
      type: 'Boolean',
      default: 'false',
      description: 'Show only the summary info',
    },
    {
      option: 'colored-output',
      type: 'Boolean',
      description: 'Use colored output in logs',
    },
    {
      option: 'stack',
      type: 'Boolean',
      description: 'if true, uncaught errors will show the stack trace if available',
    },
  );

  const configFile = cliOptions.configFile;
  if (configFile) {
    const configOption = {
      option: 'config',
      alias: 'c',
      type: 'String',
      description: configFile.description,
    };

    optionatorOptions.options.push(configOption);
  }

  return optionator(optionatorOptions);
};

module.exports = (cliOptions, processArgsv, processEnv) => {
  const options = getOptions(cliOptions);

  const opts = options.parse(processArgsv);
  processEnv = processEnv || {};

  if (processEnv.__CLIX_COLORED_OUTPUT__ === 'true') {
    opts.coloredOutput = true;
  }

  const loggerInstance = require('clix-logger')(opts);

  const cli = merge(
    {
      showHelp() {
        console.log(options.generateHelp());
      },
      getVersion() {
        if (!this.version) {
          this.version = readJSON(cliOptions.pkgJSONPath).version;
        }
        return this.version;
      },
      showVersion() {
        // what to do if the pkgJSONPath is not passed?
        this.ok(`${cliOptions.cliName ? `${cliOptions.cliName} ` : ''}version: ${this.getVersion()}`);
      },
    },
    loggerInstance,
  );

  const configFile = cliOptions.configFile;
  let pathToConfig;

  cli.loadConfig = function loadConfig(pathToFile) {
    if (!pathToFile) {
      throw new Error('Error loading file', pathToFile);
    }
    let cfg;
    cli.subtle('Config:', pathToFile);

    try {
      if (path.extname(pathToFile) === '.js') {
        cli.subtle('requiring...', pathToFile);
        cfg = require(pathToFile);
        if (typeof cfg === 'function') {
          cfg = cfg(cli);
        }
      } else {
        // attempt to read it as JSON
        cfg = readJSON(pathToFile);
      }
    } catch (ex) {
      throw new Error(`Error loading file ${pathToFile}, Error: ${ex.message}`);
    }
    return cfg;
  };

  if (configFile) {
    const nodeProcess = require('./process');
    // if we have a config file
    // use it. We assume is relative to the current working directory
    if (opts.config) {
      pathToConfig = path.resolve(nodeProcess.cwd(), opts.config);
    } else {
      if (configFile.defaultName) {
        const localConfig = path.resolve(nodeProcess.cwd(), configFile.defaultName);
        if (fs.existsSync(localConfig)) {
          pathToConfig = localConfig;
        }
      }
      if (!pathToConfig && configFile.pathToLocalConfig) {
        pathToConfig = configFile.pathToLocalConfig;
      }
    }

    cli.pathToConfig = pathToConfig;

    cli.getConfig = function getConfig() {
      return this.loadConfig(pathToConfig);
    };
  }

  cli.opts = opts;

  cli.expandGlobs = require('./expand-globs');
  cli.getTargets = require('./get-targets');

  return cli;
};
