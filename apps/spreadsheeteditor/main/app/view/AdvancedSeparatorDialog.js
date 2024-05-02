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

    SSE.Views.AdvancedSeparatorDialog = Common.UI.Window.extend(_.extend({
        options: {
            width: 330,
            cls: 'modal-dlg',
            buttons: ['ok', 'cancel']
        },

        initialize : function(options) {
            _.extend(this.options, {
                title: this.textTitle
            }, options || {});

            this.template = [
                '<div class="box">',
                '<div class="input-row" style="margin-bottom: 8px;">',
                    '<label>' + this.textLabel + '</label>',
                '</div>',
                '<div style="margin-bottom: 12px;">',
                    '<div id="id-adv-separator-decimal" class=""></div><label class="input-row margin-left-10" style="padding-top: 4px;">' + this.strDecimalSeparator + '</label>',
                '</div>',
                '<div style="margin-bottom: 10px;">',
                    '<div id="id-adv-separator-thousands" class=""></div><label class="input-row margin-left-10" style="padding-top: 4px;">' + this.strThousandsSeparator + '</label>',
                '</div>',
                '<div class="input-row" style="margin-bottom: 8px;">',
                '<label>' + this.textQualifier + '</label>',
                '</div>',
                '<div style="margin-bottom: 12px;">',
                '<div id="id-adv-separator-qualifier" class="input-group-nr"></div>',
                '</div>',
                '</div>'
            ].join('');

            this.options.tpl = _.template(this.template)(this.options);
            this.props = options.props;

            Common.UI.Window.prototype.initialize.call(this, this.options);
        },

        render: function() {
            Common.UI.Window.prototype.render.call(this);

            this.inputDecimalSeparator = new Common.UI.InputField({
                el: $('#id-adv-separator-decimal'),
                style: 'width: 35px;',
                maxLength: 1,
                validateOnBlur: false
            });

            this.inputThousandsSeparator = new Common.UI.InputField({
                el: $('#id-adv-separator-thousands'),
                style: 'width: 35px;',
                maxLength: 1,
                validateOnBlur: false
            });

            this.cmbQualifier = new Common.UI.ComboBox({
                el: $('#id-adv-separator-qualifier'),
                style: 'width: 100px;',
                menuStyle: 'min-width: 100px;',
                cls: 'input-group-nr',
                data: [
                    {value: '"', displayValue: '"'},
                    {value: '\'', displayValue: '\''},
                    {value: null, displayValue: this.txtNone}],
                editable: false,
                takeFocusOnClose: true
            });

            var $window = this.getChild();
            $window.find('.dlg-btn').on('click',     _.bind(this.onBtnClick, this));

            this.afterRender();
        },

        getFocusedComponents: function() {
            return [this.inputDecimalSeparator, this.inputThousandsSeparator, this.cmbQualifier].concat(this.getFooterButtons());
        },

        getDefaultFocusableComponent: function () {
            return this.inputDecimalSeparator;
        },

        afterRender: function() {
            this._setDefaults(this.props);
        },

        _setDefaults: function (props) {
            if (props) {
                this.inputDecimalSeparator.setValue(props.decimal || '');
                this.inputThousandsSeparator.setValue(props.thousands || '');
                this.cmbQualifier.setValue(props.qualifier || null);
            }
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
                this.options.handler.call(this, state, {decimal: this.inputDecimalSeparator.getValue(), thousands: this.inputThousandsSeparator.getValue(),
                                                        qualifier: this.cmbQualifier.getValue()});
            }

            this.close();
        },

        textTitle: 'Advanced Settings',
        textLabel: 'Settings used to recognize numeric data',
        strDecimalSeparator: 'Decimal separator',
        strThousandsSeparator: 'Thousands separator',
        txtNone: '(none)',
        textQualifier: 'Text qualifier'

    }, SSE.Views.AdvancedSeparatorDialog || {}));
});