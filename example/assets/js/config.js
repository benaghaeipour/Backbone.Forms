/**
 * Sets up Require.js configuration for the application:
 */

require.config({

  // Initialize the application main module
  deps: ['main'],

  // Configuring libraries aliases /shortcuts/
  paths: {
      'jquery'                          : 'lib/jquery.min'
    , 'underscore'                      : 'lib/underscore'
    , 'handlebars'                      : 'lib/handlebars'
    , 'backbone'                        : 'lib/backbone'
    , 'backbone.marionette'             : 'lib/backbone.marionette'
    , 'backbone.forms'                  : 'lib/backbone.forms'
    , 'backbone.validation'             : 'lib/backbone.validation'
    , 'backbone.structuredmodelbinder'  : '../../../../Backbone.StructuredModelBinder/src/backbone.structuredmodelbinder'
    , 'marionetteHandlebars'            : 'lib/backbone.marionette.handlebars'
    , 'hbs'                             : 'lib/hbs'
    , 'templates'                       : '../templates'
    , 'PersonalDataOptions'             : 'constants/PersonalDataOptions'
    , 'bbfTemplates'                    : '../templates/backbone_forms'
    , 'jquery.bootstrap'                : 'lib/bootstrap.min' // Twitter Bootstrap + RequireJS -- https://github.com/twitter/bootstrap/pull/534#issuecomment-6438820
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
    'backbone.marionette' : {
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

