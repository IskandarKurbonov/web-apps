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

/**
 * User: Julia.Radzhabova
 * Date: 06.03.15
 * Time: 11:46
 */

if (Common === undefined)
    var Common = {};

Common.Views = Common.Views || {};

define([
    'common/main/lib/util/utils',
    'common/main/lib/component/BaseView',
    'common/main/lib/component/Layout'
], function (template) {
    'use strict';

    Common.Views.History = Common.UI.BaseView.extend(_.extend({
        el: '#left-panel-history',

        storeHistory: undefined,
        template: _.template([
            '<div id="history-box" class="layout-ct vbox">',
                '<div id="history-header" class="">',
                    '<div id="history-btn-back"><%=scope.textCloseHistory%></div>',
                '</div>',
                '<div id="history-list" class="">',
                '</div>',
                '<div id="history-expand-changes" class="">',
                    '<div id="history-btn-expand"><%=scope.textHideAll%></div>',
                '</div>',
            '</div>'
        ].join('')),

        initialize: function(options) {
            _.extend(this, options);
            Common.UI.BaseView.prototype.initialize.call(this, arguments);

            var filter = Common.localStorage.getKeysFilter();
            this.appPrefix = (filter && filter.length) ? filter.split(',')[0] : '';
        },

        render: function(el) {
            el = el || this.el;
            $(el).html(this.template({scope: this})).width( (parseInt(Common.localStorage.getItem(this.appPrefix + 'mainmenu-width')) || MENU_SCALE_PART) - SCALE_MIN);

            this.viewHistoryList = new Common.UI.DataView({
                el: $('#history-list'),
                store: this.storeHistory,
                enableKeyEvents: false,
                itemTemplate: _.template([
                    '<div id="<%= id %>" class="history-item-wrap ' + '<% if (!isVisible) { %>' + 'hidden' + '<% } %>' + '" ',
                    'style="display: block; ' + '<% if (!isRevision) { %>' + (Common.UI.isRTL() ? 'padding-right: 40px;' : 'padding-left: 40px;') + '<% } %>' + '<% if (canRestore && selected) { %>' + 'padding-bottom: 6px;' + '<% } %>' +'">',
                        '<div class="user-date"><%= created %></div>',
                        '<% if (markedAsVersion) { %>',
                        '<div class="user-version">' + this.textVer + '<%=version%></div>',
                        '<% } %>',
                        '<% if (isRevision && hasChanges) { %>',
                            '<div class="revision-expand  ' + '<% if (isExpanded) { %>' + 'up' + '<% } %>' + '"></div>',
                        '<% } %>',
                        '<div class="user-name">',
                            '<div class="color"', 
                                '<% if (avatar) { %>',
                                    'style="background-image: url(<%=avatar%>); <% if (usercolor!==null) { %> border-color:<%=usercolor%>; border-style:solid;<% }%>"', 
                                '<% } else { %>',
                                    'style="background-color: <% if (usercolor!==null) { %> <%=usercolor%> <% } else { %> #cfcfcf <% }%>;"',
                                '<% } %>',
                            '><% if (!avatar) { %><%-initials%><% } %></div>',
                            '<span><%= Common.Utils.String.htmlEncode(AscCommon.UserInfoParser.getParsedName(username)) %></span>',
                        '</div>',
                        '<% if (canRestore && selected) { %>',
                            '<label class="revision-restore" role="presentation" tabindex="-1">' + this.textRestore + '</label>',
                        '<% } %>',
                    '</div>'
                ].join(''))
            });

            var me = this;
            this.viewHistoryList.onClickItem = function(view, record, e) {
                var btn = $(e.target);
                if (btn && btn.hasClass('revision-expand')) {
                    var isExpanded = !record.get('isExpanded');
                    record.set('isExpanded', isExpanded);
                    var rev, revisions = me.storeHistory.findRevisions(record.get('revision'));
                    if (revisions && revisions.length>1) {
                        for(var i=1; i<revisions.length; i++)
                            revisions[i].set('isVisible', isExpanded);
                    }
                    this.scroller.update({minScrollbarLength: this.minScrollbarLength});
                } else
                    Common.UI.DataView.prototype.onClickItem.call(this, view, record, e);
                me.btnExpand.cmpEl.text(me.storeHistory.hasCollapsed() ? me.textShowAll : me.textHideAll);
            };

            var changetooltip = function (dataview, view, record) {
                if (record.get('isRevision')) {
                    if (view.btnTip) {
                        view.btnTip.dontShow = true;
                        view.btnTip.tip().remove();
                        view.btnTip = null;
                    }
                    var btns = $(view.el).find('.revision-expand').tooltip({title: (record.get('isExpanded')) ? me.textHide : me.textShow, placement: 'cursor'});
                    if (btns.length>0)
                        view.btnTip = btns.data('bs.tooltip');
                }
            };
            this.viewHistoryList.on('item:add', changetooltip);
            this.viewHistoryList.on('item:change', changetooltip);

            this.btnBackToDocument = new Common.UI.Button({
                el: $('#history-btn-back'),
                enableToggle: false
            });

            this.btnExpand = new Common.UI.Button({
                el: $('#history-btn-expand'),
                enableToggle: false
            });

            this.trigger('render:after', this);
            return this;
        },

        textRestore: 'Restore',
        textShow: 'Expand',
        textHide: 'Collapse',
        textCloseHistory: 'Close History',
        textHideAll: 'Hide detailed changes',
        textShowAll: 'Show detailed changes',
        textVer: 'ver.'

    }, Common.Views.History || {}))
});