require([
    'bbfApp', 'jquery'
], function (bbfApp, $) {

  // start the application
  var options = {};

  bbfApp.start(options);

  // finally, expose application object by attaching it to window object
  window.bbfApp = bbfApp;

});