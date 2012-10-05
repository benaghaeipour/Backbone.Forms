// Backbone.Forms v0.1.0
//
// Copyright (c) 2012 Benjamin Aghaeipour
// Distributed under MIT License



(function (factory) {
  if (typeof exports === 'object') {
    module.exports = factory(require('jquery'), require('underscore'), require('backbone'), require('handlebars'), require('backbone.validation'), require('backbone.modelbinder'));
  } else if (typeof define === 'function' && define.amd) {
    define(['jquery', 'underscore', 'backbone', 'handlebars', 'backbone.validation', 'backbone.modelbinder'], factory);
  }
}(function ($, _, Backbone, Handlebars, Validation, ModelBinder) {
/*jshint debug:true */

// Form model binding and validation.

Backbone.Forms = (function($, _, Backbone, Handlebars, Validation, ModelBinder){
  'use strict';

  var Forms, defaultValidation, defaultModelBinder, defaultTemplates, defaultOptions = {
    forceUpdate: true,
    selector: 'name',
    labelFormatter: 'sentenceCase',
    valid: function(view, attr, selector){
      console.log('valid');
    },
    invalid: function(view, attr, error, selector){
      console.log('not valid');
    }
  };

  Forms = (function(){

    //Public functions
    var bindModel, unbindModel, eventsCollection, uiCollection, validationCollection, bindingsCollection,
    //Private functions
    _getForms, _getControls, _getEvents, _getValidation, _modelBinder, _getinput;

    _getForms = function(view, model, options){

      var events = {}, compiledForm, forms = view.forms ? view.forms || {} : {};
      eventsCollection = {};
      validationCollection ={};
      uiCollection = {};
      bindingsCollection = {};
      // console.log(Forms.Templates.form);
      // compiledForm = Forms.Templates.compile(Forms.Templates.form);
      // console.log(compiledForm({formfields : 'hi'}));

      _.each(forms, function(form, formId){
        //var formModel, formView;
        var formView, options;
 
        options = Forms.Templates.Elements.form(form, formId);

        bindingsCollection[formId] = {
          selector: options.id,
          bindings: {}
        };

        if(form.controls){
          options.fields = _getControls(form.controls, view, bindingsCollection[formId], form);
        }

        formView = Forms.Templates.form(options);

        //Get events
        if(form.events){
          _getEvents(options.id, form.events);
        }

        $.extend(view.model, {validation : validationCollection});

        view.on('render', function() {

          $(view.el).find('#' + formId + '_container').append(formView);
          //Events can only be bound when template has been rendered

          view.delegateEvents(eventsCollection);
          _modelBinder.bind(view.model, view.el, uiCollection);
        });
      });
    };

    _getControls = function(controls, view, bindings, parentControl){
      var html = "", events, options, controlView, obj;

      _.each(controls, function(control, controlId){
        obj = {};
        controlView = null;

        if(Forms.Templates[control.type]){
          console.log('adding ' + control.type);

          options = Forms.Templates.Elements[control.type](control, controlId, view);

          if(control.multiple){
            debugger;
          }

          if(control.controls){
            options.fields = _getControls(control.controls, view, control);
          }

          if(control.events){
            _getEvents(options.id, control.events);
          }

          if(control.validation && !control.modelIgnore){
            _getValidation(controlId, control.validation);
          }

          if (options.inputs) {
            _.each(options.inputs, function(input, inputId){
              obj[controlId + '_' + input] = '#' + options.inputs[input].id;
            });
          }
          else{
            obj[controlId] = '#' + options.id;
          }
          
          if(!control.modelIgnore){
            $.extend(uiCollection, obj);
          } 

          controlView = Forms.Templates[control.type](options);
        }

        html += controlView;
      });

      return html;
    };

    _getEvents = function(controlId, events){
      var obj;
      _.each(events, function(methodToCall, eventAttribute){
        obj = {};
        obj[eventAttribute + ' #' + controlId] = methodToCall;
        $.extend(eventsCollection, obj);
      });
    };

    _getValidation = function(controlId, validation){
      var obj = {};
      obj[controlId] = validation;
      $.extend(validationCollection, obj);
    };

    //Returns public methods of Backbone.Forms
    return {

      //Current version of the library
      version: '0.1.0',
      bind: function(view, options){

        var model = view.model;

        if(typeof model === 'undefined'){
          throw 'Before you execute the binding your view must have a model\n';
        }

        if(!Forms.Templates.form){
          throw "Templates not loaded";
        }

        this.unbind(view, model);
        console.log('binding');

        options = $.extend({}, defaultOptions, options);
        _modelBinder = new Forms.ModelBinder();

        _getForms(view, view.model, options);

        defaultValidation = Forms.Validation;
        defaultValidation.bind(view, options);
      },

      unbind: function(view, model){
        console.log('unbinding');
      }
    };
  }());

  Forms.Templates = {
    registerTemplates : function(templates){
      _.each(templates, function(template, templateName){
        Forms.Templates.Helpers.createTemplate(templateName, template);
      });
    },
    registerHelpers : function(helpers){
      _.each(helpers, function(helper, helperName){
        Forms.Templates.Helpers.createHelper(helperName, helper);
      });
    },
    registerPartials : function(partials){
      _.each(partials, function(partial, partialName){
        Forms.Templates.Helpers.createPartial(partialName, partial);
      });
    }
  };

  Forms.Templates.Helpers = {
    createTemplate : function(name, template){
      var _templates = Forms.Templates || {};

      _templates[name] = Handlebars.compile(template);
    },
    createHelper : function(name, helper){
      var _helpers = Forms.Templates.Helpers || {};

      _helpers[name] = Handlebars.registerHelper(name, helper);
    },
    createPartial : function(name, partial){
      Handlebars.registerPartial(name, partial);
    }
  };

  Forms.Templates.Partials = {}; 

  Forms.Templates.Elements = {

    _defaults : function(control, controlId){
      var _options = {};
      _options.extras = [];
      _options.elClass = control.elClass;
      _options.name = controlId;
      if(control.label){
        _options.label = control.label;
      }
      return _options;
    },

    _getId : function(options, controlId, prefix) {
      var _options = {};
      _options.prefix = options.prefix || prefix;
      
       return _options.prefix + controlId[0].toUpperCase() + controlId.substring(1, controlId.length);
    },

    form : function(form, formId){
      var _options = this._defaults(form, formId);

      _options.prefix = 'frm';
      _options.id = this._getId(_options, formId);

      return _options;
    },

    fieldset : function(fieldset, fieldsetId){
      var _options = this._defaults(fieldset, fieldsetId);

      _options.prefix = 'fld';
      _options.legend = fieldset.legend;
      _options.id = this._getId(_options, fieldsetId);

      return _options;
    },

    div: function(div, divId){
      var _options = this._defaults(div, divId);

      _options.prefix = 'dv';
      _options.id = this._getId(_options, divId);

      return _options;
    },

    input : function(input, inputId){
      var _options = this._defaults(input, inputId);

      _options.type = input.subType || 'text';

      _options = Forms.Templates.Elements.Inputs[_options.type](_options, input);

      _options.id = this._getId(_options, inputId);
      return _options;
    },

    select : function(select, selectId, view){
      var _options = this._defaults(select, selectId);

      _options.prefix = 'dd';

      if(select.startWith){
        _options.startWith = select.startWith;
      }

      if (_.isArray(select.options)) {
        _options.options = _.map(select.options, function(option) {
          return { value: option, label: option};
        });
      }
      else if (_.isObject(select.options)) {
        _options.options = _.map(_.values(select.options.call()), function(option) {
          return { value: option, label: option};
        });
      }

      _options.id = this._getId(_options, selectId);

      return _options;
    },

    button : function(button, buttonId){
      var _options = this._defaults(button, buttonId);

      button.subType = button.subType || 'button';

      _options = Forms.Templates.Elements.Buttons[button.subType](_options, button);
      _options.type = button.subType;
      _options.text = button.text;
      _options.extras.push({ extraKey : 'name', extraValue : button.value});
      _options.id = this._getId(_options, buttonId);

      return _options;
    }
  };

  Forms.Templates.Elements.Buttons = {
    button : function(options, input){
      var _options = {};

      $.extend(_options, options);
      _options.prefix = 'btn';
      return _options;
    },

    submit : function(options, input){
      var _options = {};

      $.extend(_options, options);
      _options.prefix = 'sbmt';
      return _options;
    },

    reset : function(options, input){
      var _options = {};

      $.extend(_options, options);
      _options.prefix = 'rst';
      return _options;
    }
  };

  Forms.Templates.Elements.Inputs = {

    text : function(options, input){
      var _options = {};

      $.extend(_options, options);
      _options.prefix = 'txt';
      return _options;
    },

    button : function(options, input){
      var _options = {};
      
      $.extend(_options, options);

      _options.prefix = 'btn';
      _options.extras.push({ extraKey : 'value', extraValue : input.value});
      return _options;
    },

    checkbox : function(options, input){
      var _options = {};

      $.extend(_options, options);
      _options.prefix = 'chk';
      return _options;
    },

    hidden : function(options, input){
      var _options = {};

      $.extend(_options, options);
      _options.prefix = 'hdn';
      return _options;
    },

    password : function(options, input){
      var _options = {};

      $.extend(_options, options);
      _options.prefix = 'pwd';
      return _options;
    },

    radio : function(options, input){
      var _options = {};

      $.extend(_options, options);
      _options.prefix = 'rdio';
      return _options;
    },

    reset : function(options, input){
      var _options = {};

      $.extend(_options, options);
      _options.prefix = 'rst';
      return _options;
    },

    submit : function(options, input){
      var _options = {};

      $.extend(_options, options);
      _options.prefix = 'sbmt';
      return _options;
    }
  };

  Forms.Templates.registerTemplates({
      form                  : '<form{{#if id}} id="{{id}}"{{/if}}{{#if elClass}} class="{{elClass}}"{{/if}}>{{{fields}}}</form>'
    , fieldset              : '<fieldset{{#if id}} id="{{id}}"{{/if}}{{#if elClass}} class="{{elClass}}"{{/if}}>{{#if legend}}<legend>{{legend}}</legend>{{/if}}{{{fields}}}</fieldset>'
    , div                   : '<div{{#if id}} id="{{id}}"{{/if}}{{#if elClass}} class="{{elClass}}"{{/if}}>{{{fields}}}</div>'
    , controlGroup          : '<div{{#if id}} id="{{id}}"{{/if}} class="control-group{{elClass}}">{{{fields}}}</div>'
    , controlGroup_controls : '<div class="controls{{elClass}}">{{{fields}}}</div>'
    , label                 : '<label{{#if id}} id="{{id}}"{{/if}} class="control-label{{elClass}}" {{#if for}}for="{{for}}"{{/if}}>{{label}}</label>'
    , input                 : '<input{{#if id}} id="{{id}}"{{/if}}{{#if name}}name={{name}}{{/if}}{{#if elClass}} class="{{elClass}}"{{/if}} type="{{type}}" {{#each extras}} {{extraKey}}={{extraValue}}{{/each}} />'
    , select                : '<select{{#if id}} id="{{id}}"{{/if}}{{#if name}}name={{name}}{{/if}}{{#if elClass}} class="{{elClass}}"{{/if}}{{#each extras}} {{extraKey}}={{extraValue}}{{/each}}>{{#if startWith}}<option value="">{{#startWith}}- - -{{/startWith}}</option>{{/if}}{{#each options}}<option value="{{value}}">{{label}}</option>{{/each}}</select>'
    , button                : '<button{{#if id}} id="{{id}}"{{/if}}{{#if name}}name={{name}}{{/if}} class="{{elClass}}" type={{type}}{{#each extras}} {{extraKey}}={{extraValue}}{{/each}}>{{text}}</button>'
    , pTag                  : '<p{{#if id}} id="{{id}}"{{/if}}{{#if elClass}} class="{{elClass}}"{{/if}}>{{text}}</p>'
  });

  Forms.Validation = Validation;

  Forms.Validation.Helpers = {
    //findControl : function(control, controlId){
      // if(control[controlId]) {}
      //   return control[controlId];
      // }
      // if(control.controls){
      //   return findControl;
      // }
    //}
  };

  Forms.ModelBinder = ModelBinder;

  return Forms;
}($, _, Backbone, Handlebars, Validation, ModelBinder));

  return Backbone.Forms;
}));