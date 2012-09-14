/**
 * CFC Backbone application layout module
 */
define(['jquery', 'underscore', 'backbone', 'backbone.marionette', 'marionetteHandlebars', 'bbfApp', 
  'views/TestView', 'models/TestModel','hbs!templates/layout'], 
  function ($, _, Backbone, Marionette, MarionetteHandlebars, bbfApp, TestView, TestModel, tpl) {

  var Layout;

  /**
   * Marionette Layout class definition
   * @type {Backbone.Marionette.Layout}
   */
  Layout = Backbone.Marionette.Layout.extend({

    /** @type {String} 'id' attribute for the view's root HTML element */
    id: 'bbf',

    /**
     * Wires up the template used to render the layout view
     * @type {Object}
     */
    template: {
        type : 'handlebars'
      , template: tpl
    },

    /**
     * Regions (visual content areas) definitions for this layout view
     * @type {Object}
     */
    regions: {
      bbfContent: "#bbf-content"
    },

    /**
     * Initializes the layout view
     * @param   {object} options  Options being passed into this object
     * @return  _void_
     */
    initialize : function (options) {
    },

    showTest: function (options) {
      console.log('hi');
      var testView = new TestView(options);

      this.bbfContent.show(testView);
      //bbfApp.container.show(testView);
    }
    // ----- EVENTS HANDLERS -----

    // ----- PUBLIC METHODS -----
  },
  {
    /**
     * Bootstraps the iVendi appliation layout and triggers the
     * layout rendered event when rendered and displayed.
     * 
     * @return  _void_
     */
    bootstrap : function() {
      bbfApp.addInitializer(function () {
        
        // create layout instance
        var bbfLayout = new Layout();

        // subscribe to bbfLayout's 'show' event to trigger the 'bbfLayout:rendered'
        // on the event aggregator (application level pub/sub mechanism)
        bbfLayout.on('show', function() {
          bbfApp.vent.trigger('bbfLayout:rendered');
        });

        // subscribe to app event agregator's 'layout:rendered' event to
        // render the subapp's layout in main app's main layout region
        bbfApp.vent.bind('bbf:show', function () {
          bbfApp.container.show(bbfLayout);
        });

        bbfApp.vent.bind('bbf:showTest:show', function (testModel){
          bbfApp.container.show(bbfLayout);
          bbfLayout.showTest({ model: testModel});
        });
      });
    }
  });


  /** Exposing the controller object to the outer world */
  return Layout;
});