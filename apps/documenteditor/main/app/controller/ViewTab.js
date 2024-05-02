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
    'core',
    'documenteditor/main/app/view/ViewTab'
], function () {
    'use strict';

    DE.Controllers.ViewTab = Backbone.Controller.extend(_.extend({
        models : [],
        collections : [
        ],
        views : [
            'ViewTab'
        ],
        sdkViewName : '#id_main',

        initialize: function () {
        },
        onLaunch: function () {
            this._state = {};
            Common.NotificationCenter.on('app:ready', this.onAppReady.bind(this));
            Common.NotificationCenter.on('contenttheme:dark', this.onContentThemeChangedToDark.bind(this));
            Common.NotificationCenter.on('uitheme:changed', this.onThemeChanged.bind(this));
            Common.NotificationCenter.on('document:ready', _.bind(this.onDocumentReady, this));
        },

        setApi: function (api) {
            if (api) {
                this.api = api;
                this.api.asc_registerCallback('asc_onZoomChange', _.bind(this.onZoomChange, this));
                this.api.asc_registerCallback('asc_onCoAuthoringDisconnect', _.bind(this.onCoAuthoringDisconnect, this));
                Common.NotificationCenter.on('api:disconnect', _.bind(this.onCoAuthoringDisconnect, this));
            }
            return this;
        },

        setConfig: function(config) {
            var mode = config.mode;
            this.toolbar = config.toolbar;
            this.view = this.createView('ViewTab', {
                toolbar: this.toolbar.toolbar,
                mode: mode,
                compactToolbar: this.toolbar.toolbar.isCompactView
            });
            this.addListeners({
                'ViewTab': {
                    'zoom:topage': _.bind(this.onBtnZoomTo, this, 'topage'),
                    'zoom:towidth': _.bind(this.onBtnZoomTo, this, 'towidth'),
                    'rulers:change': _.bind(this.onChangeRulers, this),
                    'darkmode:change': _.bind(this.onChangeDarkMode, this)
                },
                'Toolbar': {
                    'view:compact': _.bind(function (toolbar, state) {
                        this.view.chToolbar.setValue(!state, true);
                    }, this)
                },
                'Statusbar': {
                    'view:hide': _.bind(function (statusbar, state) {
                        this.view.chStatusbar.setValue(!state, true);
                    }, this)
                },
                'LeftMenu': {
                    'view:hide': _.bind(function (leftmenu, state) {
                        this.view.chLeftMenu.setValue(!state, true);
                    }, this)
                }
            });
        },

        SetDisabled: function(state) {
            this.view && this.view.SetDisabled(state);
        },

        createToolbarPanel: function() {
            return this.view.getPanel();
        },

        getView: function(name) {
            return !name && this.view ?
                this.view : Backbone.Controller.prototype.getView.call(this, name);
        },

        onCoAuthoringDisconnect: function() {
            Common.Utils.lockControls(Common.enumLock.lostConnect, true, {array: this.view.lockedControls});
        },

        onAppReady: function (config) {
            var me = this;
            if (me.view) {
                (new Promise(function (accept, reject) {
                    accept();
                })).then(function(){
                    me.view.setEvents();

                    if (!Common.UI.Themes.available()) {
                        me.view.btnInterfaceTheme.$el.closest('.group').remove();
                        me.view.$el.find('.separator-theme').remove();
                    }
                    var emptyGroup = [];
                    if (config.canBrandingExt && config.customization && config.customization.statusBar === false || !Common.UI.LayoutManager.isElementVisible('statusBar')) {
                        emptyGroup.push(me.view.chStatusbar.$el.closest('.elset'));
                        me.view.chStatusbar.$el.remove();
                    }

                    if (config.canBrandingExt && config.customization && config.customization.leftMenu === false || !Common.UI.LayoutManager.isElementVisible('leftMenu')) {
                        emptyGroup.push(me.view.chLeftMenu.$el.closest('.elset'));
                        me.view.chLeftMenu.$el.remove();
                    } else if (emptyGroup.length>0) {
                        emptyGroup.push(me.view.chLeftMenu.$el.closest('.elset'));
                        emptyGroup.shift().append(me.view.chLeftMenu.$el[0]);
                    }

                    if (!config.isEdit || config.canBrandingExt && config.customization && config.customization.rightMenu === false || !Common.UI.LayoutManager.isElementVisible('rightMenu')) {
                        emptyGroup.push(me.view.chRightMenu.$el.closest('.elset'));
                        me.view.chRightMenu.$el.remove();
                    } else if (emptyGroup.length>0) {
                        emptyGroup.push(me.view.chRightMenu.$el.closest('.elset'));
                        emptyGroup.shift().append(me.view.chRightMenu.$el[0]);
                    }

                    if (emptyGroup.length>1) { // remove empty group
                        emptyGroup[emptyGroup.length-1].closest('.group').remove();
                    }

                    if (!config.isEdit) {
                        me.view.chRulers.$el.closest('.group').remove();
                        me.view.chRulers.$el.remove();
                        me.view.$el.find('.separator-rulers').remove();
                    }

                    me.view.cmbZoom.on('selected', _.bind(me.onSelectedZoomValue, me))
                        .on('changed:before',_.bind(me.onZoomChanged, me, true))
                        .on('changed:after', _.bind(me.onZoomChanged, me, false))
                        .on('combo:blur',    _.bind(me.onComboBlur, me, false));

                    me.getApplication().getController('LeftMenu').leftMenu.btnNavigation.on('toggle', function (btn, state) {
                        if (state !== me.view.btnNavigation.pressed)
                            me.view.turnNavigation(state);
                    });

                    if (Common.UI.Themes.available()) {
                        function _fill_themes() {
                            var btn = this.view.btnInterfaceTheme;
                            if ( typeof(btn.menu) == 'object' ) btn.menu.removeAll();
                            else btn.setMenu(new Common.UI.Menu());

                            var currentTheme = Common.UI.Themes.currentThemeId() || Common.UI.Themes.defaultThemeId();
                            for (var t in Common.UI.Themes.map()) {
                                btn.menu.addItem({
                                    value: t,
                                    caption: Common.UI.Themes.get(t).text,
                                    checked: t === currentTheme,
                                    checkable: true,
                                    toggleGroup: 'interface-theme'
                                });
                            }
                        }

                        Common.NotificationCenter.on('uitheme:countchanged', _fill_themes.bind(me));
                        _fill_themes.call(me);

                        if (me.view.btnInterfaceTheme.menu.items.length) {
                            // me.view.btnInterfaceTheme.setMenu(new Common.UI.Menu({items: menuItems}));
                            me.view.btnInterfaceTheme.menu.on('item:click', _.bind(function (menu, item) {
                                var value = item.value;
                                Common.UI.Themes.setTheme(value);
                                Common.Utils.lockControls(Common.enumLock.inLightTheme, !Common.UI.Themes.isDarkTheme(), {array: [me.view.btnDarkDocument]});
                            }, me));

                            setTimeout(function () {
                                me.onContentThemeChangedToDark(Common.UI.Themes.isContentThemeDark());
                                Common.Utils.lockControls(Common.enumLock.inLightTheme, !Common.UI.Themes.isDarkTheme(), {array: [me.view.btnDarkDocument]});
                            }, 0);
                        }
                    }
                });
            }
        },

        onDocumentReady: function() {
            Common.Utils.lockControls(Common.enumLock.disableOnStart, false, {array: this.view.lockedControls});
        },

        onZoomChange: function (percent, type) {
            this.view.btnFitToPage.toggle(type == 2, true);
            this.view.btnFitToWidth.toggle(type == 1, true);

            this.view.cmbZoom.setValue(percent, percent + '%');

            this._state.zoomValue = percent;
        },

        applyZoom: function (value) {
            var val = Math.max(10, Math.min(500, value));
            if (this._state.zoomValue === val)
                this.view.cmbZoom.setValue(this._state.zoomValue, this._state.zoomValue + '%');
            this.api.zoom(val);
            Common.NotificationCenter.trigger('edit:complete', this.view);
        },

        onSelectedZoomValue: function (combo, record) {
            this.applyZoom(record.value);
        },

        onZoomChanged: function (before, combo, record, e) {
            var value = parseFloat(record.value);
            if (before) {
                var expr = new RegExp('^\\s*(\\d*(\\.|,)?\\d+)\\s*(%)?\\s*$');
                if (!expr.exec(record.value)) {
                    this.view.cmbZoom.setValue(this._state.zoomValue, this._state.zoomValue + '%');
                    Common.NotificationCenter.trigger('edit:complete', this.view);
                }
            } else {
                if (this._state.zoomValue !== value && !isNaN(value)) {
                    this.applyZoom(value);
                } else if (record.value !== this._state.zoomValue + '%') {
                    this.view.cmbZoom.setValue(this._state.zoomValue, this._state.zoomValue + '%');
                }
            }
        },

        onBtnZoomTo: function(type) {
            var btn, func;
            if ( type === 'topage' ) {
                btn = 'btnFitToPage';
                func = 'zoomFitToPage';
            } else {
                btn = 'btnFitToWidth';
                func = 'zoomFitToWidth';
            }
            if ( !this.view[btn].pressed )
                this.api.zoomCustomMode();
            else
                this.api[func]();
            Common.NotificationCenter.trigger('edit:complete', this.view);
        },

        onChangeRulers: function (btn, checked) {
            Common.localStorage.setBool('de-hidden-rulers', !checked);
            Common.Utils.InternalSettings.set("de-hidden-rulers", !checked);
            this.api.asc_SetViewRulers(checked);
            Common.NotificationCenter.trigger('layout:changed', 'rulers');
            Common.NotificationCenter.trigger('edit:complete', this.view);
        },

        onChangeDarkMode: function () {
            Common.UI.Themes.toggleContentTheme();
        },

        onContentThemeChangedToDark: function (isdark) {
            this.view && this.view.btnDarkDocument.toggle(isdark, true);
        },

        onThemeChanged: function () {
            if (this.view && Common.UI.Themes.available()) {
                var current_theme = Common.UI.Themes.currentThemeId() || Common.UI.Themes.defaultThemeId(),
                    menu_item = _.findWhere(this.view.btnInterfaceTheme.menu.items, {value: current_theme});
                if ( menu_item ) {
                    this.view.btnInterfaceTheme.menu.clearAll();
                    menu_item.setChecked(true, true);
                }
                Common.Utils.lockControls(Common.enumLock.inLightTheme, !Common.UI.Themes.isDarkTheme(), {array: [this.view.btnDarkDocument]});
            }
        },

        onComboBlur: function() {
            Common.NotificationCenter.trigger('edit:complete', this.view);
        }

    }, DE.Controllers.ViewTab || {}));
});