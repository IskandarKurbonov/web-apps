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
    'common/main/lib/util/utils',
    'common/main/lib/component/InputField',
    'common/main/lib/component/RadioBox',
    'common/main/lib/view/AdvancedSettingsWindow'
], function () { 'use strict';

    SSE.Views.ImportFromXmlDialog = Common.Views.AdvancedSettingsWindow.extend(_.extend({
        options: {
            contentWidth: 310,
            separator: false
        },

        initialize : function(options) {
            var me = this;

            _.extend(this.options, {
                title: this.textTitle,
                contentStyle: 'padding: 0 10px;',
                contentTemplate: _.template([
                    '<div class="settings-panel active">',
                        '<div class="inner-content">',
                                '<table cols="1" style="width: 100%;">',
                                    '<tr>',
                                        '<td class="padding-small">',
                                            '<label class="input-label">' + me.textDestination + '</label>',
                                        '</td>',
                                    '</tr>',
                                    '<tr>',
                                        '<td class="padding-small">',
                                            '<div id="import-xml-radio-new"></div>',
                                        '</td>',
                                    '</tr>',
                                    '<tr>',
                                        '<td class="padding-small">',
                                            '<div id="import-xml-radio-exist"></div>',
                                        '</td>',
                                    '</tr>',
                                    '<tr>',
                                        '<td class="padding-small padding-left-22">',
                                            '<div id="import-xml-input-dest" class="input-row" style=""></div>',
                                        '</td>',
                                    '</tr>',
                                '</table>',
                            '</div></div>'
                ].join(''))({scope: this})
            }, options);

            this.api = options.api;

            this.options.handler = function(result, value) {
                if ( result != 'ok' || this.isRangeValid() ) {
                    if (options.handler)
                        options.handler.call(this, result, value);
                    return;
                }
                return true;
            };

            this.dataDestValid = '';

            Common.Views.AdvancedSettingsWindow.prototype.initialize.call(this, this.options);
        },

        render: function() {
            Common.Views.AdvancedSettingsWindow.prototype.render.call(this);
            var me = this;

            this.txtDestRange = new Common.UI.InputFieldBtn({
                el          : $('#import-xml-input-dest'),
                name        : 'range',
                style       : 'width: 100%;',
                btnHint     : this.textSelectData,
                allowBlank  : true,
                validateOnChange: true,
                validateOnBlur: false
            });
            this.txtDestRange.on('button:click', _.bind(this.onSelectData, this, 'dest'));

            this.radioNew = new Common.UI.RadioBox({
                el: $('#import-xml-radio-new'),
                labelText: this.textNew,
                name: 'asc-radio-xml-dest'
            }).on('change', function(field, newValue) {
                me.txtDestRange.setDisabled(newValue);
                me.txtDestRange.showError();
            });

            this.radioExist = new Common.UI.RadioBox({
                el: $('#import-xml-radio-exist'),
                labelText: this.textExist,
                name: 'asc-radio-xml-dest',
                checked: true
            }).on('change', function(field, newValue) {
                me.txtDestRange.setDisabled(!newValue);
                me.txtDestRange.cmpEl.find('input').focus();
            });

            this.afterRender();
        },

        getFocusedComponents: function() {
            return [this.radioNew, this.radioExist, this.txtDestRange].concat(this.getFooterButtons());
        },

        getDefaultFocusableComponent: function () {
            if (this._alreadyRendered) return; // focus only at first show
            this._alreadyRendered = true;
            return this.txtDestRange;
        },

        afterRender: function() {
            this._setDefaults();
        },

        _setDefaults: function () {
            var me = this;
            this.txtDestRange.validation = function(value) {
                var isvalid = me.api.asc_checkDataRange(Asc.c_oAscSelectionDialogType.ImportXml, value, false);
                return (isvalid==Asc.c_oAscError.ID.DataRangeError) ? me.textInvalidRange : true;
            };
            var range = this.api.asc_getActiveRangeStr(Asc.referenceType.A);
            this.txtDestRange.setValue(range);
            this.dataDestValid = range;
        },

        getSettings: function () {
            var dest = this.radioExist.getValue() ? this.txtDestRange.getValue() : null;

            return {destination: dest};
        },

        isRangeValid: function() {
            var isvalid = true,
                txtError = '';

            if (this.radioExist.getValue()) {
                if (_.isEmpty(this.txtDestRange.getValue())) {
                    isvalid = false;
                    txtError = this.txtEmpty;
                } else {
                    isvalid = this.api.asc_checkDataRange(Asc.c_oAscSelectionDialogType.ImportXml, this.txtDestRange.getValue());
                    isvalid = (isvalid == Asc.c_oAscError.ID.No);
                    !isvalid && (txtError = this.textInvalidRange);
                }
                if (!isvalid) {
                    this.txtDestRange.showError([txtError]);
                    this.txtDestRange.cmpEl.find('input').focus();
                    return isvalid;
                }
            }

            return isvalid;
        },

        onSelectData: function(type) {
            var me = this,
                txtRange = me.txtDestRange;

            if (me.api) {
                var handlerDlg = function(dlg, result) {
                    if (result == 'ok') {
                        var txt = dlg.getSettings();
                        me.dataDestValid = txt;
                        txtRange.setValue(txt);
                        txtRange.checkValidate();
                    }
                };

                var win = new SSE.Views.CellRangeDialog({
                    handler: handlerDlg
                }).on('close', function() {
                    me.show();
                    _.delay(function(){
                        txtRange.focus();
                    },1);
                });

                var xy = me.$window.offset();
                me.hide();
                win.show(xy.left + 160, xy.top + 125);
                win.setSettings({
                    api     : me.api,
                    range   : (!_.isEmpty(txtRange.getValue()) && (txtRange.checkValidate()==true)) ? txtRange.getValue() : me.dataDestValid,
                    type    : Asc.c_oAscSelectionDialogType.ImportXml
                });
            }
        },

        textTitle: 'Import Data',
        textSelectData: 'Select data',
        textDestination: 'Choose, where to place the data',
        textNew: 'New worksheet',
        textExist: 'Existing worksheet',
        txtEmpty:           'This field is required',
        textInvalidRange:   'Invalid cells range'
    }, SSE.Views.ImportFromXmlDialog || {}))
});