module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    pkg: '<json:package.json>',

    test: {
      files: ['test/**/*.js']
    },

    // Configuration for javascript build process.Options apply from r.js
    // see https://github.com/jrburke/r.js/blob/master/build/example.build.js
    requirejs: {
      mainConfigFile  : "example/assets/js/config.js",  /* Include the main configuration file */
      out             : "example/temp/application.js",  /* Output file */
      name            : "config",                       /* Root application module */
      wrap            : false,                          /* Do not wrap everything in an IIFE */
      optimize        : "none",                         /* JS-optimization on build: 'none' or 'uglify' supported via Node */
      insertRequire   : ['main']
    },

    // The concatenate task merges require.js/almond and other dependencies (templates) into the application code.
    concat: {
      dist: {
        src: ['lib/almond.js'                 /* choosing almond as we have everything preoptimized and built into the single file */
          , 'example/temp/application.js'     /* templates will be built into app file via RequireJS require-s */
        ],
        dest: "example/assets/js/application.js",
        separator: ";"
      }
    },

    clean: {
      debug: 'example/temp/*'
    },

    replace: {
      debug: {
        src: 'example/index.html',
        dest: 'example/index.html',
        variables: {
          appScriptTag : '<script src="assets/js/application.js"></script>'
        }
      }
    },

    less: {
      build: {
        options: {
          paths: ['example/assets/less']
        },
        files: {
          'example/assets/css/backbone.forms.css' : 'example/assets/less/styles.less'
        }
      }
    }

    lint: {
      files: ['grunt.js', 'lib/**/*.js', 'test/**/*.js', 'src/**/*.js']
    },

    watch: {
      files: '<config:lint.files>',
      tasks: 'default'
    },

    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        node: true
      },

      globals: {
        exports: true
      }

    }
  });

  grunt.loadNpmTasks('grunt-contrib');
  grunt.loadNpmTasks('grunt-requirejs');
  grunt.loadNpmTasks('grunt-replace');

  grunt.registerTask('')
  // Default task.
  grunt.registerTask('default', 'lint test');

};