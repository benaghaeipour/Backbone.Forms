/**
 * Backbone application controller module
 */

define(['jquery', 'underscore', 'backbone', 'backbone.marionette', 'bbfApp', 'models/TestModel'],
  function ($, _, Backbone, Marionette, bbfApp, TestModel){

  var Controller;

  /**
   * A controller is just a hash-object of functions that get mapped to the router via constructor
   * @type {Object}
   */
  Controller = {
    
    /**
     * iVendi subapp default route
     * @return _void_
     */
    route_default: function () {
      bbfApp.vent.trigger("bbf:show");
    },

    router_showTest: function() {
      var showTest = new TestModel();
      bbfApp.vent.trigger("bbf:showTest:show", showTest);
    }
  };


  /** Exposing the controller object to the outer world */
  return Controller;
});