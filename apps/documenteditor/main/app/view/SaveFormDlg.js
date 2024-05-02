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

define([  'common/main/lib/view/AdvancedSettingsWindow',
    'common/main/lib/component/ListView',
    'documenteditor/main/app/view/RoleEditDlg',
    'documenteditor/main/app/view/RoleDeleteDlg'
], function (contentTemplate) {
    'use strict';

    DE.Views = DE.Views || {};

    DE.Views.SaveFormDlg =  Common.Views.AdvancedSettingsWindow.extend(_.extend({
        options: {
            alias: 'SaveFormDlg',
            contentWidth: 320,
            separator: false
        },

        initialize: function (options) {
            var me = this;
            _.extend(this.options, {
                title: this.txtTitle,
                buttons: [
                    {value: 'ok', caption: this.saveButtonText},
                    'cancel'
                ],
                contentStyle: 'padding: 0;',
                contentTemplate: _.template([
                            '<div class="settings-panel active">',
                                '<div class="inner-content">',
                                    '<table style="width: 100%;">',
                                        '<tr>',
                                            '<td class="padding-small">',
                                                '<label>' + this.textDescription + '</label>',
                                            '</td>',
                                        '</tr>',
                                        '<tr>',
                                            '<td>',
                                                '<label>' + this.textFill + '</label>',
                                            '</td>',
                                        '</tr>',
                                        '<tr>',
                                            '<td>',
                                                '<div id="save-form-roles-list" class="roles-tableview no-borders" style="width:300px; height: 116px;"></div>',
                                            '</td>',
                                        '</tr>',
                                    '</table>',
                                '</div>',
                            '</div>'
                ].join(''))({scope: this})
            }, options);

            this.handler    = options.handler;
            this.roles      = options.roles;

            Common.Views.AdvancedSettingsWindow.prototype.initialize.call(this, this.options);
        },
        render: function () {
            Common.Views.AdvancedSettingsWindow.prototype.render.call(this);
            var me = this;

            this.rolesList = new Common.UI.ListView({
                el: $('#save-form-roles-list', this.$window),
                store: new Common.UI.DataViewStore(),
                simpleAddMode: true,
                handleSelect: false,
                enableKeyEvents: false,
                showLast: false,
                emptyText: this.textEmpty,
                itemTemplate: _.template([
                    '<div id="<%= id %>" class="list-item" style="border-color: transparent;">',
                    '<div class="listitem-icon" style="flex-shrink: 0;"><svg class=""><use xlink:href="#svg-icon-<%= scope.getIconCls(index) %>"></use></svg></div>',
                    '<div class="padding-right-5" style="flex-grow: 1;"><%= Common.Utils.String.htmlEncode(name) %></div>',
                    '</div>'
                ].join(''))
            });

            this.afterRender();
        },

        getFocusedComponents: function() {
            return this.getFooterButtons();
        },

        getDefaultFocusableComponent: function () {
            return _.find(this.getFooterButtons(), function (item) {
                return (item.$el && item.$el.find('.primary').addBack().filter('.primary').length>0);
            });
        },

        afterRender: function() {
            this.refreshRolesList(this.roles);
        },

        refreshRolesList: function(roles, selectedItem) {
            if (roles) {
                this.roles = roles;
                var arr = [];
                var me = this;
                for (var i=0; i<this.roles.length; i++) {
                    var role = roles[i].asc_getSettings(),
                        fields = role.asc_getFieldCount();
                    (fields>0) && arr.push({
                        name: role.asc_getName() || me.textAnyone,
                        color: role.asc_getColor(),
                        fields: fields,
                        index: arr.length,
                        scope: this
                    });
                }
                this.rolesList.store.reset(arr);
            }
        },

        getIconCls: function(index) {
            if (this.rolesList.store.length===1)
                return 'Point';
            return (index===0) ? 'StartPoint' : (index===this.rolesList.store.length-1 ? 'EndPoint' : 'MiddlePoint');
        },

        txtTitle: 'Save as Form',
        saveButtonText : 'Save',
        textEmpty: 'There are no roles associated with fields.',
        textDescription: 'When saving to the pdf, only roles with fields are added to the filling list',
        textFill: 'Filling list',
        textAnyone: 'Anyone'

    }, DE.Views.SaveFormDlg || {}));
});