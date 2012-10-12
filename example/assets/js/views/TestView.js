/**
 * TestModel View
 */

define(['jquery', 'underscore', 'backbone', 'backbone.marionette', 'marionetteHandlebars', 'backbone.forms', 'bbfApp', 'PersonalDataOptions', 'hbs!templates/testview'],
function ($, _, Backbone, Marionette, MarionetteHandlebars, Forms, bbfApp, PersonalDataOptions, tpl) {

  var TestView;

  

  TestView = Marionette.ItemView.extend({
    /** View's container DOM element CSS class **/
    className: 'check',
    tagName: 'section',

    /**
     * Wires up the template used to render the view
     * @type {Object}
     */
    template: {
        type : 'handlebars'
      , template: tpl
    },

    forms: {
      appForm1: {
        elClass : " one",
        controls: {
          aDiv: {
            type: 'div',
            modelIgnore: true,
            controls: {
              personal: {
                type: 'fieldset',
                legend: 'Woop',
                controls: {
                  name: {
                    type: 'input',
                    label: "Name",
                    subType: 'text',
                    html: {
                      "data-model": "72"
                    },
                    events: {
                      'focus' : "focus1"
                    },
                    validation: {
                      required: true,
                      msg: "ERRROR"
                    }
                  },
                  // timeatbank: {
                  //   type: 'doubleInput',
                  //   label: "Time at bank",
                  //   inputs: {
                  //     years: {
                  //       addOn: 'yrs',
                  //       elClass: 'input-tiny',
                  //       placeholder: 0,
                  //       type: 'text'
                  //     },
                  //     months: {
                  //       addOn: 'mths',
                  //       elClass: 'input-tiny',
                  //       placeholder: 0,
                  //       type: 'text'
                  //     }
                  //   }
                  // },
                  title: {
                    type: 'select',
                    options: function() {return PersonalDataOptions.Titles;},
                    startWith: '- - -',
                    events: {
                      'change' : function() {alert('hi');}
                    }
                  }
                }
              },
              submit: {
                type: 'button',
                text: 'submit',
                modelIgnore: true,
                events: {
                  "click" : "validator"
                }
              }
            }
          }
        },
        events: {
          
        }
      }
    },

    /**
     * Initializes the view
     * @return  _void_
     */
    initialize: function() {
      Forms.init();

      $.extend(Forms.Templates.Elements.Inputs, {
        date: function(options, input){
          var _options = {};

          $.extend(_options, options);
          _options.prefix = 'dte';
          return _options;
        }
      });

      $.extend(Forms.Templates.Elements, {
        // doubleInput : function(double, doubleId){
        //   var that = this, _options = this.Helper.getDefaults(double, doubleId);

        //   _options.inputs = [];

        //   _.each(double.inputs, function(input, inputId){

        //     _options.inputs[inputId] = input;
        //     _options.inputs[inputId].id = that._getId(_options, inputId, 'txt');
        //     _options.inputs.push(inputId);
        //   });
        //   return _options;
        // }
      });

      Forms.Templates.registerPartials({
        tb_form:        '<form{{#if id}} id="{{id}}"{{/if}} class="form-horizontal{{elClass}}">{{{controls}}}</form>',
        tb_input:       '<div{{#if id}} id="{{id}}_control-group"{{/if}} class="control-group">\
                           {{#if label}}<label{{#if id}} id="{{id}}_label"{{/if}} class="control-label" {{#if id}}for="{{id}}"{{/if}}>{{label}}</label>{{/if}}\
                           <div class="controls">\
                             <input{{#if id}} id="{{id}}"{{/if}}{{#if name}} name={{name}}{{/if}}{{#if elClass}} class="{{elClass}}"{{/if}} type="{{type}}" {{#each attrs}}{{key}}="{{value}}"{{/each}} />\
                           </div>\
                         </div>',
        tb_select:      '<div{{#if id}} id="{{id}}_control-group"{{/if}} class="control-group">\
                          {{#if label}}<label{{#if id}} id="{{id}}_label"{{/if}} class="control-label" {{#if id}}for="{{id}}"{{/if}}>{{label}}</label>{{/if}}\
                          <div class="controls">\
                            <select{{#if id}} id="{{id}}"{{/if}}{{#if name}} name={{name}}{{/if}}{{#if elClass}} class="{{elClass}}"{{/if}}{{#each extras}} {{extraKey}}={{extraValue}}{{/each}}><option value="">{{startWith}}</option>{{#each options}}<option value="{{value}}">{{label}}</option>{{/each}}</select>\
                          </div>\
                        </div>',
        tb_doubleInput: '<div class="control-group">\
                          {{#if label}}<label{{#if id}} id="{{inputs.0.id}}_label"{{/if}} class="control-label">{{label}}</label>{{/if}}\
                          <div class="controls">\
                            <div class="input-append">\
                              <input id="{{{getInput inputs 0 "id"}}}"{{#if name}} name={{name}}{{/if}}{{#if elClass}} class="{{elClass}}"{{/if}} type="{{type}}" {{#each extras}} {{extraKey}}={{extraValue}}{{/each}} />\
                              <span class="add-on">yrs</span>\
                            </div>\
                            <div class="input-append">\
                              <input id="{{{getInput inputs 1 "id"}}}"{{#if name}} name={{name}}{{/if}}{{#if elClass}} class="{{elClass}}"{{/if}} type="{{type}}" {{#each extras}} {{extraKey}}={{extraValue}}{{/each}} />\
                              <span class="add-on">mo</span>\
                            </div>\
                          </div>\
                        </div>'
      });

      Forms.Templates.registerTemplates({
        form : '{{> tb_form }}',
        input : '{{> tb_input }}',
        select : '{{> tb_select }}',
        doubleInput: '{{> tb_doubleInput }}'
      });

      Forms.Templates.registerHelpers({
        getInput : function(obj, id, prop){
          return obj[obj[id]][prop];
        }
      });

      Forms.bind(this, {forceUpdate: true});

    },

    onRender: function(){
      console.log('rendered');
    },

    clickey1: function(e){
      console.log('clicked - 1');
    },

    focus1: function(e){
      console.log('focused - 1');
    },

    validator: function(e){
      debugger;
      this.model.validate();
      console.log(this.model.isValid());
    }
  });

  /** Exposing the view publicly from the module. */
  return TestView;
});