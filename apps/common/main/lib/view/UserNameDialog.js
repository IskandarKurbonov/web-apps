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

    Common.Views.UserNameDialog = Common.UI.Window.extend(_.extend({
        options: {
            width: 330,
            header: false,
            modal       : false,
            cls: 'modal-dlg',
            buttons: ['ok', 'cancel']
        },

        initialize : function(options) {
            _.extend(this.options, options || {});

            this.template = [
                '<div class="box">',
                '<div style="margin-bottom: 2px;">' + (this.options.label ? this.options.label : this.textLabel) + '</div>',
                '<div id="id-dlg-username-caption" class="input-row"></div>',
                '<div id="id-dlg-username-chk-use" class="" style="margin-top: 10px;"></div>',
                '</div>'
            ].join('');

            this.options.tpl = _.template(this.template)(this.options);

            Common.UI.Window.prototype.initialize.call(this, this.options);
        },

        render: function() {
            Common.UI.Window.prototype.render.call(this);

            var me = this;
            me.inputLabel = new Common.UI.InputField({
                el          : $('#id-dlg-username-caption'),
                allowBlank  : true,
                style       : 'width: 100%;',
                maxLength   : 128,
                validateOnBlur: false,
                validation  : me.options.validation || function(value) {
                    return value ? true : '';
                }
            });
            me.inputLabel.setValue(this.options.value || '' );

            me.chDontShow = new Common.UI.CheckBox({
                el: $('#id-dlg-username-chk-use'),
                labelText: this.textDontShow,
                value: this.options.check
            });

            var $window = this.getChild();
            $window.find('.dlg-btn').on('click',     _.bind(this.onBtnClick, this));
        },

        show: function() {
            Common.UI.Window.prototype.show.apply(this, arguments);

            var me = this;
            _.delay(function(){
                me.getChild('input').focus();
            },50);
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
                    if (this.inputLabel.checkValidate() !== true)  {
                        this.inputLabel.cmpEl.find('input').focus();
                        return;
                    }
                }

                this.options.handler.call(this, state, {input: this.inputLabel.getValue(), checkbox: this.chDontShow.getValue()=='checked'});
            }

            this.close();
        },

        textLabel: 'Label:',
        textLabelError: 'Label must not be empty.',
        textDontShow: 'Don\'t ask me again'
    }, Common.Views.UserNameDialog || {}));
});