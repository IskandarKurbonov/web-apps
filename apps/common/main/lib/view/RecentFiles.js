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

if (Common === undefined)
    var Common = {};

Common.Views = Common.Views || {};

define([
    'common/main/lib/component/BaseView'
], function () {
    'use strict'
    Common.Views.RecentFiles = Common.UI.BaseView.extend(_.extend({
        menu: undefined,

        template: _.template([
            '<div class="header"><%= scope.txtOpenRecent %></div>',
            '<div id="id-recent-view"></div>'
        ].join('')),

        initialize: function(options) {
            Common.UI.BaseView.prototype.initialize.call(this,arguments);

            this.menu = options.menu;
            this.recent = options.recent;
            this.el = options.el;

            Common.NotificationCenter.on('update:recents', function (arr) {
                if ( this.viewRecentPicker ) {
                    const store = this.viewRecentPicker.store;
                    if ( store ) {
                        store.reset(this.recent.concat(arr))
                    }
                }
            }.bind(this));
        },

        render: function() {
            this.$el.html(this.template({scope: this}));

            this.viewRecentPicker = new Common.UI.DataView({
                el: $('#id-recent-view'),
                store: new Common.UI.DataViewStore(this.recent),
                itemTemplate: _.template([
                    '<div class="recent-wrap">',
                        '<div class="recent-icon">',
                            '<div>',
                                '<div class= <% if (typeof format !== "undefined") {%> "img-format-<%=format %>"<% } else {%> "svg-file-recent"<%} %>></div>',
                            '</div>',
                        '</div>',
                        '<div class="file-name"><% if (typeof title !== "undefined") {%><%= Common.Utils.String.htmlEncode(title || "") %><% } %></div>',
                        '<div class="file-info"><% if (typeof folder !== "undefined") {%><%= Common.Utils.String.htmlEncode(folder || "") %><% } %></div>',
                    '</div>'
                ].join(''))
            });

            this.viewRecentPicker.on('item:click', _.bind(this.onRecentFileClick, this));

            if (_.isUndefined(this.scroller)) {
                this.scroller = new Common.UI.Scroller({
                    el: this.$el,
                    suppressScrollX: true,
                    alwaysVisibleY: true
                });
            }

            return this;
        },

        show: function() {
            Common.UI.BaseView.prototype.show.call(this,arguments);
            this.scroller && this.scroller.update();
        },

        onRecentFileClick: function(view, itemview, record){
            if ( this.menu ) {
                !Common.Controllers.Desktop.openRecent(record) &&
                    this.menu.fireEvent('recent:open', [this.menu, record.get('url')]);
            }
        },

        txtOpenRecent: 'Open Recent'
    }, Common.Views.RecentFiles || {}));
});