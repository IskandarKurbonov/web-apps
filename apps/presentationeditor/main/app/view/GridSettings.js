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
    'common/main/lib/component/MetricSpinner',
    'common/main/lib/component/ComboBox'
], function () { 'use strict';

    PE.Views.GridSettings = Common.UI.Window.extend(_.extend({
        options: {
            width: 214,
            header: true,
            style: 'min-width: 315px;',
            cls: 'modal-dlg',
            id: 'window-grid-settings',
            buttons: ['ok', 'cancel']
        },

        initialize : function(options) {
            _.extend(this.options, {
                title: this.textTitle
            }, options || {});

            this.template = [
                '<div class="box">',
                    '<div class="input-row">',
                        '<label class="text">' + this.textSpacing + '</label>',
                    '</div>',
                    '<div id="grid-spacing-combo" class="input-group-nr" style="margin-bottom:10px;"></div>',
                    '<div id="grid-spacing-spin" class="margin-left-10" style="margin-bottom:10px;"></div>',
                '</div>'
            ].join('');

            this.options.tpl = _.template(this.template)(this.options);

            Common.UI.Window.prototype.initialize.call(this, this.options);
        },

        render: function() {
            Common.UI.Window.prototype.render.call(this);

            var $window = this.getChild();
            var arr = Common.define.gridlineData.getGridlineData(Common.Utils.Metric.getCurrentMetric());
            this.arrSpacing = [];
            for (var i = 0; i < arr.length; i++) {
                this.arrSpacing.push({
                    displayValue: arr[i].caption,
                    value: i,
                    spacing: arr[i].value
                });
            }
            this.arrSpacing.push({ displayValue: this.textCustom, value: -1 });

            this.cmbGridSpacing = new Common.UI.ComboBox({
                el: $window.find('#grid-spacing-combo'),
                cls: 'input-group-nr',
                style: 'width: 100%;',
                menuStyle: 'min-width: 86px;max-height: 185px;',
                editable: false,
                takeFocusOnClose: true,
                data: this.arrSpacing
            });
            this.cmbGridSpacing.on('selected', _.bind(function(combo, record) {
                if (record.value<0) {
                } else {
                    this.spnSpacing.setValue(record.spacing, true);
                }
            }, this));

            var metric = Common.Utils.Metric.getCurrentMetric();
            this.spnSpacing = new Common.UI.MetricSpinner({
                el: $window.find('#grid-spacing-spin'),
                step: metric === Common.Utils.Metric.c_MetricUnits.pt ? 1 : .01,
                width: 86,
                defaultUnit: Common.Utils.Metric.getCurrentMetricName(),
                value: metric === Common.Utils.Metric.c_MetricUnits.inch ? "1 \"" : (metric === Common.Utils.Metric.c_MetricUnits.pt ? '36 pt' : '1 cm'),
                maxValue: metric === Common.Utils.Metric.c_MetricUnits.inch ? 2 : (metric === Common.Utils.Metric.c_MetricUnits.pt ? 145 : 5.08),
                minValue: metric === Common.Utils.Metric.c_MetricUnits.inch ? 0.04 : (metric === Common.Utils.Metric.c_MetricUnits.pt ? 3 : 0.1)
            });
            this.spnSpacing.on('change', _.bind(function(field, newValue, oldValue, eOpts){
                var value = this.spnSpacing.getNumberValue(),
                    idx = -1;
                for (var i=0; i<this.arrSpacing.length; i++) {
                    var item = this.arrSpacing[i];
                    if (item.spacing<1 && Math.abs(item.spacing - value)<0.005 || item.spacing>=1 && Math.abs(item.spacing - value)<0.001) {
                        idx = i;
                        break;
                    }
                }
                this.cmbGridSpacing.setValue(idx);
            }, this));

            $window.find('.dlg-btn').on('click', _.bind(this.onBtnClick, this));
        },

        getFocusedComponents: function() {
            return [ this.cmbGridSpacing, this.spnSpacing ].concat(this.getFooterButtons());
        },

        getDefaultFocusableComponent: function () {
            return this.cmbGridSpacing;
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

        setSettings: function (value) {
            value = Common.Utils.Metric.fnRecalcFromMM(value/36000);
            var idx = -1;
            for (var i=0; i<this.arrSpacing.length; i++) {
                var item = this.arrSpacing[i];
                if (item.spacing<1 && Math.abs(item.spacing - value)<0.005 || item.spacing>=1 && Math.abs(item.spacing - value)<0.001)
                    idx = i;
            }
            this.cmbGridSpacing.setValue(idx, -1);
            this.spnSpacing.setValue(value, true);
        },

        getSettings: function() {
            return this.spnSpacing.getNumberValue();
        },

        textTitle: 'Grid Settings',
        textSpacing: 'Spacing',
        textCm: 'cm',
        textCustom: 'Custom'
    }, PE.Views.GridSettings || {}))
});