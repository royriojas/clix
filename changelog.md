
# clix - Changelog
## v2.0.0
- **Refactoring**
  - better error handling and added helper to create task targets similar to grunt - [4337ad9]( https://github.com/royriojas/clix/commit/4337ad9 ), [royriojas](https://github.com/royriojas), 09/08/2015 22:02:39

    
## v1.1.6
- **Build Scripts Changes**
  - Use clix-logger module for logs, updated dependencies and build scripts - [5950e1b]( https://github.com/royriojas/clix/commit/5950e1b ), [royriojas](https://github.com/royriojas), 07/08/2015 21:39:15

    
## v1.1.5
- **Refactoring**
  - Prevent failing if the `env` variable is not set - [3e7d447]( https://github.com/royriojas/clix/commit/3e7d447 ), [royriojas](https://github.com/royriojas), 12/07/2015 19:24:35

    
## v1.1.4
- **Build Scripts Changes**
  - Update bumpery dep - [d4f5064]( https://github.com/royriojas/clix/commit/d4f5064 ), [royriojas](https://github.com/royriojas), 12/07/2015 19:06:28

    
- **Enhancements**
  - Added the print option to print in gray messages even if `quiet` mode is set - [e1cf344]( https://github.com/royriojas/clix/commit/e1cf344 ), [royriojas](https://github.com/royriojas), 12/07/2015 19:00:14

    
  - Added the print option to print in gray messages even if `quiet` mode is set - [de208f0]( https://github.com/royriojas/clix/commit/de208f0 ), [royriojas](https://github.com/royriojas), 12/07/2015 18:59:42

    
## v1.1.2
#### config
- **Enhancements**
  - config file can be a js module exporting a function - [760d055]( https://github.com/royriojas/clix/commit/760d055 ), [royriojas](https://github.com/royriojas), 03/07/2015 21:45:19

    
## v1.1.1
- **Build Scripts Changes**
  - Add do-changelog npm script entry - [61906eb]( https://github.com/royriojas/clix/commit/61906eb ), [royriojas](https://github.com/royriojas), 03/07/2015 16:28:42

    
## v1.1.0
- **Features**
  - turn off colorized output by default - [f51e5c3]( https://github.com/royriojas/clix/commit/f51e5c3 ), [royriojas](https://github.com/royriojas), 03/07/2015 16:24:24

    **BREAKING CHANGE**: Well not really, but it changes the way it behaved before, aesthetically speaking
    
    To enable the colored output pass the option `colored-ouptut` to the command line like
    
    ```
    ./bin/cli.js --colored-output
    ```
    
## v1.0.7
- **Build Scripts Changes**
  - Change the building scripts to use the cache to only beautify changed files - [660b82b]( https://github.com/royriojas/clix/commit/660b82b ), [Roy Riojas](https://github.com/Roy Riojas), 25/05/2015 04:56:59

    
  - Fix wrong cli bin field - [4c894b8]( https://github.com/royriojas/clix/commit/4c894b8 ), [Roy Riojas](https://github.com/Roy Riojas), 12/03/2015 18:28:38

    
  - Add latest esbeautifier - [1fa1b93]( https://github.com/royriojas/clix/commit/1fa1b93 ), [Roy Riojas](https://github.com/Roy Riojas), 11/03/2015 04:25:21

    
  - Fix dependency url - [acba4af]( https://github.com/royriojas/clix/commit/acba4af ), [Roy Riojas](https://github.com/Roy Riojas), 11/03/2015 04:16:44

    
  - Add validation tasks - [b241ec5]( https://github.com/royriojas/clix/commit/b241ec5 ), [Roy Riojas](https://github.com/Roy Riojas), 11/03/2015 04:01:31

    
- **Features**
  - Add getVersion method the object passed as a callback - [c4b8fbd]( https://github.com/royriojas/clix/commit/c4b8fbd ), [Roy Riojas](https://github.com/Roy Riojas), 13/03/2015 13:04:56

    
  - First commit - [5b43b09]( https://github.com/royriojas/clix/commit/5b43b09 ), [Roy Riojas](https://github.com/Roy Riojas), 11/03/2015 03:57:17

    
- **Bug Fixes**
  - Return the cli instance even if the config option is not provided - [8a1503e]( https://github.com/royriojas/clix/commit/8a1503e ), [Roy Riojas](https://github.com/Roy Riojas), 12/03/2015 19:19:36

    
- **Other changes**
  - Initial commit - [ed5d425]( https://github.com/royriojas/clix/commit/ed5d425 ), [Roy Riojas](https://github.com/Roy Riojas), 11/03/2015 03:21:10

    
