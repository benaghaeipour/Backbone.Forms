// /**
//  * TestModel View
//  */
// define(['jquery', 'underscore', 'backbone', 'backbone.marionette', 'marionetteHandlebars', 'backbone.forms', 'hbs!templates/backbone_forms/form'],
// function ($, _, Backbone, Marionette, Handlebars, Forms, tpl) {

//   var BBF_FormView;

//   BBF_FormView = Marionette.ItemView.extend({

//     /** View's container DOM element CSS class **/
//     className: 'form',
//     tagName: 'form',
//     *
//      * Wires up the template used to render the view
//      * @type {Object}
//      * @author  Tomislav Capan
     
//     template: {
//         type : 'handlebars'
//       , template: tpl
//     },

//     /**
//      * Wires up events handlers
//      * @type {Object}
//      * @author  Tomislav Capan
//      */
//     events: {
//     },

//     /**
//      * Initializes the view
//      * @return  _void_
//      * @author  Tomislav Capan
//      */
//     initialize: function() {
//       this.bindTo(this.model, 'change', this.render);
//     }
//   });

//   /** Exposing the view publicly from the module. */
//   return BBF_FormView;
// });