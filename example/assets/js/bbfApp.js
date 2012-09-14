
define(['jquery', 'underscore', 'backbone', 'backbone.marionette'],
function ($, _, Backbone, Marionette) {

  var bbfApp = new Backbone.Marionette.Application();

   // setting up display regions

  bbfApp.addRegions({
    container: '#container'
  });

  bbfApp.on('start', function(options){

    options = (options || {});

    options.layout.bootstrap();
    options.router.bootstrap();
    
    // _.each(options.subAppsModules.bbfModules, function(subAppModule) {

    //   subAppModule.bootstrap();
    // });

    Backbone.history.start();
  });

  return bbfApp;
});