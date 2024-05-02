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
    'common/main/lib/view/AdvancedSettingsWindow',
    'common/main/lib/component/ListView'
], function () {
    'use strict';

    SSE.Views = SSE.Views || {};

    SSE.Views.PivotShowDetailDialog =  Common.Views.AdvancedSettingsWindow.extend(_.extend({
        options: {
            alias: 'PivotShowDetailDialog',
            separator: false,
            contentWidth: 300
        },

        initialize: function (options) {
            var me = this;

            _.extend(this.options, {
                title: this.txtTitle,
                contentStyle: 'padding: 0;',
                contentTemplate: _.template([
                    '<div class="settings-panel active">',
                        '<div class="inner-content">',
                                '<table cols="1" style="width: 100%;">',
                                    '<tr>',
                                        '<td>',
                                            '<label class="input-label">', me.textDescription,'</label>',
                                            '<div id="pivot-show-detail-list" class="range-tableview" style="width:100%; height: 165px;"></div>',
                                        '</td>',
                                    '</tr>',
                                '</table>',
                            '</div></div>'
                ].join(''))({scope: this})
            }, options);

            this.handler    = options.handler;
            this.fieldsNames = options.fieldsNames || [];

            Common.Views.AdvancedSettingsWindow.prototype.initialize.call(this, this.options);
        },
        render: function () {
            Common.Views.AdvancedSettingsWindow.prototype.render.call(this);

            this.rangeList = new Common.UI.ListView({
                el: $('#pivot-show-detail-list', this.$window),
                store: new Common.UI.DataViewStore(),
                simpleAddMode: true,
                cls: 'dbl-clickable',
                itemTemplate: _.template([
                    '<div style="pointer-events:none;">',
                        '<div id="<%= id %>" class="list-item" style="width: 100%;display:inline-block;">',
                            '<div class="padding-right-5" style="width:186px;"><%= Common.Utils.String.htmlEncode(name) %></div>',
                        '</div>',
                    '</div>'
                ].join('')),
                tabindex: 1
            });
            this.rangeList.on('item:dblclick', _.bind(this.onDblClickFunction, this));
            this.rangeList.on('entervalue', _.bind(this.onPrimary, this));

            this.afterRender();
        },

        getFocusedComponents: function() {
            return [this.rangeList].concat(this.getFooterButtons());
        },

        getDefaultFocusableComponent: function () {
            return this.rangeList;
        },

        afterRender: function() {
            this._setDefaults();
        },

        _setDefaults: function () {
            if(this.fieldsNames) {
                var me = this;
                this.rangeList.store.reset(this.fieldsNames);
                if (this.rangeList.store.length>0)
                    this.rangeList.selectByIndex(0);
                this.rangeList.scroller.update({alwaysVisibleY: true});
                _.delay(function () {
                    me.rangeList.focus();
                }, 100, this);
            }
        },

        getSettings: function() {
            var rec = this.rangeList.getSelectedRec();
            return (rec) ? {index: rec.get('index'), name: rec.get('name')}: null;
        },

        onPrimary: function() {
            this.handler && this.handler.call(this, 'ok', this.getSettings());
            this.close();
            return false;
        },

        onDlgBtnClick: function(event) {
            var state = event.currentTarget.attributes['result'].value;
            this.handler && this.handler.call(this, state,  (state == 'ok') ? this.getSettings() : undefined);
            this.close();
        },

        onDblClickFunction: function () {
            this.handler && this.handler.call(this, 'ok',  this.getSettings());
            this.close();
        },

        txtTitle: 'Show Detail',
        textDescription: 'Choose the field containing the detail you want to show:'
    }, SSE.Views.PivotShowDetailDialog || {}));
});
