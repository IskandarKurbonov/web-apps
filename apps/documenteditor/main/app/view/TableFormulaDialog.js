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
    'common/main/lib/component/InputField',
    'common/main/lib/component/Window'
], function () { 'use strict';

    DE.Views.TableFormulaDialog = Common.UI.Window.extend(_.extend({
        options: {
            width: 300,
            style: 'min-width: 230px;',
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
                        '<label>' + this.textFormula + '</label>',
                    '</div>',
                    '<div id="id-dlg-formula-formula" class="input-row" style="margin-bottom: 5px;"></div>',
                    '<div class="input-row">',
                        '<label>' + this.textFormat + '</label>',
                    '</div>',
                    '<div id="id-dlg-formula-format" class="input-row" style="margin-bottom: 20px;"></div>',
                    '<div class="input-row" style="margin-bottom: 10px;">',
                        '<div id="id-dlg-formula-function" style="display: inline-block; width: 50%;" class="float-left padding-right-10"></div>',
                        '<div id="id-dlg-formula-bookmark" style="display: inline-block; width: 50%;"></div>',
                    '</div>',
                    '</div>'
            ].join('');

            this.options.tpl = _.template(this.template)(this.options);
            this.bookmarks = this.options.bookmarks;
            this.api = this.options.api;

            Common.UI.Window.prototype.initialize.call(this, this.options);
        },

        render: function() {
            Common.UI.Window.prototype.render.call(this);

            var me = this,
                $window = this.getChild();

            this.inputFormula = new Common.UI.InputField({
                el          : $('#id-dlg-formula-formula'),
                allowBlank  : true,
                validateOnChange: true,
                style       : 'width: 100%;'
            }).on('changing', _.bind(this.checkFormulaInput, this));

            this.cmbFormat = new Common.UI.ComboBox({
                el          : $('#id-dlg-formula-format'),
                cls         : 'input-group-nr',
                menuStyle   : 'min-width: 100%; max-height: 200px;',
                takeFocusOnClose: true
            });

            this.cmbFunction = new Common.UI.ComboBox({
                el          : $('#id-dlg-formula-function'),
                cls         : 'input-group-nr',
                menuStyle   : 'min-width: 100%; max-height: 150px;',
                editable    : false,
                takeFocusOnClose: true,
                scrollAlwaysVisible: true,
                data: [
                    {displayValue: 'ABS', value: 1},
                    {displayValue: 'AND', value: 1},
                    {displayValue: 'AVERAGE', value: 1},
                    {displayValue: 'COUNT', value: 1},
                    {displayValue: 'DEFINED', value: 1},
                    {displayValue: 'FALSE', value: 0},
                    {displayValue: 'IF', value: 1},
                    {displayValue: 'INT', value: 1},
                    {displayValue: 'MAX', value: 1},
                    {displayValue: 'MIN', value: 1},
                    {displayValue: 'MOD', value: 1},
                    {displayValue: 'NOT', value: 1},
                    {displayValue: 'OR', value: 1},
                    {displayValue: 'PRODUCT', value: 1},
                    {displayValue: 'ROUND', value: 1},
                    {displayValue: 'SIGN', value: 1},
                    {displayValue: 'SUM', value: 1},
                    {displayValue: 'TRUE', value: 0}
                ]
            });
            this.cmbFunction.on('selected', _.bind(function(combo, record) {
                combo.setValue(this.textInsertFunction);
                var _input = me.inputFormula._input,
                    end = _input[0].selectionEnd;
                _input.val(_input.val().substring(0, end) + record.displayValue + (record.value ? '()' : '') + _input.val().substring(end));
                _input.focus();
                _input[0].selectionStart = _input[0].selectionEnd = end + record.displayValue.length + record.value;
                this.btnOk.setDisabled(false);
            }, this));
            this.cmbFunction.setValue(this.textInsertFunction);

            this.cmbBookmark = new Common.UI.ComboBox({
                el          : $('#id-dlg-formula-bookmark'),
                cls         : 'input-group-nr',
                menuStyle   : 'min-width: 100%; max-height: 150px;',
                editable    : false,
                takeFocusOnClose: true
            });
            this.cmbBookmark.on('selected', _.bind(function(combo, record) {
                combo.setValue(this.textBookmark);
                var _input = me.inputFormula._input,
                    end = _input[0].selectionEnd;
                _input.val(_input.val().substring(0, end) + record.displayValue + _input.val().substring(end));
                _input.focus();
                _input[0].selectionStart = _input[0].selectionEnd = end + record.displayValue.length;
                this.btnOk.setDisabled(false);
            }, this));
            this.cmbBookmark.setValue(this.textBookmark);

            me.btnOk = _.find(this.getFooterButtons(), function (item) {
                return (item.$el && item.$el.find('.primary').addBack().filter('.primary').length>0);
            }) || new Common.UI.Button({ el: $window.find('.primary') });

            $window.find('.dlg-btn').on('click', _.bind(this.onBtnClick, this));
            this.afterRender();
        },

        getFocusedComponents: function() {
            return [this.inputFormula, this.cmbFormat, this.cmbFunction, this.cmbBookmark].concat(this.getFooterButtons());
        },

        getDefaultFocusableComponent: function () {
            return this.inputFormula;
        },

        onSelectItem: function(picker, item, record, e){
            this.btnOk.setDisabled(record.get('level')==0 && record.get('index')>0);
        },

        afterRender: function() {
            this.refreshBookmarks();
            this._setDefaults();
        },

        _setDefaults: function () {
            var arr = [];
            _.each(this.api.asc_GetTableFormulaFormats(), function(item) {
                arr.push({value: item, displayValue: item});
            });
            this.cmbFormat.setData(arr);
            var formula = this.api.asc_ParseTableFormulaInstrLine(this.api.asc_GetTableFormula());
            this.inputFormula.setValue(formula[0]);
            this.cmbFormat.setValue(formula[1]);
            this.checkFormulaInput(this.inputFormula, this.inputFormula.getValue());
        },

        refreshBookmarks: function() {
            var arr = [];
            if (this.bookmarks) {
                var count = this.bookmarks.asc_GetCount();
                for (var i=0; i<count; i++) {
                    var name = this.bookmarks.asc_GetName(i);
                    if (!this.bookmarks.asc_IsInternalUseBookmark(name)) {
                        arr.push({value: i, displayValue: name});
                    }
                }
                this.cmbBookmark.setData(arr);
                this.cmbBookmark.setValue(this.textBookmark);
            }
            this.cmbBookmark.setDisabled(arr.length<1);
        },

        checkFormulaInput: function(cmp, newValue) {
            var value = newValue.trim();
            this.btnOk.setDisabled(value=='' || value == '=');
        },

        getSettings: function () {
            return this.api.asc_CreateInstructionLine(this.inputFormula.getValue(), this.cmbFormat.getValue());
        },

        onBtnClick: function(event) {
            this._handleInput(event.currentTarget.attributes['result'].value);
        },

        onPrimary: function(event) {
            this._handleInput('ok');
            return false;
        },

        _handleInput: function(state) {
            if (this.options.handler) {
                this.options.handler.call(this, state, this.getSettings());
            }

            this.close();
        },

        textFormula: 'Formula',
        textFormat: 'Number Format',
        textBookmark: 'Paste Bookmark',
        textInsertFunction: 'Paste Function',
        textTitle:          'Formula Settings'
    }, DE.Views.TableFormulaDialog || {}))
});