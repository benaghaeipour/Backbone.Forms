/*jshint debug:true */

// Forms model binding and validation.
Backbone.Forms = (function($, _, Backbone, Handlebars, BBValidation, BBModelBinder){

  var Forms = {};
  
  //Forms
  Forms = function(options){
    this.defaultOptions = options || {};
  };
  _.extend(Forms, {
    //Objects
    Helpers: {},
    Templates: {},
    Validation: {},
    ModelBinder: {},
    
    //Functions
    build: function(view, model, options){

      var that = this
        , events = {}
        , compiledForm
        , forms
      ;

      view = view || this._view;
      model = model || this._model;
      options = options || this._options;
      forms = view.forms || {};

      _.each(forms, function(form, formName){
        var tmplParams = Forms.Templates.Elements.form(form, formName);
        tmplParams.id = formName;

        if(form.controls){
          that._addBindingsCollection('#' + tmplParams.id, [formName], false);
          tmplParams.controls = that._getControls(form.controls, [formName]);
        }

        //Get events
        that._getEvents(form, formName);

        $.extend(view.model, {validation : that._validationCollection});
        
        view.on('render', function() {

          $(view.el).find('#' + formName + '_container').append(Forms.Templates.form(tmplParams));

          //Events can only be bound when template has been rendered
          view.delegateEvents(that._eventsCollection);

          Forms.ModelBinder.bind(view.model, view.el, that._bindingsCollection);
          debugger;
        });
      });
    },
    
    _addBindingsCollection: function(selector, objPath, ignore){
      var objPathClone = objPath.slice(0), obj = this.Helpers.getPath(this._bindingsCollection, objPathClone);
      _.extend(obj, { selector: selector, bindings: {}, ignore: ignore || false});
    },

    _addBindingsValue: function(selector, value, objPath, ignore){
      var objPathClone = objPath.slice(0), obj = this.Helpers.getPath(this._bindingsCollection, objPathClone);
      _.extend(obj, { selector: selector, value: value, ignore: ignore || false});
    },

    _getControls: function(controls, parents){
      var that = this
        , view = this._view
        , html = ""
      ;

      _.each(controls, function(control, controlName){
        var controlView
          , tmplParams
          , _parents =  parents.slice(0)
        ;

        if(Forms.Templates[control.type]){
          console.log('adding ' + control.type);

          tmplParams = Forms.Templates.Elements[control.type](control, controlName);
          tmplParams.id = that.Helpers.underscoreArray(_parents) + controlName;

          _parents.push(controlName);

          if(control.controls){
            that._addBindingsCollection('#' + tmplParams.id, _parents, control.modelIgnore);
            tmplParams.controls = that._getControls(control.controls, _parents);
          }else{
            that._addBindingsValue('#' + tmplParams.id, tmplParams.value, _parents, control.modelIgnore);
          }

          that._getEvents(control, tmplParams.id);
          that._getValidation(control, controlName, parents);

          controlView = Forms.Templates[control.type](tmplParams);

          html += controlView;
        }        
      });

      return html;
    },

    _getEvents: function(control, controlName){
      var that = this;
      if(control.events){
        _.each(control.events, function(methodToCall, eventAttribute){
          var obj = {};
          obj[eventAttribute + ' #' + controlName] = methodToCall;
          _.extend(that._eventsCollection, obj);
        });
      }
    },

    _getValidation: function(control, controlName, controlPath){
      if(control.validation && !control.modelIgnore){
        var obj = {};
        obj[controlName] = control.validation;
        _.extend(this._validationCollection, obj);
      }
    },

    init: function(){
      console.log('initialise');
      
      //Adds the defaults templates to the BB.Forms
      Forms.Templates.init(); 
      
      //Then checks they are there
      if(!Forms.Templates.form){  
        throw "Templates not loaded";
      }
    },

    bind: function(view, options){
      var model = view.model;

      if(typeof model === 'undefined'){
        throw 'Before you execute the binding your view must have a model\n';
      }

      this.unbind();
      //Save view, model, and options on BB.Forms
      this._view = view;
      this._model = model;
      this._options = options;

      //Create BB.Forms collections 
      this._eventsCollection = {};
      this._validationCollection ={};
      this._bindingsCollection = {};

      this.build();

      //Bind the validation events to the model
      this.Validation.bind(view, options);
    },

    unbind: function(){
      //unbind using this._view and this._model
      console.log('unbinding');
    }
  });

  //Form Helpers
  _.extend(Forms.Helpers, {
    getPath: function(objectModel, dotAttrs){
      var key = dotAttrs[0];
      
      if(objectModel[key] && dotAttrs.length > 1 && _.isObject(objectModel[key])){
        dotAttrs.splice(0, 1);
        return this.getPath(objectModel[key], dotAttrs);
      }else if(!objectModel[key] && objectModel.bindings){
        return this.getPath(objectModel.bindings, dotAttrs);
      }else if(!objectModel[key]){
        objectModel[key] = {};
        return this.getPath(objectModel, dotAttrs);
      }else{
        return objectModel[key];
      }
    },
    underscoreArray: function(array){
      var underscores = "";
      _.each(array, function(controlName){
        underscores += controlName + '_';
      });
      return underscores;
    }
  });

  //Templates
  _.extend(Forms.Templates, {
    //Objects
    Helpers: {},
    Partials: {},
    Elements: {},

    //Functions
    registerTemplates: function(templates){
      _.each(templates, function(template, templateName){
        Forms.Templates.Helpers.createTemplate(templateName, template);
      });
    },
    registerHelpers: function(helpers){
      _.each(helpers, function(helper, helperName){
        Forms.Templates.Helpers.createHelper(helperName, helper);
      });
    },
    registerPartials: function(partials){
      _.each(partials, function(partial, partialName){
        Forms.Templates.Helpers.createPartial(partialName, partial);
      });
    },
    init: function(){
      this.registerTemplates({
          form                  : '<form{{#if id}} id="{{id}}"{{/if}}{{#if elClass}} class="{{elClass}}"{{/if}}>{{{controls}}}</form>'
        , fieldset              : '<fieldset{{#if id}} id="{{id}}"{{/if}}{{#if elClass}} class="{{elClass}}"{{/if}}>{{#if legend}}<legend>{{legend}}</legend>{{/if}}{{{controls}}}</fieldset>'
        , div                   : '<div{{#if id}} id="{{id}}"{{/if}}{{#if elClass}} class="{{elClass}}"{{/if}}>{{{controls}}}</div>'
        , label                 : '<label{{#if id}} id="{{id}}"{{/if}} class="control-label{{elClass}}" {{#if for}}for="{{for}}"{{/if}}>{{label}}</label>'
        , input                 : '<input{{#if id}} id="{{id}}"{{/if}}{{#if name}}name={{name}}{{/if}}{{#if elClass}} class="{{elClass}}"{{/if}} type="{{type}}" {{#each extras}} {{extraKey}}={{extraValue}}{{/each}} />'
        , select                : '<select{{#if id}} id="{{id}}"{{/if}}{{#if name}}name={{name}}{{/if}}{{#if elClass}} class="{{elClass}}"{{/if}}{{#each extras}} {{extraKey}}={{extraValue}}{{/each}}>{{#if startWith}}<option value="">{{#startWith}}- - -{{/startWith}}</option>{{/if}}{{#each options}}<option value="{{value}}">{{label}}</option>{{/each}}</select>'
        , button                : '<button{{#if id}} id="{{id}}"{{/if}}{{#if name}}name={{name}}{{/if}} class="{{elClass}}" type={{type}}{{#each extras}} {{extraKey}}={{extraValue}}{{/each}}>{{text}}</button>'
        , pTag                  : '<p{{#if id}} id="{{id}}"{{/if}}{{#if elClass}} class="{{elClass}}"{{/if}}>{{text}}</p>'
      });
    }
  });

  //Template Helpers
  _.extend(Forms.Templates.Helpers, {
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
  });

  //Tempalte Partials
  _.extend(Forms.Templates.Partials, {
  });

  //Template Elements
  _.extend(Forms.Templates.Elements, {
    //Objects
    Buttons: {},
    Inputs: {},
    Helpers: {},

    //Functions
    form : function(form, formName){
      return this.Helpers.getDefaults(form, formName);
    },

    fieldset : function(fieldset, fieldsetName){
      var tmplParams = this.Helpers.getDefaults(fieldset, fieldsetName);
      if(fieldset.legend) { tmplParams.legend = fieldset.legend; }
      return tmplParams;
    },

    div: function(div, divName){
      return this.Helpers.getDefaults(div, divName);
    },

    input : function(input, inputName){
      var tmplParams = this.Helpers.getDefaults(input, inputName);
      tmplParams.type = input.subType || 'text';

      if(Forms.Templates.Elements.Inputs[tmplParams.type]){
        _.extend(tmplParams, Forms.Templates.Elements.Inputs[tmplParams.type](input));
      }

      return tmplParams;
    },

    select : function(select, selectName){
      var tmplParams = this.Helpers.getDefaults(select, selectName);
      if(select.startWith){ tmplParams.startWith = select.startWith; }

      if (_.isArray(select.options)) {
        tmplParams.options = _.map(select.options, function(option) {
          return { value: option, label: option};
        });
      }
      else if (_.isObject(select.options)) {
        tmplParams.options = _.map(_.values(select.options.call()), function(option) {
          return { value: option, label: option};
        });
      }

      return tmplParams;
    },

    button : function(button, buttonName){
      var tmplParams = this.Helpers.getDefaults(button, buttonName);
      button.subType = button.subType || 'button';
      tmplParams.type = button.subType;
      tmplParams.text = button.text;
      tmplParams.name = button.value;

      if(Forms.Templates.Elements.Buttons[tmplParams.type]){
        _.extend(tmplParams, Forms.Templates.Elements.Buttons[tmplParams.type](button));
      }
      return tmplParams;
    }
  });

  //Template Elements Helpers
  _.extend(Forms.Templates.Elements.Helpers, {
    getDefaults : function(control, controlName){
      var tmplParams = {}, htmlAttrs;
      tmplParams.elClass = control.elClass;
      if(control.html){
        htmlAttrs = [];
        _.each(control.html, function(value, key){
          htmlAttrs.push({ key: key, value: value});
        });
        tmplParams.attrs = htmlAttrs;
      }
      if(control.label){
        tmplParams.label = control.label;
      }
      return tmplParams;
    }
  });

  //Template Elements Inputs
  _.extend(Forms.Templates.Elements.Inputs, {
    button : function(input){
      var tmpParams = {};
      tmpParams.value = input.value;
      return tmpParams;
    }
  });

  //Template Elements Buttons
  _.extend(Forms.Templates.Elements.Buttons, {
    button : function(input){
      var tmpParams = {};
      tmpParams.name = input.value;
      return tmpParams;
    }
  });

  //To be extended ...
  //Validation
  _.extend(Forms.Validation, BBValidation, {
  });

  //ModelBinder
  _.extend(Forms.ModelBinder, BBModelBinder, {
  });

  return Forms;
}($, _, Backbone, Handlebars, Validation, StructuredModelBinder));