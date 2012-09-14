// Backbone.Forms v0.1.0
//
// Copyright (c) 2012 Benjamin Aghaeipour
// Distributed under MIT License


(function (factory) {
  if (typeof exports === 'object') {
    module.exports = factory(require('backbone'), require('underscore'));
  } else if (typeof define === 'function' && define.amd) {
    define(['backbone', 'underscore'], factory);
  }
}(function (Backbone, _) {
Backbone.Forms = (function(_){
  'use strict';

  var Forms = (function(){

    

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

    };

  }());

  return Forms;
}(_));
return Backbone.Forms;
}));
/**
 * TestModel
 */

define(['jquery', 'underscore', 'backbone', 'backbone.marionette', 'backbone.forms', 'marionetteHandlebars'],
function ($, _, Backbone, Marionette, Forms, Handlebars) {

  var BBF_FormModel;

  BBF_FormModel = Backbone.Model.extend({
    
  });

  /** Exposing the model publicly from the module. */
  return BBF_FormModel;
});
/**
 * TestModel View
 */
define(['jquery', 'underscore', 'backbone', 'backbone.marionette', 'marionetteHandlebars', 'backbone.forms', 'hbs!templates/backbone_forms/form'],
function ($, _, Backbone, Marionette, Handlebars, Forms, tpl) {

  var BBF_FormView;

  BBF_FormView = Marionette.ItemView.extend({

    /** View's container DOM element CSS class **/
    className: 'form',
    tagName: 'form',
    /**
     * Wires up the template used to render the view
     * @type {Object}
     * @author  Tomislav Capan
     */
    template: {
        type : 'handlebars'
      , template: tpl
    },

    /**
     * Wires up events handlers
     * @type {Object}
     * @author  Tomislav Capan
     */
    events: {
    },

    /**
     * Initializes the view
     * @return  _void_
     * @author  Tomislav Capan
     */
    initialize: function() {
      this.bindTo(this.model, 'change', this.render);
    }
  });

  /** Exposing the view publicly from the module. */
  return BBF_FormView;
});