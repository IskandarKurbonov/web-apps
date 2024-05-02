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
    'common/main/lib/component/BaseView',
    'common/main/lib/component/Layout',
    'common/main/lib/component/Window'
], function (template) {
    'use strict';

    DE.Views.DocProtection = Common.UI.BaseView.extend(_.extend((function(){
        var template =
            '<div class="group">' +
            '<span id="slot-btn-protect-doc" class="btn-slot text x-huge"></span>' +
            '</div>';

        function setEvents() {
            var me = this;

            this.btnProtectDoc.on('click', function (btn, e) {
                me.fireEvent('protect:document', [btn.pressed]);
            });
            me._isSetEvents = true;
        }

        return {

            options: {},

            initialize: function (options) {
                Common.UI.BaseView.prototype.initialize.call(this, options);

                this.appConfig = options.mode;

                var _set = Common.enumLock;
                this.lockedControls = [];
                this._state = {disabled: false, currentProtectHint: this.hintProtectDoc };

                this.btnProtectDoc = new Common.UI.Button({
                    cls: 'btn-toolbar x-huge icon-top',
                    iconCls: 'toolbar__icon btn-restrict-editing',
                    enableToggle: true,
                    caption: this.txtProtectDoc,
                    lock        : [_set.lostConnect, _set.coAuth, _set.previewReviewMode, _set.viewFormMode, _set.protectLock],
                    dataHint    : '1',
                    dataHintDirection: 'bottom',
                    dataHintOffset: 'small'
                });
                this.lockedControls.push(this.btnProtectDoc);

                Common.NotificationCenter.on('app:ready', this.onAppReady.bind(this));
            },

            render: function (el) {
                return this;
            },

            onAppReady: function (config) {
                var me = this;
                (new Promise(function (accept, reject) {
                    accept();
                })).then(function(){
                    me.btnProtectDoc.updateHint(me._state.currentProtectHint, true);
                    setEvents.call(me);
                });
            },

            getPanel: function () {
                this.$el = $(_.template(template)( {} ));

                this.btnProtectDoc.render(this.$el.find('#slot-btn-protect-doc'));
                return this.$el;
            },

            getButtons: function(type) {
                if (type===undefined)
                    return this.lockedControls;
                return [];
            },

            show: function () {
                Common.UI.BaseView.prototype.show.call(this);
                this.fireEvent('show', this);
            },

            updateProtectionTips: function(type) {
                var str = this.txtProtectDoc;
                if (type === Asc.c_oAscEDocProtect.ReadOnly) {
                    str = this.txtDocProtectedView;
                } else if (type === Asc.c_oAscEDocProtect.Comments) {
                    str = this.txtDocProtectedComment;
                } else if (type === Asc.c_oAscEDocProtect.Forms) {
                    str = this.txtDocProtectedForms;
                } else if (type === Asc.c_oAscEDocProtect.TrackedChanges){ // none or tracked changes
                    str = this.txtDocProtectedTrack;
                }
                this.btnProtectDoc.updateHint(str, true);
                this._state.currentProtectHint = str;
            },
            txtProtectDoc: 'Protect Document',
            txtDocProtectedView: 'Document is protected.<br>You may only view this document.',
            txtDocProtectedTrack: 'Document is protected.<br>You may edit this document, but all changes will be tracked.',
            txtDocProtectedComment: 'Document is protected.<br>You may only insert comments to this document.',
            txtDocProtectedForms: 'Document is protected.<br>You may only fill in forms in this document.',
            hintProtectDoc: 'Protect document',
            txtDocUnlockDescription: 'Enter a password to unprotect document',
            txtUnlockTitle: 'Unprotect Document'
        }
    }()), DE.Views.DocProtection || {}));
});