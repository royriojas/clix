[![NPM Version](http://img.shields.io/npm/v/clix.svg?style=flat)](https://npmjs.org/package/clix)
[![Build Status](http://img.shields.io/travis/royriojas/clix.svg?style=flat)](https://travis-ci.org/royriojas/clix)

# clix
> A tiny utility to make easy to create command line tools that require a config file in an easy way.
> It uses [optionator](https://www.npmjs.com/package/optionator) to parse the arguments

## Overview

This module aims to make it easy the development of cli commands. It include the following options by default:

- `-h, --help`, useful help message (thanks to optionator).
- `-v, --version`, output the version of the module
- `-q, --quiet`, if the app prints logs using the provided log methods in the returned instance,
  this will suppress the verbose output showing only a summary of the cli execution
- `-c, --config`, path to the configuration file (as json) to be used by this module
- `--colored-output`, wheter to use or not use color in the output messages. `false` by default. **If you do want to enable
  colors without passing this option you can set the environment variable `__CLIX_COLORED_OUTPUT__` to true doing:

  ```bash
  export __CLIX_COLORED_OUTPUT__=true
  ```

## Install

```bash
npm i --save-dev clix
```

## Usage

```javascript
// ./bin/cli.js

#!/usr/bin/env node

var programOptions = {

 // the path to the package json of the current module (used to get the version of the module)
 pkgJSONPath: path.resolve( __dirname, '../package.json' ),

 // if this object is set the -c, --config option will be available
 configFile: {

   // the default name of the configuration file to look for in the process.cwd()
   defaultName: '.esformatter',

   // optionally a default config file can be provided inside the module
   pathToLocalConfig: path.resolve( __dirname, '../configs/esformatter.json' ),

   // the description for the config option. This will be shown in the help
   description: 'Path to your `esformatter` config, if not provided will try to use the `.esformatter` file in your current working directory, if not found will use the one provided with this package'
 },
 // options passed to optionator. Check the optionator page for more info
 // the following is just an example of the configuration used in esbeautifier
 optionator: {
   prepend: 'Usage: esbeautifier [options] glob [glob1] [glob2]..[globN]',
   options: [
     {
       heading: 'Options'
     },
     {
       option: 'checkOnly',
       alias: 'k',
       type: 'Boolean',
       description: 'Will just run the beautifier and report which files need to be beautified'
     },
     {
       option: 'useCache',
       alias: 'u',
       type: 'Boolean',
       description: 'If true, this module will remember the `mtime` and `size` of the beatufied files and only operate on the ones that changed. If false, the cache will be destroyed. Cache will only be kept between executions with the useCache flag set to true.'
     }
   ]
 }
};

// require the clix module
var clix = require( 'clix' );

// if you want to handle the error and call process.exit by yourself
// just provide an onError callback in the clix object
// clix.onError = function (args) {
//   // args.error // <== the error thrown when running the module
//   // handle the error here
// };

// call launch, passing the options
clix.launch( programOptions, function ( program ) {
  // this callback will be called with a program object with the following api
  //
  // program.showHelp() // <== method used to show the generated help if required to do it by other commands
  // program.showVersion() // <== will print the version in the stdout
  // program.getVersion() // <== will return the version of the package
  // program.opts // <== the optionator parsed arguments
  //   for example program.opts.useCache, will be true if the cli was called
  //   doing `cli -useCache=true
  //
  // logging methods
  // program.ok, program.error, program.log, program.subtle, program.success
  // if the option -q, --quiet is used, program.log and program.subtle calls will not print any output
  //
  // program.getConfig() // <== method to get the configuration as JSON from one of the possible paths
  // either the provided one, looking for a file in the current working directory or
  // using a default one distributed with the command line being developed
} );

```

## Changelog

[Changelog](./changelog.md)
