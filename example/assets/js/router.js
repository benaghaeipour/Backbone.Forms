/**
 * Backbone Forms example application
 */

define(['jquery', 'underscore', 'backbone', 'backbone.marionette', 'controller', 'bbfApp'],
function ($, _, Backbone, Marionette, controller, bbfApp) {

  var Router;

  /**
   * Router class with routes definitions and handling functions
   * @type {Backbone.Marionette.AppRouter}
   */
  Router = Backbone.Marionette.AppRouter.extend({

    /**
     * Defines routes handled by this router
     * @type {Object}
     */
    appRoutes: {
      //''          : 'route_default'
      ''          : 'router_showTest'
    }
  },
  {
    /**
     * Bootstraps the bbf appliation router
     * @return  _void_
     */
    bootstrap: function() {
      bbfApp.addInitializer(function () {
        this.router = new Router({ controller: controller });
      });
    }
  });


  /** Exposing the router object to the outer world */
  return Router;
});