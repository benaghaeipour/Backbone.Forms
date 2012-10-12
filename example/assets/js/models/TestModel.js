/**
 * TestModel
 */

define(['jquery', 'underscore', 'backbone', 'backbone.marionette', 'backbone.forms', 'marionetteHandlebars'],
function ($, _, Backbone, Marionette, Forms, MarionetteHandlebars) {

  var TestModel;

  TestModel = Backbone.Model.extend({
    // defaults:{
    //   name: 'Benjamin', 
    //   age: '25',
    //   attr:{
    //     eyes: 'blue',
    //     hair: 'brown'
    //   }
    // }
  });

  /** Exposing the model publicly from the module. */
  return TestModel;
});