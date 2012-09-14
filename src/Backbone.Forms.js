Backbone.Forms = (function(_){
  'use strict';

  var Forms, defaultOptions = {
      forceUpdate: false,
      selector: 'name',
      labelFormatter: 'sentenceCase',
      valid: Function.prototype,
      invalid: Function.prototype
  };

  Forms = (function(){

    //Returns public methods of Backbone.Forms
    return {

      //Current version of the library
      version: '0.1.0',

      configure: function(options){
        _.extend(defaultOptions, options);
      },

      bind: function(view, options){

      },

      unbind: function(view){

      }

    };

  }());

  return Forms;
}(_));