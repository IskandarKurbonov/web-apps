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
 * Date: 14.12.17
 */

define([
    'core',
    'pdfeditor/main/app/collection/Navigation',
    'pdfeditor/main/app/view/Navigation'
], function () {
    'use strict';

    PDFE.Controllers.Navigation = Backbone.Controller.extend(_.extend({
        models: [],
        collections: [
            'Navigation'
        ],
        views: [
            'Navigation'
        ],

        initialize: function() {
            var me = this;
            this.addListeners({
                'Navigation': {
                    'show': function() {
                        if (me.panelNavigation && me.panelNavigation.viewNavigationList) {
                            me.panelNavigation.viewNavigationList.scroller && me.panelNavigation.viewNavigationList.scroller.update({alwaysVisibleY: true});
                            me.panelNavigation.viewNavigationList.focus();
                        }
                    }
                }
            });
        },

        events: function() {
        },

        onLaunch: function() {
            this.panelNavigation= this.createView('Navigation', {
                storeNavigation: this.getApplication().getCollection('Navigation')
            });
            this.panelNavigation.on('render:after', _.bind(this.onAfterRender, this));
            this._viewerNavigationObject = null;
            this._isDisabled = false;
        },

        setApi: function(api) {
            this.api = api;
            this.api.asc_registerCallback('asc_onViewerBookmarksUpdate', _.bind(this.updateViewerNavigation, this));
            return this;
        },

        setMode: function(mode) {
            this.mode = mode;
            this.canUseViwerNavigation = this.mode.canUseViwerNavigation;
            return this;
        },

        onAfterRender: function(panelNavigation) {
            panelNavigation.viewNavigationList.on('item:click', _.bind(this.onSelectItem, this));
            panelNavigation.viewNavigationList.on('item:contextmenu', _.bind(this.onItemContextMenu, this));
            panelNavigation.viewNavigationList.on('item:add', _.bind(this.onItemAdd, this));
            panelNavigation.navigationMenu.on('item:click',           _.bind(this.onMenuItemClick, this));
            panelNavigation.navigationMenu.items[2].menu.on('item:click', _.bind(this.onMenuLevelsItemClick, this));
            panelNavigation.btnSettingsMenu.on('item:click',           _.bind(this.onMenuSettingsItemClick, this));
            panelNavigation.btnSettingsMenu.items[2].menu.on('item:click', _.bind(this.onMenuLevelsItemClick, this));
            panelNavigation.btnSettingsMenu.items[4].menu.on('item:click', _.bind(this.onMenuFontSizeClick, this));
            panelNavigation.btnClose.on('click', _.bind(this.onClickClosePanel, this));

            var viewport = this.getApplication().getController('Viewport').getView('Viewport');
            viewport.hlayout.on('layout:resizedrag',  function () {
                if (panelNavigation.viewNavigationList && panelNavigation.viewNavigationList.scroller)
                    panelNavigation.viewNavigationList.scroller.update({alwaysVisibleY: true});
            });
        },

        onItemContextMenu: function(picker, item, record, e){
            var showPoint;
            var menu = this.panelNavigation.navigationMenu;
            if (menu.isVisible()) {
                menu.hide();
            }

            var parentOffset = this.panelNavigation.$el.offset(),
                top = e.clientY*Common.Utils.zoom();
            showPoint = [e.clientX*Common.Utils.zoom() + 5, top - parentOffset.top + 5];

            if (showPoint != undefined) {
                var menuContainer = this.panelNavigation.$el.find('#menu-navigation-container');
                if (!menu.rendered) {
                    if (menuContainer.length < 1) {
                        menuContainer = $('<div id="menu-navigation-container" style="position: absolute; z-index: 10000;"><div class="dropdown-toggle" data-toggle="dropdown"></div></div>', menu.id);
                        $(this.panelNavigation.$el).append(menuContainer);
                    }
                    menu.render(menuContainer);
                    menu.cmpEl.attr({tabindex: "-1"});
                }
                menu.cmpEl.attr('data-value', record.get('index'));
                menuContainer.css({
                    left: showPoint[0],
                    top: showPoint[1]
                });
                menu.show();
                _.delay(function() {
                    menu.cmpEl.focus();
                }, 10);
            }

        },

        onSelectItem: function(picker, item, record, e){
            this._viewerNavigationObject && this.api.asc_viewerNavigateTo(record.get('index'));
        },

        onItemAdd: function(picker, item, record, e){
            record.set('dataItem', item);
        },

        onMenuItemClick: function (menu, item) {
            if (!this._viewerNavigationObject) return;
            if (item.value == 'expand') {
                this.panelNavigation.viewNavigationList.expandAll();
            } else  if (item.value == 'collapse') {
                this.panelNavigation.viewNavigationList.collapseAll();
            }
        },
        onClickClosePanel: function() {
            Common.NotificationCenter.trigger('leftmenu:change', 'hide');
        },

        onMenuSettingsItemClick: function (menu, item){
            switch (item.value){
                case 'expand':
                    this.panelNavigation.viewNavigationList.expandAll();
                    break;
                case 'collapse':
                    this.panelNavigation.viewNavigationList.collapseAll();
                    break;
                case 'wrap':
                    this.panelNavigation.changeWrapHeadings();
                    break;
            }
        },

        onMenuLevelsItemClick: function (menu, item) {
            this.panelNavigation.viewNavigationList.expandToLevel(item.value-1);
        },

        onMenuFontSizeClick: function (menu, item){
            this.panelNavigation.changeFontSize(item.value);
        },

        SetDisabled: function(state) {
            this._isDisabled = state;
        },

        updateViewerNavigation: function (bookmarks) {
            this._viewerNavigationObject = bookmarks.length > 0 ? bookmarks : null;
            if (this._viewerNavigationObject) {
                var count = this._viewerNavigationObject.length,
                    prev_level = -1,
                    header_level = -1,
                    first_header = true,//!this._navigationObject.isFirstItemNotHeader(),
                    arr = [];
                for (var i = 0; i < count; i++) {
                    var level = this._viewerNavigationObject[i].level - 1,
                        hasParent = true;
                    if (level > prev_level && i > 0)
                        arr[i - 1].set('hasSubItems', true);
                    if (header_level < 0 || level <= header_level) {
                        if (i > 0 || first_header)
                            header_level = level;
                        hasParent = false;
                    }
                    arr.push(new Common.UI.TreeViewModel({
                        name: this._viewerNavigationObject[i].description,
                        level: level,
                        index: i,
                        hasParent: hasParent,
                        isEmptyItem: !this._viewerNavigationObject[i].description
                    }));
                    prev_level = level;
                }
                if (count > 0 && !first_header) {
                    arr[0].set('hasSubItems', false);
                    arr[0].set('isNotHeader', true);
                    arr[0].set('name', this.txtBeginning);
                    arr[0].set('tip', this.txtGotoBeginning);
                }
                this.getApplication().getCollection('Navigation').reset(arr);
                if (this.panelNavigation && this.panelNavigation.viewNavigationList && this.panelNavigation.viewNavigationList.scroller)
                    this.panelNavigation.viewNavigationList.scroller.update({alwaysVisibleY: true});
            }
        },

        txtBeginning: 'Beginning of document',
        txtGotoBeginning: 'Go to the beginning of the document'

    }, PDFE.Controllers.Navigation || {}));
});
