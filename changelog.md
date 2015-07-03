
# clix - Changelog
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

    
