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
    'underscore',
    'backbone',
    'common/main/lib/component/BaseView'
], function (_, Backbone) {
    'use strict';

    Common.UI.SideMenu = Backbone.View.extend((function () {
        return {
            buttons: [],
            btnMoreContainer: undefined,

            render: function () {
                this.btnMore = new Common.UI.Button({
                    parentEl: this.btnMoreContainer,
                    cls: 'btn-side-more btn-category',
                    iconCls: 'toolbar__icon btn-more',
                    onlyIcon: true,
                    style: 'width: 100%;',
                    hint: this.tipMore,
                    menu: new Common.UI.Menu({
                        cls: 'shifted-right',
                        items: []
                    })
                });
                this.btnMore.menu.on('item:click', _.bind(this.onMenuMore, this));
                this.btnMore.menu.on('show:before', _.bind(this.onShowBeforeMoreMenu, this));
                this.btnMore.hide();

                $(window).on('resize', _.bind(this.setMoreButton, this));
            },

            setButtons: function (btns) {
                this.buttons = [];
                btns.forEach(_.bind(function (button) {
                    if (button && button.cmpEl.is(':visible')) {
                        this.buttons.push(button);
                    }
                }, this));
            },

            addButton: function (button) {
                this.buttons.push(button);
            },

            insertButton: function (button, $button) {
                this.btnMoreContainer.before($button);
                button.on('click', _.bind(function () {
                    this.fireEvent('button:click', [button]);
                }, this));
                this.addButton(button);
                this.setMoreButton();
            },

            insertPanel: function ($panel) {
                this.$el.find('.side-panel').append($panel);
            },

            setMoreButton: function () {
                if (!this.buttons.length) return;

                var $more = this.btnMore;

                var btnHeight = this.buttons[0].cmpEl.outerHeight(true),
                    padding = parseFloat(this.$el.find('.tool-menu-btns').css('padding-top')),
                    height = padding + this.buttons.length * btnHeight,
                    maxHeight = this.$el.height();

                if (height > maxHeight) {
                    var arrMore = [],
                        last,
                        i;
                    height = padding;
                    for (i = 0; i < this.buttons.length; i++) {
                        height += btnHeight;
                        if (height > maxHeight) {
                            last = i - 1;
                            break;
                        }
                    }
                    this.buttons.forEach(function (btn, index) {
                        if (index >= last) {
                            if (btn.options.iconImg) {
                                arrMore.push({
                                    caption: btn.hint,
                                    iconImg: btn.options.iconImg,
                                    template: _.template([
                                        '<a id="<%= id %>" class="menu-item" tabindex="-1" type="menuitem">',
                                        '<img class="menu-item-icon" src="<%= options.iconImg %>">',
                                        '<%= caption %>',
                                        '</a>'
                                    ].join('')),
                                    value: index,
                                    toggleGroup: 'sideMenuItems',
                                    checkmark: false,
                                    checkable: true
                                })
                            } else {
                                arrMore.push({
                                    caption: btn.hint,
                                    iconCls: 'menu__icon ' + btn.iconCls,
                                    value: index,
                                    disabled: btn.isDisabled(),
                                    toggleGroup: 'sideMenuItems',
                                    checkmark: false,
                                    checkable: true
                                });
                            }
                            btn.cmpEl.hide();
                        } else {
                            btn.cmpEl.show();
                        }
                    });
                    if (arrMore.length > 0) {
                        this.btnMore.menu.removeAll();
                        for (i = 0; i < arrMore.length; i++) {
                            this.btnMore.menu.addItem(arrMore[i]);
                        }
                        $more.show();
                    }
                } else {
                    this.buttons.forEach(function (btn) {
                        btn.cmpEl.show();
                    });
                    $more.hide();
                }
            },

            onMenuMore: function (menu, item) {
                var btn = this.buttons[item.value];
                if (btn.cmpEl.prop('id') !== 'left-btn-support')
                    btn.toggle(!btn.pressed);
                btn.trigger('click', btn);
            },

            onShowBeforeMoreMenu: function (menu) {
                menu.items.forEach(function (item) {
                    item.setChecked(false, true);
                });
                var index;
                this.buttons.forEach(function (btn, ind) {
                    if (btn.pressed) {
                        index = ind;
                    }
                });
                var menuItem = _.findWhere(menu.items, {value: index});
                if (menuItem) {
                    menuItem.setChecked(true, true);
                }
            },

            setDisabledMoreMenuItem: function (btn, disabled) {
                if (this.btnMore && !btn.cmpEl.is(':visible')) {
                    var index =_.indexOf(this.buttons, btn),
                        item = _.findWhere(this.btnMore.menu.items, {value: index})
                    item && item.setDisabled(disabled);
                }
            },

            setDisabledAllMoreMenuItems: function (disabled) {
                if (this.btnMore && this.btnMore.menu.items.length > 0) {
                    this.btnMore.menu.items.forEach(function (item) {
                        item.setDisabled(disabled);
                    });
                }
            },

            setDisabledPluginButtons: function (disabled) {
                var me = this;
                this.buttons.forEach(function (btn) {
                    if (btn.options.type === 'plugin') {
                        btn.setDisabled(disabled);
                        me.setDisabledMoreMenuItem(btn, disabled);
                    }
                });
            },

            getPluginButton: function (guid) {
                var btn;
                for (var i=0; i<this.buttons.length; i++) {
                    if (this.buttons[i].options.value === guid) {
                        btn = this.buttons[i];
                        break;
                    }
                }
                return [btn, i];
            },

            openPlugin: function (guid) {
                var btn = this.getPluginButton(guid)[0];
                if (btn) {
                    if (!btn.isDisabled() && !btn.pressed) {
                        btn.toggle(true);
                        this.fireEvent('button:click', [btn]);
                    }
                }
            },

            closePlugin: function (guid) {
                var arr = this.getPluginButton(guid),
                    btn = arr[0],
                    index = arr[1];
                btn.cmpEl.parent().remove();
                this.buttons.splice(index, 1);
                this.close();

                this.setMoreButton();
            },

            isPluginButtonPressed: function () {
                var pressed = false;
                for (var i=0; i<this.buttons.length; i++) {
                    if (this.buttons[i].options.type === 'plugin' && this.buttons[i].pressed) {
                        pressed = true;
                        break;
                    }
                }
                return pressed;
            },

            togglePluginButtons: function (toggle) {
                for (var i=0; i<this.buttons.length; i++) {
                    if (this.buttons[i].options.type === 'plugin' && this.buttons[i].pressed) {
                        this.buttons[i].toggle(toggle, true);
                    }
                }
            },

            updatePluginButtonsIcons: function (icons) {
                var me = this;
                icons.forEach(function (item) {
                    var arr = me.getPluginButton(item.guid),
                        btn = arr[0],
                        index = arr[1],
                        menuItem = _.findWhere(me.btnMore.menu.items, {value: index}),
                        src = item.baseUrl + item.parsedIcons['normal'];
                    btn.options.iconImg = src;
                    btn.cmpEl.find("img").attr("src", src);
                    if (menuItem) {
                        menuItem.cmpEl.find("img").attr("src", src);
                    }
                });
            },
        }
    }()));
});
