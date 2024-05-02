//  SPDX-FileCopyrightText: 2024 Ascensio System SIA
//
//  SPDX-License-Identifier: Ascensio-System
//
//     Our License onlyoffice.com
//     Empty line
//     Empty line
//     Empty line
//     Empty line
//     Empty line
//     Empty line
//     Empty line
//     

define([
    'core',
    'jquery',
    'underscore',
    'backbone',
    'presentationeditor/main/app/view/Transitions'
], function () {
    'use strict';

    PE.Controllers.Transitions = Backbone.Controller.extend(_.extend({
        models : [],
        collections : [],
        views : [
            'PE.Views.Transitions'
        ],
        options: {
            alias: 'Transitions'
        },
        sdkViewName : '#id_main',

        initialize: function () {

            this.addListeners({
                'PE.Views.Transitions': {
                    'transit:preview':      _.bind(this.onPreviewClick, this),
                    'transit:parameters':    _.bind(this.onParameterClick, this),
                    'transit:duration':     _.bind(this.onDurationChange, this),
                    'transit:applytoall':   _.bind(this.onApplyToAllClick, this),
                    'transit:selecteffect': _.bind(this.onEffectSelect, this),
                    'transit:startonclick': _.bind(this.onStartOnClickChange, this),
                    'transit:delay':        _.bind(this.onDelayChange, this),
                    'transit:checkdelay':   _.bind(this.onCheckDelayChange, this)
                },
                'Toolbar': {
                    'tab:active':           _.bind(this.onActiveTab, this)
                }
            });

        },

        onLaunch: function () {
            this._state = {};
         },

        setConfig: function (config) {
            this.appConfig = config.mode;

            this.view = this.createView('PE.Views.Transitions', {
                toolbar: config.toolbar,
                mode: config.mode
            });
            return this;
        }, 

        setApi: function (api) {
            this.api = api;
            this.api.asc_registerCallback('asc_onFocusObject',          _.bind(this.onFocusObject, this));
            this.api.asc_registerCallback('asc_onCountPages',           _.bind(this.onApiCountPages, this));
            return this;
        },

        onApiCountPages: function (count) {
            if (this._state.no_slides !== (count<=0)) {
                this._state.no_slides = (count<=0);
                this.lockToolbar(Common.enumLock.noSlides, this._state.no_slides);
            }
        },

        createToolbarPanel: function() {
            return this.view.getPanel();
        }, 

        getView: function(name) {
            return !name && this.view ?
                this.view : Backbone.Controller.prototype.getView.call(this, name);
        },

        onPreviewClick: function() {
            if (this.api) {
                this.api.SlideTransitionPlay();
            }
        },

        onParameterClick: function (value) {
            this._state.EffectType = value;
            if (this.api) {
                var props = new Asc.CAscSlideProps();
                var transition = new Asc.CAscSlideTransition();
                transition.put_TransitionType(this._state.Effect);
                transition.put_TransitionOption(this._state.EffectType);
                props.put_transition(transition);
                this.api.SetSlideProps(props);
            }
        },

        onDurationChange: function(field, newValue, oldValue, eOpts) {
            if (this.api) {
                var props = new Asc.CAscSlideProps();
                var transition = new Asc.CAscSlideTransition();
                transition.put_TransitionDuration(field.getNumberValue()*1000);
                props.put_transition(transition);
                this.api.SetSlideProps(props);
            }
        },

        onStartOnClickChange: function(field, newValue, oldValue, eOpts) {
            if (this.api) {
                var props = new Asc.CAscSlideProps();
                var transition = new Asc.CAscSlideTransition();
                transition.put_SlideAdvanceOnMouseClick(field.getValue() == 'checked');
                props.put_transition(transition);
                this.api.SetSlideProps(props);
            }
        },

        onDelayChange: function(field, newValue, oldValue, eOpts) {
            if (this.api) {
                var props = new Asc.CAscSlideProps();
                var transition = new Asc.CAscSlideTransition();
                transition.put_SlideAdvanceDuration(field.getNumberValue()*1000);
                props.put_transition(transition);
                this.api.SetSlideProps(props);
            }
        },

        onCheckDelayChange: function(field, newValue, oldValue, eOpts) {
            this.view.numDelay.setDisabled(field.getValue() !== 'checked');
            if (this.api) {
                var props = new Asc.CAscSlideProps();
                var transition = new Asc.CAscSlideTransition();
                transition.put_SlideAdvanceAfter(field.getValue() == 'checked');
                props.put_transition(transition);
                this.api.SetSlideProps(props);
            }
        },

        onApplyToAllClick: function () {
            if (this.api) this.api.SlideTransitionApplyToAll();
        },

        onEffectSelect: function (combo, record) {
            var type = record.get('value');
            var parameter = this._state.EffectType;

            if (this._state.Effect !== type &&
                !((this._state.Effect === Asc.c_oAscSlideTransitionTypes.Wipe || this._state.Effect === Asc.c_oAscSlideTransitionTypes.UnCover || this._state.Effect === Asc.c_oAscSlideTransitionTypes.Cover)&&
                    (type === Asc.c_oAscSlideTransitionTypes.Wipe || type === Asc.c_oAscSlideTransitionTypes.UnCover || type === Asc.c_oAscSlideTransitionTypes.Cover)))
                    parameter = this.view.setMenuParameters(type);

            this._state.Effect = type;
            this.onParameterClick(parameter);
            Common.NotificationCenter.trigger('edit:complete', this.view);
        },

        onFocusObject: function(selectedObjects) {
            var me = this;

            for (var i = 0; i<selectedObjects.length; i++) {
                var eltype = selectedObjects[i].get_ObjectType();

                if (eltype === undefined)
                    continue;

                if (eltype == Asc.c_oAscTypeSelectElement.Slide) {
                    var locked_transition = undefined,
                    pr = selectedObjects[i].get_ObjectValue();
                    locked_transition = pr.get_LockTransition();

                    if (locked_transition !== undefined && me._state.lockedtransition !== locked_transition)
                        if (me.view.toolbar._state.activated) me._state.lockedtransition = locked_transition;

                    this.loadSettings(pr);

                    if (this._state.onactivetab) {
                        this.setLocked();
                        this.setSettings();
                    }
                }
            }
        },

        loadSettings: function (props) {
            var transition = props.get_transition();

            if (transition) {
                this._state.Effect = transition.get_TransitionType();
                this._state.EffectType = transition.get_TransitionOption();

                var value = transition.get_TransitionDuration();
                if (Math.abs(this._state.Duration - value) > 0.001 ||
                    (this._state.Duration === null || value === null) && (this._state.Duration !== value) ||
                    (this._state.Duration === undefined || value === undefined) && (this._state.Duration !== value)) {
                    this._state.Duration = value;
                }

                value = transition.get_SlideAdvanceDuration();
                if (Math.abs(this._state.Delay - value) > 0.001 ||
                    (this._state.Delay === null || value === null) && (this._state.Delay !== value) ||
                    (this._state.Delay === undefined || value === undefined) && (this._state.Delay !== value)) {
                    this._state.Delay = value;
                }

                this._state.OnMouseClick = transition.get_SlideAdvanceOnMouseClick();
                this._state.AdvanceAfter = transition.get_SlideAdvanceAfter();
            }
        },

        onActiveTab: function(tab) {
            if (tab == 'transit') {
                this._state.onactivetab = true;
                this.setLocked();
                this.setSettings();
            }
            else this._state.onactivetab = false;
        },

        lockToolbar: function (causes, lock, opts) {
            Common.Utils.lockControls(causes, lock, opts, this.view.lockedControls);
        },

        setLocked: function() {
            if (this._state.lockedtransition != undefined)
                this.lockToolbar(Common.enumLock.transitLock, this._state.lockedtransition);
        },

        setSettings: function () {
            var me = this.view;
            if (this._state.Effect !== undefined) {
                var item = me.listEffects.store.findWhere({value: this._state.Effect});
                me.listEffects.menuPicker.selectRecord(item ? item : me.listEffects.menuPicker.items[0]);
                this.view.btnParameters.setIconCls('toolbar__icon icon ' + item.get('imageUrl'));
            }

            if (me.btnParameters.menu.items.length > 0 && this._state.EffectType !== undefined)
                    me.setMenuParameters(this._state.Effect, this._state.EffectType);

            me.numDuration.setValue((this._state.Duration !== null  && this._state.Duration !== undefined) ? this._state.Duration / 1000. : '', true);
            me.numDelay.setValue((this._state.Delay !== null && this._state.Delay !== undefined) ? this._state.Delay / 1000. : '', true);
            me.chStartOnClick.setValue((this._state.OnMouseClick !== null && this._state.OnMouseClick !== undefined) ? this._state.OnMouseClick : 'indeterminate', true);
            me.chDelay.setValue((this._state.AdvanceAfter !== null && this._state.AdvanceAfter !== undefined) ? this._state.AdvanceAfter : 'indeterminate', true);
            me.numDelay.setDisabled(me.chDelay.getValue() !== 'checked' || me.chDelay.disabled);
        }

    }, PE.Controllers.Transitions || {}));
});