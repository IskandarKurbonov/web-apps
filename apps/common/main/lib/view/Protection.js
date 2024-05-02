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
    'common/main/lib/util/utils',
    'common/main/lib/component/BaseView',
    'common/main/lib/component/Layout',
    'common/main/lib/component/Window'
], function (template) {
    'use strict';

    Common.Views.Protection = Common.UI.BaseView.extend(_.extend((function(){
        var template =
            '<section id="protection-panel" class="panel" data-tab="protect">' +
            '<div class="group">' +
                '<span id="slot-btn-add-password" class="btn-slot text x-huge"></span>' +
                '<span id="slot-btn-change-password" class="btn-slot text x-huge"></span>' +
                '<span id="slot-btn-signature" class="btn-slot text x-huge"></span>' +
            '</div>' +
            '</section>';

        function setEvents() {
            var me = this;

            if (me.appConfig.isPasswordSupport) {
                this.btnsAddPwd.concat(this.btnsChangePwd).forEach(function(button) {
                    button.on('click', function (b, e) {
                        me.fireEvent('protect:password', [b, 'add']);
                    });
                });

                this.btnsDelPwd.forEach(function(button) {
                    button.on('click', function (b, e) {
                        me.fireEvent('protect:password', [b, 'delete']);
                    });
                });

                this.btnPwd.on('click', function (b, e) {
                    !b.pressed && me.fireEvent('protect:password', [b, 'delete']);
                });
                this.btnPwd.menu.on('item:click', function (menu, item, e) {
                    me.fireEvent('protect:password', [menu, item.value]);
                });
            }

            if (me.appConfig.isSignatureSupport) {
                if (this.btnSignature.menu) {
                    this.btnSignature.menu.on('item:click', function (menu, item, e) {
                        me.fireEvent('protect:signature', [item.value, false]);
                    });
                    this.btnSignature.menu.on('show:after', function (menu, e) {
                        if (me._state) {
                            var isProtected = me._state.docProtection ? me._state.docProtection.isReadOnly || me._state.docProtection.isFormsOnly || me._state.docProtection.isCommentsOnly : false;
                            menu.items && menu.items[1].setDisabled(isProtected || me._state.disabled);
                        }
                    });
                }

                this.btnsInvisibleSignature.forEach(function(button) {
                    button.on('click', function (b, e) {
                        me.fireEvent('protect:signature', ['invisible']);
                    });
                });
            }
            me._isSetEvents = true;
        }

        return {

            options: {},

            initialize: function (options) {
                Common.UI.BaseView.prototype.initialize.call(this, options);

                this.appConfig = options.mode;

                this.btnsInvisibleSignature = [];
                this.btnsAddPwd = [];
                this.btnsDelPwd = [];
                this.btnsChangePwd = [];

                this._state = {disabled: false, hasPassword: false, disabledPassword: false, invisibleSignDisabled: false};

                var filter = Common.localStorage.getKeysFilter();
                this.appPrefix = (filter && filter.length) ? filter.split(',')[0] : '';

                if ( this.appConfig.isPasswordSupport ) {
                    this.btnAddPwd = new Common.UI.Button({
                        cls: 'btn-toolbar x-huge icon-top',
                        iconCls: 'toolbar__icon btn-ic-protect',
                        caption: this.txtEncrypt,
                        dataHint    : '1',
                        dataHintDirection: 'bottom',
                        dataHintOffset: 'small'
                    });
                    this.btnsAddPwd.push(this.btnAddPwd);

                    this.btnPwd = new Common.UI.Button({
                        cls: 'btn-toolbar x-huge icon-top',
                        iconCls: 'toolbar__icon btn-ic-protect',
                        caption: this.txtEncrypt,
                        split: true,
                        enableToggle: true,
                        menu: true,
                        visible: false,
                        dataHint    : '1',
                        dataHintDirection: 'bottom',
                        dataHintOffset: 'small'
                    });
                }
                if (this.appConfig.isSignatureSupport) {
                    this.btnSignature = new Common.UI.Button({
                        cls: 'btn-toolbar x-huge icon-top',
                        iconCls: 'toolbar__icon btn-ic-signature',
                        caption: this.txtSignature,
                        menu: (this.appPrefix !== 'pe-'),
                        dataHint    : '1',
                        dataHintDirection: 'bottom',
                        dataHintOffset: 'small'
                    });
                    if (!this.btnSignature.menu)
                        this.btnsInvisibleSignature.push(this.btnSignature);
                }


                Common.NotificationCenter.on('app:ready', this.onAppReady.bind(this));
            },

            render: function (el) {
                this.boxSdk = $('#editor_sdk');
                if ( el ) el.html( this.getPanel() );

                return this;
            },

            onAppReady: function (config) {
                var me = this;
                (new Promise(function (accept, reject) {
                    accept();
                })).then(function(){
                    if ( config.canProtect) {
                        if ( config.isPasswordSupport) {
                            me.btnAddPwd.updateHint(me.hintAddPwd);
                            me.btnPwd.updateHint([me.hintDelPwd, me.hintPwd]);

                            me.btnPwd.setMenu(
                                new Common.UI.Menu({
                                    items: [
                                        {
                                            caption: me.txtChangePwd,
                                            value: 'add'
                                        },
                                        {
                                            caption: me.txtDeletePwd,
                                            value: 'delete'
                                        }
                                    ]
                                })
                            );
                        }
                        if (me.btnSignature) {
                            me.btnSignature.updateHint((me.btnSignature.menu) ? me.hintSignature : me.txtInvisibleSignature);
                            me.btnSignature.menu && me.btnSignature.setMenu(
                                new Common.UI.Menu({
                                    items: [
                                        {
                                            caption: me.txtInvisibleSignature,
                                            value: 'invisible'
                                        },
                                        {
                                            caption: me.txtSignatureLine,
                                            value: 'visible',
                                            disabled: me._state.disabled
                                        }
                                    ]
                                })
                            );
                        }
                        Common.NotificationCenter.trigger('tab:visible', 'protect', Common.UI.LayoutManager.isElementVisible('toolbar-protect'));
                    }

                    setEvents.call(me);
                });
            },

            getPanel: function () {
                this.$el = $(_.template(template)( {} ));

                if ( this.appConfig.canProtect ) {
                    this.btnAddPwd && this.btnAddPwd.render(this.$el.find('#slot-btn-add-password'));
                    this.btnPwd && this.btnPwd.render(this.$el.find('#slot-btn-change-password'));
                    this.btnSignature && this.btnSignature.render(this.$el.find('#slot-btn-signature'));
                }
                return this.$el;
            },

            show: function () {
                Common.UI.BaseView.prototype.show.call(this);
                this.fireEvent('show', this);
            },

            getButton: function(type, parent) {
                var me = this;
                if ( type == 'signature' ) {
                    var button = new Common.UI.Button({
                        cls: 'btn-text-default auto',
                        caption: this.txtInvisibleSignature,
                        disabled: this._state.invisibleSignDisabled,
                        dataHint: '2',
                        dataHintDirection: 'bottom',
                        dataHintOffset: 'medium'
                    });
                    this.btnsInvisibleSignature.push(button);
                    if (this._isSetEvents) {
                        button.on('click', function (b, e) {
                            me.fireEvent('protect:signature', ['invisible']);
                        });
                    }
                    return button;
                } else if ( type == 'add-password' ) {
                    var button = new Common.UI.Button({
                        cls: 'btn-text-default auto',
                        caption: this.txtAddPwd,
                        disabled: this._state.disabled || this._state.disabledPassword,
                        visible: !this._state.hasPassword,
                        dataHint: '2',
                        dataHintDirection: 'bottom',
                        dataHintOffset: 'medium'
                    });
                    this.btnsAddPwd.push(button);
                    if (this._isSetEvents) {
                        button.on('click', function (b, e) {
                            me.fireEvent('protect:password', [b, 'add']);
                        });
                    }
                    return button;
                } else if ( type == 'del-password' ) {
                    var button = new Common.UI.Button({
                        cls: 'btn-text-default auto',
                        caption: this.txtDeletePwd,
                        disabled: this._state.disabled || this._state.disabledPassword,
                        visible: this._state.hasPassword,
                        dataHint: '2',
                        dataHintDirection: 'bottom',
                        dataHintOffset: 'medium'
                    });
                    this.btnsDelPwd.push(button);
                    if (this._isSetEvents) {
                        button.on('click', function (b, e) {
                            me.fireEvent('protect:password', [b, 'delete']);
                        });
                    }
                    return button;
                } else if ( type == 'change-password' ) {
                    var button = new Common.UI.Button({
                        cls: 'btn-text-default auto',
                        caption: this.txtChangePwd,
                        disabled: this._state.disabled || this._state.disabledPassword,
                        visible: this._state.hasPassword,
                        dataHint: '2',
                        dataHintDirection: 'bottom',
                        dataHintOffset: 'medium'
                    });
                    this.btnsChangePwd.push(button);
                    if (this._isSetEvents) {
                        button.on('click', function (b, e) {
                            me.fireEvent('protect:password', [b, 'add']);
                        });
                    }
                    return button;
                }
            },

            SetDisabled: function (state, canProtect) {
                this._state.disabled = state;
                this._state.invisibleSignDisabled = state && !canProtect;
                var isProtected = this._state.docProtection ? this._state.docProtection.isReadOnly || this._state.docProtection.isFormsOnly || this._state.docProtection.isCommentsOnly : false;
                this.btnsInvisibleSignature && this.btnsInvisibleSignature.forEach(function(button) {
                    if ( button ) {
                        button.setDisabled(state && !canProtect);
                    }
                }, this);
                if (this.btnSignature && this.btnSignature.menu) {
                    this.btnSignature.menu.items && this.btnSignature.menu.items[1].setDisabled(state || isProtected); // disable adding signature line
                    this.btnSignature.setDisabled(state && !canProtect); // disable adding any signature
                }
                this.btnsAddPwd.concat(this.btnsDelPwd, this.btnsChangePwd).forEach(function(button) {
                    if ( button ) {
                        button.setDisabled(state || this._state.disabledPassword);
                    }
                }, this);
            },

            onDocumentPassword: function (hasPassword, disabledPassword) {
                this._state.hasPassword = hasPassword;
                this._state.disabledPassword = !!disabledPassword;
                var disabled = this._state.disabledPassword || this._state.disabled;
                this.btnsAddPwd && this.btnsAddPwd.forEach(function(button) {
                    if ( button ) {
                        button.setVisible(!hasPassword);
                        button.setDisabled(disabled);
                    }
                }, this);
                this.btnsDelPwd.concat(this.btnsChangePwd).forEach(function(button) {
                    if ( button ) {
                        button.setVisible(hasPassword);
                        button.setDisabled(disabled);
                    }
                }, this);
                this.btnPwd.setVisible(hasPassword);
                this.btnPwd.toggle(hasPassword, true);
            },

            txtEncrypt: 'Encrypt',
            txtSignature: 'Signature',
            hintAddPwd: 'Encrypt with password',
            hintPwd: 'Change or delete password',
            hintSignature: 'Add digital signature or signature line',
            txtChangePwd: 'Change password',
            txtDeletePwd: 'Delete password',
            txtAddPwd: 'Add password',
            txtInvisibleSignature: 'Add digital signature',
            txtSignatureLine: 'Add Signature line',
            hintDelPwd: 'Delete password'
        }
    }()), Common.Views.Protection || {}));
});