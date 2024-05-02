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
    'common/main/lib/component/InputField'
], function () { 'use strict';

    DE.Views.EditListItemDialog = Common.UI.Window.extend(_.extend({
        options: {
            width: 330,
            header: false,
            cls: 'modal-dlg',
            buttons: ['ok', 'cancel']
        },

        initialize : function(options) {
            _.extend(this.options, options || {});

            this.template = [
                '<div class="box">',
                '<div class="input-row">',
                    '<label>' + this.textDisplayName + '</label>',
                '</div>',
                '<div id="id-dlg-label-name" class="input-row" style="margin-bottom: 8px;"></div>',
                '<div class="input-row">',
                '<label>' + this.textValue + '</label>',
                '</div>',
                '<div id="id-dlg-label-value" class="input-row"></div>',
                '</div>'
            ].join('');

            this.options.tpl = _.template(this.template)(this.options);
            Common.UI.Window.prototype.initialize.call(this, this.options);
        },

        render: function() {
            Common.UI.Window.prototype.render.call(this);

            var me = this;
            me.inputName = new Common.UI.InputField({
                el          : $('#id-dlg-label-name'),
                allowBlank  : false,
                blankError  : me.textNameError,
                style       : 'width: 100%;',
                maxLength   : 256,
                validateOnBlur: false,
                validation  : function(value) {
                    return value ? true : '';
                }
            });
            me.inputName._input.on('input', function (e) {
                if (me.copyvalue==undefined && me.inputValue.getValue()==me.inputName.getValue()) {
                    me.copyvalue = 1;
                }
                if (me.copyvalue==1)
                    me.inputValue.setValue($(e.target).val());
                else if (me.copyvalue==2)
                    me.copyvalue = 0;
            });

            me.inputValue = new Common.UI.InputField({
                el          : $('#id-dlg-label-value'),
                style       : 'width: 100%;',
                maxLength   : 256,
                validateOnBlur: false,
                validation  : function(value) {
                    if (value!=='' && me.options.store) {
                        var rec = me.options.store.findWhere({value: value});
                        if (rec)
                            return me.textValueError
                    }
                    return true;
                }
            });
            me.inputValue._input.on('input', function (e) {
                if (me.copyvalue==undefined && me.inputValue.getValue()==me.inputName.getValue()) {
                    me.copyvalue = 2;
                }
                if (me.copyvalue==2)
                    me.inputName.setValue($(e.target).val());
                else if (me.copyvalue==1)
                    me.copyvalue = 0;
            });

            var $window = this.getChild();
            $window.find('.dlg-btn').on('click',     _.bind(this.onBtnClick, this));
        },

        getFocusedComponents: function() {
            return [this.inputName, this.inputValue].concat(this.getFooterButtons());
        },

        getDefaultFocusableComponent: function () {
            return this.inputName;
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
                        this.inputName.focus();
                        return;
                    }
                    if (this.inputValue.checkValidate() !== true)  {
                        this.inputValue.focus();
                        return;
                    }
                }

                this.options.handler.call(this, state, this.inputName.getValue(), this.inputValue.getValue());
            }

            this.close();
        },

        setSettings: function (props) {
            if (props) {
                this.inputName.setValue(props.name || '');
                this.inputValue.setValue(props.value || '');
            }
        },

        textDisplayName: 'Display name',
        textValue: 'Value',
        textNameError: 'Display name must not be empty.',
        textValueError: 'An item with the same value already exists.'
    }, DE.Views.EditListItemDialog || {}));
});