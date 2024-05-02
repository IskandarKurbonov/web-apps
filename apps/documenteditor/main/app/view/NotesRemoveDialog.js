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
    'common/main/lib/component/RadioBox'
], function () { 'use strict';

    DE.Views.NotesRemoveDialog = Common.UI.Window.extend(_.extend({
        options: {
            width: 214,
            header: true,
            style: 'min-width: 214px;',
            cls: 'modal-dlg',
            buttons: ['ok', 'cancel']
        },

        initialize : function(options) {
            _.extend(this.options, {
                title: this.textTitle
            }, options);

            this.template = [
                '<div class="box">',
                '<div id="notes-remove-chk-foot" style="margin-bottom: 5px;"></div>',
                '<div id="notes-remove-chk-end"></div>',
                '</div>'
            ].join('');

            this.options.tpl = _.template(this.template)(this.options);

            Common.UI.Window.prototype.initialize.call(this, this.options);
        },

        render: function() {
            Common.UI.Window.prototype.render.call(this);

            var $window = this.getChild();
            $window.find('.dlg-btn').on('click', _.bind(this.onBtnClick, this));

            this.chFootnote = new Common.UI.CheckBox({
                el: $window.find('#notes-remove-chk-foot'),
                labelText: this.textFoot,
                value: true
            });

            this.chEndnote = new Common.UI.CheckBox({
                el: $window.find('#notes-remove-chk-end'),
                labelText: this.textEnd,
                value: true
            });
        },

        getFocusedComponents: function() {
            return [this.chFootnote, this.chEndnote].concat(this.getFooterButtons());
        },

        getDefaultFocusableComponent: function () {
            return this.chFootnote;
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

        getSettings: function() {
            return {footnote: this.chFootnote.isChecked(), endnote: this.chEndnote.isChecked()};
        },

        onPrimary: function() {
            this._handleInput('ok');
            return false;
        },
        textTitle: 'Delete Notes',
        textFoot: 'Delete All Footnotes',
        textEnd: 'Delete All Endnotes'
    }, DE.Views.NotesRemoveDialog || {}))
});