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
    'common/main/lib/component/ComboBox'
], function () { 'use strict';

    SSE.Views.SetValueDialog = Common.UI.Window.extend(_.extend({
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
            }, options || {});

            this.template = [
                '<div class="box">',
                    '<div class="input-row">',
                        '<div id="id-spin-set-value"></div>',
                    '</div>',
                '</div>'
            ].join('');

            this.options.tpl = _.template(this.template)(this.options);
            this.startvalue = this.options.startvalue;
            this.maxvalue = this.options.maxvalue;
            this.defaultUnit = this.options.defaultUnit;
            this.step = this.options.step;

            Common.UI.Window.prototype.initialize.call(this, this.options);
        },

        render: function() {
            Common.UI.Window.prototype.render.call(this);

            this.spnSize = new Common.UI.MetricSpinner({
                el: $('#id-spin-set-value'),
                width: 182,
                step: this.step,
                defaultUnit : this.defaultUnit,
                minValue    : 0,
                maxValue    : this.maxvalue
            });
            this.spnSize.setValue((this.startvalue!==null) ? (this.startvalue + ' ' + this.defaultUnit) : '');

            if (this.startvalue!==null) {
                var me = this;
                setTimeout(function() {
                    var input = me.spnSize.$input[0];
                    if (document.selection) { // IE
                        me.spnSize.$input.select();
                    } else { //FF и Webkit
                        input.selectionStart = 0;
                        input.selectionEnd = (me.startvalue).toString().length;
                    }
                }, 10);
            }

            var $window = this.getChild();
            $window.find('.dlg-btn').on('click', _.bind(this.onBtnClick, this));
            this.spnSize.on('entervalue', _.bind(this.onPrimary, this));
            if (this.options.rounding)
                this.spnSize.on('change', _.bind(this.onChange, this));
            this.spnSize.$el.find('input').focus();
        },

        getFocusedComponents: function() {
            return [this.spnSize].concat(this.getFooterButtons());
        },

        getDefaultFocusableComponent: function () {
            return this.spnSize;
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

        onChange: function () {
            var val = this.spnSize.getNumberValue();
            val = val / this.step; val = (val | val) * this.step;
            this.spnSize.setValue(val, true);
        },

        getSettings: function() {
            return this.spnSize.getNumberValue();
        },

        onPrimary: function() {
            this._handleInput('ok');
            return false;
        },

        txtMinText: 'The minimum value for this field is {0}',
        txtMaxText: 'The maximum value for this field is {0}'
    }, SSE.Views.SetValueDialog || {}))
});