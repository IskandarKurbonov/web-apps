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

if (Common === undefined)
    var Common = {};
Common.Controllers = Common.Controllers || {};

define([
    'core',
    'common/main/lib/view/Draw',
    'common/main/lib/view/PasswordDialog',
    'common/main/lib/view/SignDialog',
    'common/main/lib/view/SignSettingsDialog'
], function () {
    'use strict';

    Common.Controllers.Draw = Backbone.Controller.extend(_.extend({
        models : [],
        collections : [
        ],
        views : [
            'Common.Views.Draw'
        ],
        sdkViewName : '#id_main',

        initialize: function () {

            this.addListeners({
                'Common.Views.Draw': {
                    'draw:select':      _.bind(this.onSelect, this),
                    'draw:eraser':      _.bind(this.onEraser, this),
                    'draw:pen':     _.bind(this.onDrawPen, this),
                    'draw:size':     _.bind(this.onDrawSizeClick, this),
                    'draw:color':     _.bind(this.onDrawColorClick, this)
                }
            });
        },
        onLaunch: function () {
            this._state = {};

            Common.NotificationCenter.on('app:ready', this.onAppReady.bind(this));
            Common.NotificationCenter.on('api:disconnect', _.bind(this.onCoAuthoringDisconnect, this));
        },

        setConfig: function (data, api) {
            this.setApi(api);

            if (data) {
                this.sdkViewName        =   data['sdkviewname'] || this.sdkViewName;
            }
        },
        setApi: function (api) {
            if (api) {
                this.api = api;
                this.api.asc_registerCallback('asc_onInkDrawerStop',_.bind(this.onInkDrawerStop, this));
                this.api.asc_registerCallback('asc_onCoAuthoringDisconnect',_.bind(this.onCoAuthoringDisconnect, this));
            }
            return this;
        },

        setMode: function(mode) {
            this.appConfig = mode;

            this.view = this.createView('Common.Views.Draw', {
                mode: mode
            });

            return this;
        },

        SetDisabled: function(state) {
            this.view && this.view.SetDisabled(state);
        },

        onInkDrawerStop: function() {
            this.view && this.view.depressButtons();
        },

        onSelect: function(btn){
            this.api && this.api.asc_StopInkDrawer();
            Common.NotificationCenter.trigger('edit:complete', this.view);
        },

        onEraser: function(btn){
            if (this.api) {
                if (!btn.pressed)
                    this.api.asc_StopInkDrawer();
                else {
                    this.view.depressButtons(btn);
                    this.api.asc_StartInkEraser();
                    Common.NotificationCenter.trigger('draw:start', this.view);
                }
            }
        },

        onDrawPen: function(btn){
            if (this.api) {
                if (!btn.pressed)
                    this.api.asc_StopInkDrawer();
                else {
                    this.view.depressButtons(btn);

                    var options = btn.options.penOptions;
                    var stroke = new Asc.asc_CStroke();
                    stroke.put_type( Asc.c_oAscStrokeType.STROKE_COLOR);
                    stroke.put_color(Common.Utils.ThemeColor.getRgbColor(options.color));
                    stroke.asc_putPrstDash(Asc.c_oDashType.solid);
                    stroke.put_width(options.size.arr[options.size.idx]);
                    stroke.put_transparent(options.opacity * 2.55);
                    this.api.asc_StartDrawInk(stroke, options.idx);
                    Common.NotificationCenter.trigger('draw:start', this.view);
                }
            }
        },

        onDrawSizeClick: function(btn, direction){
            if (!btn.pressed) {
                btn.toggle(true, true);
                this.view && this.view.depressButtons(btn);
            }

            var options = btn.options.penOptions;
            options.size.idx =  (direction==='up') ? Math.min(options.size.idx+1, options.size.arr.length-1) : Math.max(options.size.idx-1, 0);
            this.view && this.view.updateButtonHint(btn);

            this.onDrawPen(btn);
        },

        onDrawColorClick: function(btn, color){
            if (!btn.pressed) {
                btn.toggle(true, true);
                this.view && this.view.depressButtons(btn);
            }

            btn.options.penOptions.color = color;
            this.view && this.view.updateButtonHint(btn);

            this.onDrawPen(btn);
        },

        createToolbarPanel: function(groups) {
            return this.view.getPanel(groups);
        },

        getView: function(name) {
            return !name && this.view ?
                this.view : Backbone.Controller.prototype.getView.call(this, name);
        },

        onAppReady: function (config) {
            var me = this;
            (new Promise(function (accept, reject) {
                accept();
            })).then(function(){
            });
        },

        onCoAuthoringDisconnect: function() {
            this.SetDisabled(true);
        }

    }, Common.Controllers.Draw || {}));
});