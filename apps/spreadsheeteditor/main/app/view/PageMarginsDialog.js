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
    'common/main/lib/component/MetricSpinner'
], function () { 'use strict';

    SSE.Views.PageMarginsDialog = Common.UI.Window.extend(_.extend({
        options: {
            width: 215,
            height: 'auto',
            header: true,
            style: 'min-width: 216px;',
            cls: 'modal-dlg',
            id: 'window-page-margins',
            buttons: ['ok', 'cancel']
        },

        initialize : function(options) {
            _.extend(this.options, {
                title: this.textTitle
            }, options || {});

            this.template = [
                '<div class="box">',
                    '<table cols="2" style="width: 100%;margin-bottom: 5px;">',
                        '<tr>',
                            '<td class="padding-right-10" style="padding-bottom: 8px;">',
                                '<label class="input-label">' + this.textTop + '</label>',
                                '<div id="page-margins-spin-top"></div>',
                            '</td>',
                            '<td style="padding-bottom: 8px;">',
                                '<label class="input-label">' + this.textBottom + '</label>',
                                '<div id="page-margins-spin-bottom"></div>',
                            '</td>',
                        '</tr>',
                        '<tr>',
                            '<td class="padding-small padding-right-10" style="padding-bottom: 16px;">',
                                '<label class="input-label">' + this.textLeft + '</label>',
                                '<div id="page-margins-spin-left"></div>',
                            '</td>',
                            '<td class="padding-small" style="padding-bottom: 16px;">',
                                '<label class="input-label">' + this.textRight + '</label>',
                                '<div id="page-margins-spin-right"></div>',
                            '</td>',
                        '</tr>',
                        '<tr>',
                            '<td colspan="2" class="padding-small" style="padding-bottom: 4px;">',
                                '<label class="input-label">' + this.textCenter + '</label>',
                            '</td>',
                        '</tr>',
                        '<tr>',
                            '<td colspan="2" class="padding-small" style="padding-bottom: 8px;">',
                                '<div id="page-margins-chk-vert"></div>',
                            '</td>',
                        '</tr>',
                        '<tr>',
                            '<td colspan="2" class="padding-small">',
                                '<div id="page-margins-chk-hor"></div>',
                            '</td>',
                        '</tr>',
                    '</table>',
                '</div>'
            ].join('');

            this.options.tpl = _.template(this.template)(this.options);

            this.spinners = [];
            this._noApply = false;
            this.maxMarginsW = this.maxMarginsH = 0;

            Common.UI.Window.prototype.initialize.call(this, this.options);
        },

        render: function() {
            Common.UI.Window.prototype.render.call(this);
            var $window = this.getChild();

            this.spnTop = new Common.UI.MetricSpinner({
                el: $('#page-margins-spin-top', $window),
                step: .1,
                width: 86,
                defaultUnit : "cm",
                value: '0',
                maxValue: 48.25,
                minValue: 0
            });
            this.spinners.push(this.spnTop);

            this.spnBottom = new Common.UI.MetricSpinner({
                el: $('#page-margins-spin-bottom', $window),
                step: .1,
                width: 86,
                defaultUnit : "cm",
                value: '0',
                maxValue: 48.25,
                minValue: 0
            });
            this.spinners.push(this.spnBottom);

            this.spnLeft = new Common.UI.MetricSpinner({
                el: $('#page-margins-spin-left', $window),
                step: .1,
                width: 86,
                defaultUnit : "cm",
                value: '0.19 cm',
                maxValue: 48.25,
                minValue: 0
            });
            this.spinners.push(this.spnLeft);

            this.spnRight = new Common.UI.MetricSpinner({
                el: $('#page-margins-spin-right', $window),
                step: .1,
                width: 86,
                defaultUnit : "cm",
                value: '0.19 cm',
                maxValue: 48.25,
                minValue: 0
            });
            this.spinners.push(this.spnRight);

            this.chVert = new Common.UI.CheckBox({
                el: $('#page-margins-chk-vert', $window),
                labelText: this.textVert
            });

            this.chHor = new Common.UI.CheckBox({
                el: $('#page-margins-chk-hor', $window),
                labelText: this.textHor
            });

            $window.find('.dlg-btn').on('click', _.bind(this.onBtnClick, this));
            $window.find('input').on('keypress', _.bind(this.onKeyPress, this));

            this.updateMetricUnit();
        },

        getFocusedComponents: function() {
            return this.spinners.concat([this.chVert, this.chHor]).concat(this.getFooterButtons());
        },

        getDefaultFocusableComponent: function () {
            return this.spnTop;
        },

        onPrimary: function() {
            this._handleInput('ok');
            return false;
        },

        _handleInput: function(state) {
            if (this.options.handler) {
                if (state == 'ok') {
                    var me = this,
                        result = null,
                        top = this.spnTop.getNumberValue(),
                        bottom = this.spnBottom.getNumberValue(),
                        left = this.spnLeft.getNumberValue(),
                        right = this.spnRight.getNumberValue();
                    if (left > this.maxMarginsW) result = 'left'; else
                    if (right > this.maxMarginsW-left) result = 'right'; else
                    if (top > this.maxMarginsH) result = 'top'; else
                    if (bottom > this.maxMarginsH-top) result = 'bottom';
                    if (result) {
                        Common.UI.warning({
                            title: this.textWarning,
                            msg: this.warnCheckMargings,
                            callback: function() {
                                switch (result) {
                                    case 'left':
                                        me.spnLeft.focus();
                                        return;
                                    case 'right':
                                        me.spnRight.focus();
                                        return;
                                    case 'top':
                                        me.spnTop.focus();
                                        return;
                                    case 'bottom':
                                        me.spnBottom.focus();
                                        return;
                                }
                            }
                        });
                        return;
                    }
                }
                this.options.handler.call(this, this, state);
            }

            this.close();
        },

        onBtnClick: function(event) {
            this._handleInput(event.currentTarget.attributes['result'].value);
        },

        onKeyPress: function(event) {
            if (event.keyCode == Common.UI.Keys.RETURN) {
                this._handleInput('ok');
            }
        },

        setSettings: function (props) {
            if (props) {
                var margins = props.asc_getPageMargins(),
                    pageSetup = props.asc_getPageSetup();
                this.maxMarginsH = Common.Utils.Metric.fnRecalcFromMM(pageSetup.asc_getHeight());
                this.maxMarginsW = Common.Utils.Metric.fnRecalcFromMM(pageSetup.asc_getWidth());

                this.spnTop.setValue(Common.Utils.Metric.fnRecalcFromMM(margins.asc_getTop()), true);
                this.spnBottom.setValue(Common.Utils.Metric.fnRecalcFromMM(margins.asc_getBottom()), true);
                this.spnLeft.setValue(Common.Utils.Metric.fnRecalcFromMM(margins.asc_getLeft()), true);
                this.spnRight.setValue(Common.Utils.Metric.fnRecalcFromMM(margins.asc_getRight()), true);

                this.chVert.setValue(!!props.asc_getVerticalCentered());
                this.chHor.setValue(!!props.asc_getHorizontalCentered());
            }
        },

        getSettings: function() {
            var props = new Asc.asc_CPageMargins();
            props.asc_setTop(Common.Utils.Metric.fnRecalcToMM(this.spnTop.getNumberValue()));
            props.asc_setBottom(Common.Utils.Metric.fnRecalcToMM(this.spnBottom.getNumberValue()));
            props.asc_setLeft(Common.Utils.Metric.fnRecalcToMM(this.spnLeft.getNumberValue()));
            props.asc_setRight(Common.Utils.Metric.fnRecalcToMM(this.spnRight.getNumberValue()));

            return {margins: props, vertical: this.chVert.getValue()==='checked', horizontal: this.chHor.getValue()==='checked'};
        },

        updateMetricUnit: function() {
            if (this.spinners) {
                for (var i=0; i<this.spinners.length; i++) {
                    var spinner = this.spinners[i];
                    spinner.setDefaultUnit(Common.Utils.Metric.getCurrentMetricName());
                }
            }
        },

        textTitle: 'Margins',
        textTop: 'Top',
        textLeft: 'Left',
        textBottom: 'Bottom',
        textRight: 'Right',
        textWarning: 'Warning',
        warnCheckMargings: 'Margins are incorrect',
        textCenter: 'Center on page',
        textVert: 'Vertically',
        textHor: 'Horizontally'
    }, SSE.Views.PageMarginsDialog || {}))
});