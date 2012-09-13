
define(['jquery', 'underscore', 'backbone', 'backbone.marionette'],
function ($, _, Backbone, Marionette) {

  var bbf = new Backbone.Marionette.Application()

   // setting up display regions

  bbf.addRegions({
    container: '#container'
  });

  bbf.on('start', function(options){
    options = (options || {});

    //bootstrap app

    Backbone.history.start();
  });

  return bbf
} 