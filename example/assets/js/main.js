require(['bbfApp', 'jquery', 'layout', 'router'], 
  function (bbfApp, $, layout, router) {

  // start the application
  var options = {
      layout : layout
    , router : router
    // subAppsModules : {
    //   bbfModules : [layout, router]
    // }
  };
  
  bbfApp.start(options);
  // finally, expose application object by attaching it to window object
  window.bbfApp = bbfApp;
});