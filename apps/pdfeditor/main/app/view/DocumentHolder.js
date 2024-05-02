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
    'jquery',
    'underscore',
    'backbone',
    'gateway',
    'common/main/lib/util/utils',
    'common/main/lib/component/Menu',
    'common/main/lib/component/Calendar',
    'common/main/lib/view/InsertTableDialog',
    'common/main/lib/view/CopyWarningDialog',
    'common/main/lib/view/OptionsDialog'
], function ($, _, Backbone, gateway) { 'use strict';

    PDFE.Views.DocumentHolder =  Backbone.View.extend(_.extend({
        el: '#editor_sdk',

        // Compile our stats template
        template: null,

        // Delegated events for creating new items, and clearing completed ones.
        events: {
        },

        initialize: function () {
            this._isDisabled = false;
            this._preventCustomClick = null;
            this._hasCustomItems = false;
        },

        render: function () {
            this.fireEvent('render:before', this);

            this.cmpEl = $(this.el);

            this.fireEvent('render:after', this);
            return this;
        },

        setApi: function(o) {
            this.api = o;
            return this;
        },

        setMode: function(m) {
            this.mode = m;
            return this;
        },

        createDelayedElementsPDFViewer: function() {
            var me = this;

            me.menuPDFViewCopy = new Common.UI.MenuItem({
                iconCls: 'menu__icon btn-copy',
                caption: me.textCopy,
                value: 'copy'
            });

            me.menuAddComment = new Common.UI.MenuItem({
                iconCls: 'menu__icon btn-add-comment',
                caption     : me.addCommentText
            });

            this.viewPDFModeMenu = new Common.UI.Menu({
                cls: 'shifted-right',
                initMenu: function (value) {
                    me.menuPDFViewCopy.setDisabled(!(me.api && me.api.can_CopyCut()));
                    me.menuAddComment.setVisible(me.mode && me.mode.canComments);
                },
                items: [
                    me.menuPDFViewCopy,
                    me.menuAddComment
                ]
            }).on('hide:after', function (menu, e, isFromInputControl) {
                me.clearCustomItems(menu);
                me.currentMenu = null;
                if (me.suppressEditComplete) {
                    me.suppressEditComplete = false;
                    return;
                }

                if (!isFromInputControl) me.fireEvent('editcomplete', me);
            });

            this.fireEvent('createdelayedelements', [this, 'pdf']);
        },

        createDelayedElementsPDFForms: function() {
            var me = this;

            me.menuPDFFormsCopy = new Common.UI.MenuItem({
                iconCls: 'menu__icon btn-copy',
                caption: me.textCopy,
                value: 'copy'
            });

            me.menuPDFFormsPaste = new Common.UI.MenuItem({
                iconCls: 'menu__icon btn-paste',
                caption : me.textPaste,
                value : 'paste'
            });

            me.menuPDFFormsCut = new Common.UI.MenuItem({
                iconCls: 'menu__icon btn-cut',
                caption : me.textCut,
                value : 'cut'
            });

            me.menuPDFFormsUndo = new Common.UI.MenuItem({
                iconCls: 'menu__icon btn-undo',
                caption: me.textUndo
            });

            me.menuPDFFormsRedo = new Common.UI.MenuItem({
                iconCls: 'menu__icon btn-redo',
                caption: me.textRedo
            });

            me.menuPDFFormsClear = new Common.UI.MenuItem({
                iconCls: 'menu__icon btn-clearstyle',
                caption: me.textClearField
            });

            me.formsPDFMenu = new Common.UI.Menu({
                cls: 'shifted-right',
                initMenu: function (value) {
                    var cancopy = me.api.can_CopyCut(),
                        disabled = value.paraProps && value.paraProps.locked || value.headerProps && value.headerProps.locked ||
                                    value.imgProps && (value.imgProps.locked || value.imgProps.content_locked) || me._isDisabled;
                    me.menuPDFFormsUndo.setDisabled(disabled || !me.api.asc_getCanUndo()); // undo
                    me.menuPDFFormsRedo.setDisabled(disabled || !me.api.asc_getCanRedo()); // redo

                    me.menuPDFFormsClear.setDisabled(disabled || !me.api.asc_IsContentControl()); // clear
                    me.menuPDFFormsCut.setDisabled(disabled || !cancopy); // cut
                    me.menuPDFFormsCopy.setDisabled(!cancopy); // copy
                    me.menuPDFFormsPaste.setDisabled(disabled) // paste;
                },
                items: [
                    me.menuPDFFormsUndo,
                    me.menuPDFFormsRedo,
                    { caption: '--' },
                    me.menuPDFFormsClear,
                    { caption: '--' },
                    me.menuPDFFormsCut,
                    me.menuPDFFormsCopy,
                    me.menuPDFFormsPaste
                ]
            }).on('hide:after', function (menu, e, isFromInputControl) {
                me.clearCustomItems(menu);
                me.currentMenu = null;
                if (me.suppressEditComplete) {
                    me.suppressEditComplete = false;
                    return;
                }

                if (!isFromInputControl) me.fireEvent('editcomplete', me);
            });

            this.fireEvent('createdelayedelements', [this, 'forms']);
        },

        updateCustomItems: function(menu, data) {
            if (!menu || !data || data.length<1) return;

            var me = this,
                lang = me.mode && me.mode.lang ? me.mode.lang.split(/[\-_]/)[0] : 'en';

            me._preventCustomClick && clearTimeout(me._preventCustomClick);
            me._hasCustomItems && (me._preventCustomClick = setTimeout(function () {
                me._preventCustomClick = null;
            },500)); // set delay only on update existing items
            me._hasCustomItems = true;

            var findCustomItem = function(guid, id) {
                if (menu && menu.items.length>0) {
                    for (var i = menu.items.length-1; i >=0 ; i--) {
                        if (menu.items[i].options.isCustomItem && (id===undefined && menu.items[i].options.guid === guid || menu.items[i].options.guid === guid && menu.items[i].value === id)) {
                            return menu.items[i];
                        }
                    }
                }
            }

            var getMenu = function(items, guid, toMenu) {
                if (toMenu)
                    toMenu.removeAll();
                else {
                    toMenu = new Common.UI.Menu({
                        cls: 'shifted-right',
                        menuAlign: 'tl-tr',
                        items: []
                    });
                    toMenu.on('item:click', function(menu, item, e) {
                        !me._preventCustomClick && me.api && me.api.onPluginContextMenuItemClick && me.api.onPluginContextMenuItemClick(item.options.guid, item.value);
                    });
                    toMenu.on('menu:click', function(menu, e) {
                        me._preventCustomClick && e.stopPropagation();
                    });
                }
                items.forEach(function(item) {
                    item.separator && toMenu.addItem({
                        caption: '--',
                        isCustomItem: true,
                        guid: guid
                    });
                    item.text && toMenu.addItem({
                        caption: ((typeof item.text == 'object') ? item.text[lang] || item.text['en'] : item.text) || '',
                        isCustomItem: true,
                        value: item.id,
                        guid: guid,
                        menu: item.items ? getMenu(item.items, guid) : false,
                        iconImg: me.parseIcons(item.icons),
                        disabled: !!item.disabled
                    });
                });
                return toMenu;
            }

            var focused;
            data.forEach(function(plugin) {
                var isnew = !findCustomItem(plugin.guid);
                if (plugin && plugin.items && plugin.items.length>0) {
                    plugin.items.forEach(function(item) {
                        if (item.separator && isnew) {// add separator only to new plugins menu
                            menu.addItem({
                                caption: '--',
                                isCustomItem: true,
                                guid: plugin.guid
                            });
                        }

                        if (!item.text) return;
                        var mnu = findCustomItem(plugin.guid, item.id),
                            caption = ((typeof item.text == 'object') ? item.text[lang] || item.text['en'] : item.text) || '';
                        if (mnu) {
                            mnu.setCaption(caption);
                            mnu.setDisabled(!!item.disabled);
                            if (item.items) {
                                if (mnu.menu) {
                                    if (mnu.menu.isVisible() && mnu.menu.cmpEl.find(' > li:not(.divider):not(.disabled):visible').find('> a').filter(':focus').length>0) {
                                        mnu.menu.isOver = true;
                                        focused = mnu.cmpEl;
                                    }
                                    getMenu(item.items, plugin.guid, mnu.menu);
                                } else
                                    mnu.setMenu(getMenu(item.items, plugin.guid));
                            }
                        } else {
                            var mnu = new Common.UI.MenuItem({
                                caption     : caption,
                                isCustomItem: true,
                                value: item.id,
                                guid: plugin.guid,
                                menu: item.items && item.items.length>=0 ? getMenu(item.items, plugin.guid) : false,
                                iconImg: me.parseIcons(item.icons),
                                disabled: !!item.disabled
                            }).on('click', function(item, e) {
                                !me._preventCustomClick && me.api && me.api.onPluginContextMenuItemClick && me.api.onPluginContextMenuItemClick(item.options.guid, item.value);
                            });
                            menu.addItem(mnu);
                        }
                    });
                }
            });

            if (focused) {
                var $subitems = $('> [role=menu]', focused).find('> li:not(.divider):not(.disabled):visible > a');
                ($subitems.length>0) && $subitems.eq(0).focus();
            }
            menu.alignPosition();
        },

        clearCustomItems: function(menu) {
            if (menu && menu.items.length>0) {
                for (var i = 0; i < menu.items.length; i++) {
                    if (menu.items[i].options.isCustomItem) {
                        menu.removeItem(menu.items[i]);
                        i--;
                    }
                }
            }
            this._hasCustomItems = false;
        },

        parseIcons: function(icons) {
            var plugins = PDFE.getController('Common.Controllers.Plugins').getView('Common.Views.Plugins');
            if (icons && icons.length && plugins && plugins.parseIcons) {
                icons = plugins.parseIcons(icons);
                return icons ? icons['normal'] : undefined;
            }
        },

        focus: function() {
            var me = this;
            _.defer(function(){  me.cmpEl.focus(); }, 50);
        },

        SetDisabled: function(state, canProtect, fillFormMode) {
            this._isDisabled = state;
        },

        textCopy: 'Copy',
        addCommentText: 'Add Comment',
        txtWarnUrl: 'Clicking this link can be harmful to your device and data.<br>Are you sure you want to continue?',
        mniImageFromFile: 'Image from File',
        mniImageFromUrl: 'Image from URL',
        mniImageFromStorage: 'Image from Storage',
        textUndo: 'Undo',
        textRedo: 'Redo',
        textCut: 'Cut',
        textPaste: 'Paste',
        textClearField: 'Clear field'

    }, PDFE.Views.DocumentHolder || {}));
});