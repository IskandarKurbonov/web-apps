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
    'common/main/lib/component/ComboBox',
    'common/main/lib/component/MetricSpinner',
    'common/main/lib/component/RadioBox'
], function () { 'use strict';

    DE.Views.CellsAddDialog = Common.UI.Window.extend(_.extend({
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
                    '<div style="margin-bottom: 10px;">',
                        '<div id="table-combo-row-col" class="input-group-nr margin-right-5" style="display: inline-block;"></div>',
                        '<div id="table-spin-row-col" style="display: inline-block;"></div>',
                    '</div>',
                    '<div id="table-radio-before" style="padding-bottom: 8px;"></div>',
                    '<div id="table-radio-after" style="padding-bottom: 8px;"></div>',
                '</div>'
            ].join('');

            this.options.tpl = _.template(this.template)(this.options);

            Common.UI.Window.prototype.initialize.call(this, this.options);
        },

        render: function() {
            Common.UI.Window.prototype.render.call(this);

            this.cmbRowCol = new Common.UI.ComboBox({
                el: $('#table-combo-row-col'),
                cls: 'input-group-nr',
                style: 'width: 110px;',
                menuStyle: 'min-width: 110px;',
                editable: false,
                takeFocusOnClose: true,
                scrollAlwaysVisible: true,
                data: [
                    { value: 0, displayValue: this.textRow},
                    { value: 1, displayValue: this.textCol}
                ]
            });
            this.cmbRowCol.setValue(0);
            this.cmbRowCol.on('selected', _.bind(function(combo, record) {
                var row = record.value == 0;
                this.spnCount.setMaxValue(row ? 100 : 64);
                this.spnCount.setValue(this.spnCount.getNumberValue());
                this.radioBefore.setCaption(row ? this.textUp : this.textLeft);
                this.radioAfter.setCaption(row ? this.textDown : this.textRight);
            }, this));

            this.spnCount = new Common.UI.MetricSpinner({
                el: $('#table-spin-row-col'),
                step        : 1,
                width       : 65,
                value       : 1,
                defaultUnit : '',
                maxValue    : 100,
                minValue    : 1,
                allowDecimal: false
            });

            this.radioBefore = new Common.UI.RadioBox({
                el: $('#table-radio-before'),
                labelText: this.textUp,
                name: 'asc-radio-table-cells-add',
                checked: true
            });

            this.radioAfter = new Common.UI.RadioBox({
                el: $('#table-radio-after'),
                labelText: this.textDown,
                name: 'asc-radio-table-cells-add'
            });

            var $window = this.getChild();
            $window.find('.dlg-btn').on('click', _.bind(this.onBtnClick, this));
        },

        getFocusedComponents: function() {
            return [this.cmbRowCol, this.spnCount, this.radioBefore, this.radioAfter].concat(this.getFooterButtons());
        },

        getDefaultFocusableComponent: function () {
            return this.spnCount;
        },

        _handleInput: function(state) {
            if (this.options.handler) {
                this.options.handler.call(this, state, this.getSettings());
            }

            this.close();
        },

        onBtnClick: function(event) {
            this._handleInput(event.currentTarget.attributes['result'].value);
        },

        getSettings: function() {
            var row = this.cmbRowCol.getValue()==0;
            return {row: row, before: this.radioBefore.getValue(), count: this.spnCount.getNumberValue()};
        },

        onPrimary: function() {
            this._handleInput('ok');
            return false;
        },

        textTitle: 'Insert Several',
        textLeft: 'To the left',
        textRight: 'To the right',
        textUp: 'Above the cursor',
        textDown: 'Below the cursor',
        textRow: 'Rows',
        textCol: 'Columns'

    }, DE.Views.CellsAddDialog || {}))
});