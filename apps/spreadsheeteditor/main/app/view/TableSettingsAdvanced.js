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

define([    'text!spreadsheeteditor/main/app/template/TableSettingsAdvanced.template',
    'common/main/lib/view/AdvancedSettingsWindow',
    'common/main/lib/component/InputField'
], function (contentTemplate) {
    'use strict';

    SSE.Views.TableSettingsAdvanced = Common.Views.AdvancedSettingsWindow.extend(_.extend({
        options: {
            contentWidth: 300,
            contentHeight: 257,
            toggleGroup: 'table-adv-settings-group',
            properties: null,
            storageName: 'sse-table-settings-adv-category'
        },

        initialize : function(options) {
            _.extend(this.options, {
                title: this.textTitle,
                items: [
                    {panelId: 'id-adv-table-alttext',    panelCaption: this.textAlt}
                ],
                contentTemplate: _.template(contentTemplate)({
                    scope: this
                })
            }, options);
            Common.Views.AdvancedSettingsWindow.prototype.initialize.call(this, this.options);

            this._originalProps = this.options.tableProps;
            this._changedProps = null;
        },

        render: function() {
            Common.Views.AdvancedSettingsWindow.prototype.render.call(this);

            var me = this;

            // Alt Text

            this.inputAltTitle = new Common.UI.InputField({
                el          : $('#table-advanced-alt-title'),
                allowBlank  : true,
                validateOnBlur: false,
                style       : 'width: 100%;'
            }).on('changed:after', function() {
                me.isAltTitleChanged = true;
            });

            this.textareaAltDescription = this.$window.find('textarea');
            this.textareaAltDescription.keydown(function (event) {
                if (event.keyCode == Common.UI.Keys.RETURN) {
                    event.stopPropagation();
                }
                me.isAltDescChanged = true;
            });

            this.afterRender();
        },

        getFocusedComponents: function() {
            return this.btnsCategory.concat([ this.inputAltTitle, this.textareaAltDescription ]).concat(this.getFooterButtons());  // 0 tab
        },

        onCategoryClick: function(btn, index) {
            Common.Views.AdvancedSettingsWindow.prototype.onCategoryClick.call(this, btn, index);

            var me = this;
            setTimeout(function(){
                switch (index) {
                    case 0:
                        me.inputAltTitle.focus();
                        break;
                }
            }, 10);
        },

        afterRender: function() {
            this._setDefaults(this._originalProps);
            if (this.storageName) {
                var value = Common.localStorage.getItem(this.storageName);
                this.setActiveCategory((value!==null) ? parseInt(value) : 0);
            }
        },

        _setDefaults: function(props) {
            if (props ){
                var value = props.asc_getTitle();
                this.inputAltTitle.setValue(value ? value : '');

                value = props.asc_getDescription();
                this.textareaAltDescription.val(value ? value : '');
            }
        },

        getSettings: function() {
            if (this.isAltTitleChanged || this.isAltDescChanged) {
                var info = new Asc.AdvancedTableInfoSettings();
                info.asc_setTitle(this.inputAltTitle.getValue());
                info.asc_setDescription(this.textareaAltDescription.val());
                return info;
            }
        },

        textTitle:      'Table - Advanced Settings',
        textAlt: 'Alternative Text',
        textAltTitle: 'Title',
        textAltDescription: 'Description',
        textAltTip: 'The alternative text-based representation of the visual object information, which will be read to the people with vision or cognitive impairments to help them better understand what information there is in the image, autoshape, chart or table.'

    }, SSE.Views.TableSettingsAdvanced || {}));
});