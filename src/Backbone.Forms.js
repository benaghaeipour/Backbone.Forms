/*
 * backbone.forms v0.1.0
 * 
 *
 * Copyright (c) 2012 Benjamin Aghaeipour
 * Licensed under the MIT license.
 */

(function (factory) {
  if (typeof exports === 'object') {
    module.exports = factory(require('backbone'), require('underscore'));
  } else if (typeof define === 'function' && define.amd) {
    define(['backbone', 'underscore'], factory);
  }
}(function (Backbone, _) {

  Backbone.Forms = (function(_){

    Forms = (function(){

      

      //Returns public methods of Backbone.Forms
      return {

        //Current version of the library
        version: '0.1.0',

        configure: function(options){

        },

        bind: function(view, options){

        },

        unbind: function(view){

        }

      }

    }());



    return Forms
  }(_));

  return Backbone.Forms;
}));

exports.awesome = function() {
  return 'awesome';
};