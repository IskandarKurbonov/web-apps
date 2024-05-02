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
    'common/main/lib/component/Window',
    'common/main/lib/component/CheckBox'
], function () { 'use strict';

    PE.Views.SlideshowSettings = Common.UI.Window.extend(_.extend({
        options: {
            width: 315,
            header: true,
            style: 'min-width: 315px;',
            cls: 'modal-dlg',
            id: 'window-slideshow-settings',
            buttons: ['ok', 'cancel']
        },

        initialize : function(options) {
            _.extend(this.options, {
                title: this.textTitle
            }, options || {});

            this.template = [
                '<div class="box">',
                    '<div id="slideshow-checkbox-loop" style="margin-bottom:5px;"></div>',
                '</div>'
            ].join('');

            this.options.tpl = _.template(this.template)(this.options);

            this.spinners = [];
            this._noApply = false;

            Common.UI.Window.prototype.initialize.call(this, this.options);
        },

        render: function() {
            Common.UI.Window.prototype.render.call(this);

            this.chLoop = new Common.UI.CheckBox({
                el: $('#slideshow-checkbox-loop'),
                labelText: this.textLoop
            });

            var $window = this.getChild();
            $window.find('.dlg-btn').on('click', _.bind(this.onBtnClick, this));
        },

        getFocusedComponents: function() {
            return [ this.chLoop ].concat(this.getFooterButtons());
        },

        getDefaultFocusableComponent: function () {
            return this.chLoop;
        },

        _handleInput: function(state) {
            if (this.options.handler) {
                this.options.handler.call(this, this, state);
            }

            this.close();
        },

        onBtnClick: function(event) {
            this._handleInput(event.currentTarget.attributes['result'].value);
        },

        onPrimary: function() {
            this._handleInput('ok');
            return false;
        },

        setSettings: function (loop) {
            this.chLoop.setValue(loop);
        },

        getSettings: function() {
            return (this.chLoop.getValue()=='checked');
        },

        textTitle:     'Show Settings',
        textLoop:      'Loop continuously until \'Esc\' is pressed'
    }, PE.Views.SlideshowSettings || {}))
});