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
    'common/main/lib/component/ListView',
    'common/main/lib/component/InputField',
    'common/main/lib/view/AdvancedSettingsWindow'
], function () { 'use strict';

    SSE.Views.MacroDialog = Common.Views.AdvancedSettingsWindow.extend(_.extend({
        options: {
            contentWidth: 250,
            separator: false
        },

        initialize : function(options) {
            var me = this;

            _.extend(this.options, {
                title: this.textTitle,
                contentStyle: 'padding: 0 5px;',
                contentTemplate: _.template([
                    '<div class="settings-panel active">',
                    '<div class="inner-content">',
                        '<table cols="1" style="width: 100%;">',
                            '<tr>',
                                '<td class="padding-extra-small">',
                                    '<label class="input-label">', me.textMacro, '</label>',
                                '</td>',
                            '</tr>',
                            '<tr>',
                                '<td class="padding-small">',
                                    '<div id="macro-dlg-txt-name"></div>',
                                '</td>',
                            '</tr>',
                            '<tr>',
                                '<td>',
                                    '<div id="macro-dlg-list" style="width:100%; height: 169px;"></div>',
                                '</td>',
                            '</tr>',
                        '</table>',
                    '</div></div>'
                ].join(''))({scope: this})
            }, options);

            this.handler    = options.handler;
            this.props      = options.props;

            Common.Views.AdvancedSettingsWindow.prototype.initialize.call(this, this.options);
        },

        render: function() {
            Common.Views.AdvancedSettingsWindow.prototype.render.call(this);
            var me = this;

            this.txtName = new Common.UI.InputField({
                el          : $('#macro-dlg-txt-name'),
                allowBlank  : true,
                validateOnChange: true,
                validateOnBlur: true,
                style       : 'width: 100%;',
                value       : '',
                maxLength: 40,
                validation  : function(value) { return true; }
            }).on ('changing', function (input, value) {
                me.findMacro(value);
            });

            this.macroList = new Common.UI.ListView({
                el: $('#macro-dlg-list', this.$window),
                store: new Common.UI.DataViewStore(),
                tabindex: 1,
                cls: 'dbl-clickable',
                itemTemplate: _.template('<div id="<%= id %>" class="list-item" style="overflow: hidden; text-overflow: ellipsis;width:216px;"><%= Common.Utils.String.htmlEncode(value) %></div>')
            });
            this.macroList.on('item:dblclick', _.bind(this.onDblClickMacro, this));
            this.macroList.on('entervalue', _.bind(this.onPrimary, this));
            this.macroList.on('item:select', _.bind(this.onSelectMacro, this));

            this.afterRender();
        },

        getFocusedComponents: function() {
            return [this.txtName, this.macroList].concat(this.getFooterButtons());
        },

        getDefaultFocusableComponent: function() {
            return this.txtName;
        },

        afterRender: function() {
            this._setDefaults(this.props);
        },

        _setDefaults: function (props) {
            this.props = props;
            this.refreshList();
        },

        getSettings: function () {
            return this.txtName.getValue();
        },

        onDlgBtnClick: function(event) {
            var state = event.currentTarget.attributes['result'].value;
            this.handler && this.handler.call(this, state,  (state == 'ok') ? this.getSettings() : undefined);
            this.close();
        },

        onPrimary: function() {
            this.handler && this.handler.call(this, 'ok', this.getSettings());
            this.close();
            return false;
        },

        refreshList: function() {
            if (this.props && this.props.macroList) {
                var list = this.props.macroList;
                var arr = [];
                for (var i=0; i<list.length; i++) {
                    arr.push({
                        value: list[i]
                    });
                }
                this.macroList.store.reset(arr);
                if (this.props.current) {
                    this.txtName.setValue(this.props.current);
                    this.findMacro(this.props.current);
                }
            }
        },

        onSelectMacro: function(listView, itemView, record) {
            if (!record) return;
            this.txtName.setValue(record.get('value'));
        },

        onDblClickMacro: function(listView, itemView, record) {
            this.handler && this.handler.call(this, 'ok',  this.getSettings());
            this.close();
        },

        findMacro: function(value) {
            var rec = this.macroList.store.findWhere({value: value});
            if (rec) {
                this.macroList.selectRecord(rec);
                this.macroList.scrollToRecord(rec);
            } else
                this.macroList.deselectAll();
        },

        textTitle: 'Assign Macro',
        textMacro: 'Macro name'
    }, SSE.Views.MacroDialog || {}))
});