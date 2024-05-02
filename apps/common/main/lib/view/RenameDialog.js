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
    'common/main/lib/component/Window'
], function () { 'use strict';

    Common.Views.RenameDialog = Common.UI.Window.extend(_.extend({
        options: {
            width: 330,
            header: false,
            cls: 'modal-dlg',
            filename: '',
            buttons: ['ok', 'cancel']
        },

        initialize : function(options) {
            _.extend(this.options, options || {});

            this.template = [
                '<div class="box">',
                    '<div class="input-row">',
                        '<label>' + this.textName + '</label>',
                    '</div>',
                    '<div id="id-dlg-newname" class="input-row"></div>',
                '</div>'
            ].join('');

            this.options.tpl = _.template(this.template)(this.options);

            Common.UI.Window.prototype.initialize.call(this, this.options);
        },

        render: function() {
            Common.UI.Window.prototype.render.call(this);

            var me = this;
            me.inputName = new Common.UI.InputField({
                el          : $('#id-dlg-newname'),
                style       : 'width: 100%;',
                validateOnBlur: false,
                maxLength: me.options.maxLength,
                validation  : function(value) {
                    return (/[\t*\+:\"<>?|\\\\/]/gim.test(value)) ? me.txtInvalidName + "*+:\"<>?|\/" : true;
                }
            });

            var $window = this.getChild();
            $window.find('.btn').on('click',     _.bind(this.onBtnClick, this));

            me.inputNameEl = $window.find('input');
        },

        getFocusedComponents: function() {
            return [this.inputName].concat(this.getFooterButtons());
        },

        getDefaultFocusableComponent: function () {
            return this.inputName;
        },

        show: function() {
            Common.UI.Window.prototype.show.apply(this, arguments);

            var me = this;
            var idx = me.options.filename.lastIndexOf('.');
            if (idx>0)
                me.options.filename = me.options.filename.substring(0, idx);
            _.delay(function(){
                me.inputName.setValue(me.options.filename);
                me.inputNameEl.focus().select();
            },100);
        },

        onPrimary: function(event) {
            this._handleInput('ok');
            return false;
        },

        onBtnClick: function(event) {
            this._handleInput(event.currentTarget.attributes['result'].value);
        },

        _handleInput: function(state) {
            if (this.options.handler) {
                if (state == 'ok') {
                    if (this.inputName.checkValidate() !== true)  {
                        this.inputNameEl.focus();
                        return;
                    }
                }

                this.options.handler.call(this, state, this.inputName.getValue());
            }

            this.close();
        },

        textName        : 'File name',
        txtInvalidName  : 'The file name cannot contain any of the following characters: '
    }, Common.Views.RenameDialog || {}));
});