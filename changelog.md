
# clix - Changelog
## v2.2.1
- **Refactoring**
  - Fix missing module - [22aafc9]( https://github.com/royriojas/clix/commit/22aafc9 ), [Roy Riojas](https://github.com/Roy Riojas), 02/01/2017 06:01:33

    
## v2.2.0
- **Build Scripts Changes**
  - update dev deps - [9b692e8]( https://github.com/royriojas/clix/commit/9b692e8 ), [Roy Riojas](https://github.com/Roy Riojas), 02/01/2017 03:05:44

    
## v2.0.16
- **Build Scripts Changes**
  - updated packages - [6ccf31a]( https://github.com/royriojas/clix/commit/6ccf31a ), [Roy Riojas](https://github.com/Roy Riojas), 31/07/2016 04:15:40

    
## v2.0.15
- **Features**
  - add `ext` and `rename` options similar to grunt.file.expandMapping ones - [7e810d8]( https://github.com/royriojas/clix/commit/7e810d8 ), [Roy Riojas](https://github.com/Roy Riojas), 21/08/2015 03:39:08

    
## v2.0.14
- **Bug Fixes**
  - remove cwd when the path is expanded - [27fbba0]( https://github.com/royriojas/clix/commit/27fbba0 ), [Roy Riojas](https://github.com/Roy Riojas), 21/08/2015 01:13:36

    
## v2.0.13
- **Features**
  - Specify more than one task to run - [08c9ede]( https://github.com/royriojas/clix/commit/08c9ede ), [royriojas](https://github.com/royriojas), 17/08/2015 04:01:57

    
## v2.0.12
- **Enhancements**
  - Add loadConfig method helper to load a configuration file other than the default one - [15107e9]( https://github.com/royriojas/clix/commit/15107e9 ), [royriojas](https://github.com/royriojas), 16/08/2015 00:52:07

    
## v2.0.11
- **Tests Related fixes**
  - Add tasks for get-target - [b9f7df7]( https://github.com/royriojas/clix/commit/b9f7df7 ), [royriojas](https://github.com/royriojas), 16/08/2015 00:39:58

    
## v2.0.10
- **Refactoring**
  - Extend `getTargets` to also resolve the files property using the `expandMapping` method - [81eed95]( https://github.com/royriojas/clix/commit/81eed95 ), [royriojas](https://github.com/royriojas), 15/08/2015 05:56:16

    
## v2.0.9
- **Features**
  - Implement expandMapping similar to the one in grunt - [7c052d8]( https://github.com/royriojas/clix/commit/7c052d8 ), [royriojas](https://github.com/royriojas), 15/08/2015 05:07:57

    
## v2.0.8
- **Build Scripts Changes**
  - Update optionator to get default booleans - [52712d1]( https://github.com/royriojas/clix/commit/52712d1 ), [royriojas](https://github.com/royriojas), 15/08/2015 02:53:39

    
## v2.0.7
- **Features**
  - Add first version of `expandMapping` - [901a1ec]( https://github.com/royriojas/clix/commit/901a1ec ), [royriojas](https://github.com/royriojas), 15/08/2015 01:29:31

    
- **Build Scripts Changes**
  - update `prepush` and `precommit` deps - [41ccee0]( https://github.com/royriojas/clix/commit/41ccee0 ), [royriojas](https://github.com/royriojas), 15/08/2015 01:16:57

    
- **Refactoring**
  - do not resolve paths by default - [8ba8b30]( https://github.com/royriojas/clix/commit/8ba8b30 ), [royriojas](https://github.com/royriojas), 15/08/2015 01:16:29

    If the full paths are needed specify the option `resolvePaths: true`
    
    ```javascript
    var files = cli.expandGlobs(globs, { resolvePaths: true });
    ```
    
  - remove unnecessary try/catch - [30791fa]( https://github.com/royriojas/clix/commit/30791fa ), [royriojas](https://github.com/royriojas), 15/08/2015 00:58:18

    
## v2.0.6
- **Bug Fixes**
  - missing method in cli - [ba16f22]( https://github.com/royriojas/clix/commit/ba16f22 ), [royriojas](https://github.com/royriojas), 14/08/2015 21:33:44

    
## v2.0.5
- **Bug Fixes**
  - missing deps - [d297129]( https://github.com/royriojas/clix/commit/d297129 ), [royriojas](https://github.com/royriojas), 14/08/2015 21:22:32

    
## v2.0.4
- **Features**
  - Add a convenience method to expand globs - [1f3ddf1]( https://github.com/royriojas/clix/commit/1f3ddf1 ), [royriojas](https://github.com/royriojas), 14/08/2015 21:20:25

    
## v2.0.3
- **Build Scripts Changes**
  - update clix dep to get nicer log output - [20af260]( https://github.com/royriojas/clix/commit/20af260 ), [royriojas](https://github.com/royriojas), 11/08/2015 19:30:06

    
## v2.0.2
- **Build Scripts Changes**
  - Update to latest clix-logger - [34e0fd1]( https://github.com/royriojas/clix/commit/34e0fd1 ), [royriojas](https://github.com/royriojas), 11/08/2015 15:55:36

    
## v2.0.1
- **Enhancements**
  - Add name to the returned tasks - [0835297]( https://github.com/royriojas/clix/commit/0835297 ), [royriojas](https://github.com/royriojas), 10/08/2015 00:53:26

    
## v2.0.0
- **Refactoring**
  - better error handling and added helper to create task targets similar to grunt - [4337ad9]( https://github.com/royriojas/clix/commit/4337ad9 ), [royriojas](https://github.com/royriojas), 10/08/2015 00:02:39

    
## v1.1.6
- **Build Scripts Changes**
  - Use clix-logger module for logs, updated dependencies and build scripts - [5950e1b]( https://github.com/royriojas/clix/commit/5950e1b ), [royriojas](https://github.com/royriojas), 07/08/2015 23:39:15

    
## v1.1.5
- **Refactoring**
  - Prevent failing if the `env` variable is not set - [3e7d447]( https://github.com/royriojas/clix/commit/3e7d447 ), [royriojas](https://github.com/royriojas), 12/07/2015 21:24:35

    
## v1.1.4
- **Build Scripts Changes**
  - Update bumpery dep - [d4f5064]( https://github.com/royriojas/clix/commit/d4f5064 ), [royriojas](https://github.com/royriojas), 12/07/2015 21:06:28

    
- **Enhancements**
  - Added the print option to print in gray messages even if `quiet` mode is set - [e1cf344]( https://github.com/royriojas/clix/commit/e1cf344 ), [royriojas](https://github.com/royriojas), 12/07/2015 21:00:14

    
  - Added the print option to print in gray messages even if `quiet` mode is set - [de208f0]( https://github.com/royriojas/clix/commit/de208f0 ), [royriojas](https://github.com/royriojas), 12/07/2015 20:59:42

    
## v1.1.2
#### config
- **Enhancements**
  - config file can be a js module exporting a function - [760d055]( https://github.com/royriojas/clix/commit/760d055 ), [royriojas](https://github.com/royriojas), 03/07/2015 23:45:19

    
## v1.1.1
- **Build Scripts Changes**
  - Add do-changelog npm script entry - [61906eb]( https://github.com/royriojas/clix/commit/61906eb ), [royriojas](https://github.com/royriojas), 03/07/2015 18:28:42

    
## v1.1.0
- **Features**
  - turn off colorized output by default - [f51e5c3]( https://github.com/royriojas/clix/commit/f51e5c3 ), [royriojas](https://github.com/royriojas), 03/07/2015 18:24:24

    **BREAKING CHANGE**: Well not really, but it changes the way it behaved before, aesthetically speaking
    
    To enable the colored output pass the option `colored-ouptut` to the command line like
    
    ```
    ./bin/cli.js --colored-output
    ```
    
## v1.0.7
- **Build Scripts Changes**
  - Change the building scripts to use the cache to only beautify changed files - [660b82b]( https://github.com/royriojas/clix/commit/660b82b ), [Roy Riojas](https://github.com/Roy Riojas), 25/05/2015 06:56:59

    
  - Fix wrong cli bin field - [4c894b8]( https://github.com/royriojas/clix/commit/4c894b8 ), [Roy Riojas](https://github.com/Roy Riojas), 12/03/2015 20:28:38

    
  - Add latest esbeautifier - [1fa1b93]( https://github.com/royriojas/clix/commit/1fa1b93 ), [Roy Riojas](https://github.com/Roy Riojas), 11/03/2015 06:25:21

    
  - Fix dependency url - [acba4af]( https://github.com/royriojas/clix/commit/acba4af ), [Roy Riojas](https://github.com/Roy Riojas), 11/03/2015 06:16:44

    
  - Add validation tasks - [b241ec5]( https://github.com/royriojas/clix/commit/b241ec5 ), [Roy Riojas](https://github.com/Roy Riojas), 11/03/2015 06:01:31

    
- **Features**
  - Add getVersion method the object passed as a callback - [c4b8fbd]( https://github.com/royriojas/clix/commit/c4b8fbd ), [Roy Riojas](https://github.com/Roy Riojas), 13/03/2015 15:04:56

    
  - First commit - [5b43b09]( https://github.com/royriojas/clix/commit/5b43b09 ), [Roy Riojas](https://github.com/Roy Riojas), 11/03/2015 05:57:17

    
- **Bug Fixes**
  - Return the cli instance even if the config option is not provided - [8a1503e]( https://github.com/royriojas/clix/commit/8a1503e ), [Roy Riojas](https://github.com/Roy Riojas), 12/03/2015 21:19:36

    
- **Other changes**
  - Initial commit - [ed5d425]( https://github.com/royriojas/clix/commit/ed5d425 ), [Roy Riojas](https://github.com/Roy Riojas), 11/03/2015 05:21:10

    
