/**
 * TestModel View
 */
define(['jquery', 'underscore', 'backbone', 'backbone.marionette', 'handlebars', 'hbs!templates/backbone_forms/form'],
function ($, _, Backbone, Marionette, Handlebars, tpl) {

  var TestView;

  TestView = Marionette.ItemView.extend({

    /** View's container DOM element CSS class **/
    className: 'check',
    
    /**
     * Wires up the template used to render the view
     * @type {Object}
     */
    template: {
        type : 'handlebars'
      , template: tpl
    },

    /**
     * Wires up events handlers
     * @type {Object}
     */
    events: {
    },

    /**
     * Initializes the view
     * @return  _void_
     */
    initialize: function() {
      this.bindTo(this.model, 'change', this.render);
    }
  });

  /** Exposing the view publicly from the module. */
  return TestView;
});