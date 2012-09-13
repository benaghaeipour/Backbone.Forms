/**
 * Sets up Require.js configuration for the application:
 * @author  Tomislav Capan
 */

require.config({

  // Initialize the application main module or test runner
  // (a clever test detection trick picked up from srchr-demo => https://github.com/rmurphey/srchr-demo/blob/master/app/config.js )
  deps: ['main'],

  // Configuring libraries aliases /shortcuts/
  paths: {
      'jquery'                : 'lib/jquery.min'
    , 'underscore'            : 'lib/underscore'
    , 'Handlebars'            : 'lib/Handlebars'
    , 'backbone'              : 'lib/backbone'
    , 'backbone.marionette'   : 'lib/backbone.marionette'
    , 'backbone.validation'   : 'lib/backbone.validation'
    , 'backbone.modelbinder'  : 'lib/backbone.modelbinder' 
    , 'marionetteHandlebars'  : 'lib/backbone.marionette.handlebars'
    , 'hbs'                   : 'lib/hbs'
    , 'templates'             : '../templates'
    , 'jquery.bootstrap'      : 'lib/bootstrap.min' // Twitter Bootstrap + RequireJS -- https://github.com/twitter/bootstrap/pull/534#issuecomment-6438820
  },

  // configuring require.js handlebars plugin
  // https://github.com/SlexAxton/require-handlebars-plugin
  hbs: {
      disableI18n : true
    , templateExtension : 'html'
  },

  // loading non-modular dependencies up-front via shims
  shim : {
    'underscore' : {
        exports : '_'
    },
    'backbone' : {
        deps    : ['underscore', 'jquery']
      , exports : 'Backbone'
    },
    'marionette' : {
        deps    : ['backbone']
      , exports : 'Backbone.Marionette'
    },
    'jquery.bootstrap' : {
      deps      : ['jquery']
      , exports : 'jquery'
    }
  }
});

require(['jquery', 'jquery.bootstrap'], function($) {});

