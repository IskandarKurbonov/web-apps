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

/**
 * User: Julia.Svinareva
 * Date: 22.07.23
 * Time: 17:18
 */

if (Common === undefined)
    var Common = {};

Common.Views = Common.Views || {};

define([
    'common/main/lib/util/utils',
    'common/main/lib/component/BaseView',
    'common/main/lib/component/Layout'
], function (template) {
    'use strict';

    Common.Views.PluginPanel = Common.UI.BaseView.extend(_.extend({
        template: _.template([
            '<div class="current-plugin-box layout-ct vbox">',
                '<div class="current-plugin-frame">',
                '</div>',
                '<div class="current-plugin-header">',
                    '<label></label>',
                    '<div class="plugin-close close"></div>',
                '</div>',
            '</div>',
            '<div id="plugins-mask" style="display: none;">'
        ].join('')),

        initialize: function(options) {
            _.extend(this, options);
            this._state = {};
            Common.UI.BaseView.prototype.initialize.call(this, arguments);
        },

        render: function(el) {
            el && (this.$el = $(el));
            this.$el.html(this.template({scope: this}));

            this.pluginName = $('.current-plugin-header label', this.$el);
            this.pluginsMask = $('#plugins-mask', this.$el);
            this.currentPluginPanel = $('.current-plugin-box', this.$el);
            this.currentPluginFrame = $('.current-plugin-frame', this.$el);

            this.pluginClose = new Common.UI.Button({
                parentEl: this.$el.find('.plugin-close'),
                cls: 'btn-toolbar',
                iconCls: 'toolbar__icon btn-close',
                hint: this.textClosePanel
            });

            this.trigger('render:after', this);
            return this;
        },

        openInsideMode: function(name, url, frameId, guid) {
            if (!this.pluginName) this.render();

            this.pluginName.text(name);
            if (!this.iframePlugin) {
                this.iframePlugin = document.createElement("iframe");
                this.iframePlugin.id           = (frameId === undefined) ? 'plugin_iframe' : frameId;
                this.iframePlugin.name         = 'pluginFrameEditor';
                this.iframePlugin.width        = '100%';
                this.iframePlugin.height       = '100%';
                this.iframePlugin.align        = "top";
                this.iframePlugin.frameBorder  = 0;
                this.iframePlugin.scrolling    = "no";
                this.iframePlugin.allow = "camera; microphone; display-capture";
                this.iframePlugin.onload       = _.bind(this._onLoad,this);
                this.currentPluginFrame.append(this.iframePlugin);

                if (!this.loadMask)
                    this.loadMask = new Common.UI.LoadMask({owner: this.currentPluginFrame});
                this.loadMask.setTitle(this.textLoading);
                this.loadMask.show();

                this.iframePlugin.src = url;
            }
            this._state.insidePlugin = guid;
            return true;
        },

        closeInsideMode: function() {
            if (this.iframePlugin) {
                this.currentPluginFrame.empty();
                this.iframePlugin = null;
            }
            this._state.insidePlugin = undefined;
        },

        _onLoad: function() {
            if (this.loadMask)
                this.loadMask.hide();
        },

        hide: function () {
            Common.UI.BaseView.prototype.hide.call(this,arguments);
        },

        textClosePanel: 'Close plugin',
        textLoading: 'Loading'

    }, Common.Views.PluginPanel || {}));
});