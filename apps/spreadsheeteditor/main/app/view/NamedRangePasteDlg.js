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

    SSE.Views.NamedRangePasteDlg =  Common.Views.AdvancedSettingsWindow.extend(_.extend({
        options: {
            alias: 'NamedRangePasteDlg',
            separator: false,
            contentWidth: 250
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
                                            '<label class="input-label">', me.textNames,'</label>',
                                            '<div id="named-range-paste-list" class="range-tableview" style="width:100%; height: 169px;"></div>',
                                        '</td>',
                                    '</tr>',
                                '</table>',
                            '</div></div>'
                ].join(''))({scope: this})
            }, options);

            this.handler    = options.handler;
            this.ranges     = options.ranges || [];

            Common.Views.AdvancedSettingsWindow.prototype.initialize.call(this, this.options);
        },
        render: function () {
            Common.Views.AdvancedSettingsWindow.prototype.render.call(this);
            var me = this;

            this.rangeList = new Common.UI.ListView({
                el: $('#named-range-paste-list', this.$window),
                store: new Common.UI.DataViewStore(),
                simpleAddMode: true,
                cls: 'dbl-clickable',
                itemTemplate: _.template([
                    '<div style="pointer-events:none;">',
                        '<div id="<%= id %>" class="list-item" style="width: 100%;display:inline-block;">',
                            '<div class="listitem-icon toolbar__icon margin-right-5 <% print(isTable?"btn-menu-table":(isSlicer ? "btn-slicer" : "btn-named-range")) %>"></div>',
                            '<div class="padding-right-5" style="width:186px;"><%= Common.Utils.String.htmlEncode(name) %></div>',
                        '</div>',
                    '</div>'
                ].join('')),
                tabindex: 1
            });
            this.rangeList.store.comparator = function(item1, item2) {
                var n1 = item1.get('name').toLowerCase(),
                    n2 = item2.get('name').toLowerCase();
                if (n1==n2) return 0;
                return (n1<n2) ? -1 : 1;
            };
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
            if (this.ranges) {
                var me = this, arr = [], prev_name='';
                for (var i=0; i<this.ranges.length; i++) {
                    var name = this.ranges[i].asc_getName(true);
                    if (name !== prev_name) {
                        var type = this.ranges[i].asc_getType();
                        arr.push({
                            name: name,
                            scope: this.ranges[i].asc_getScope(),
                            range: this.ranges[i].asc_getRef(),
                            type: type,
                            isTable: type===Asc.c_oAscDefNameType.table,
                            isSlicer: type===Asc.c_oAscDefNameType.slicer
                        });
                    }
                    prev_name = name;
                }
                this.rangeList.store.reset(arr);
                this.rangeList.store.sort();
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
            return (rec) ? (new Asc.asc_CDefName(rec.get('name'), rec.get('range'), rec.get('scope'), rec.get('type'), undefined, undefined, undefined, true)) : null;
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

        txtTitle: 'Paste Name',
        textNames: 'Named Ranges'
    }, SSE.Views.NamedRangePasteDlg || {}));
});
