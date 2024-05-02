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
    'common/main/lib/util/utils',
    'common/main/lib/component/BaseView',
    'common/main/lib/component/Layout',
    'common/main/lib/component/TreeView'
], function (template) {
    'use strict';

    DE.Views.Navigation = Common.UI.BaseView.extend(_.extend({
        el: '#left-panel-navigation',

        storeNavigation: undefined,
        template: _.template([
            '<div id="navigation-box" class="layout-ct vbox">',
            '<div id="navigation-header" className="">',
                '<label><%= scope.strNavigate%></label>',
                '<div id="navigation-btn-close" class="float-right margin-left-4"></div>',
                '<div id="navigation-btn-settings" class="float-right"></div>',
            '</div>',
                '<div id="navigation-list" class="">',
                '</div>',
            '</div>'
        ].join('')),

        initialize: function(options) {
            _.extend(this, options);
            Common.UI.BaseView.prototype.initialize.call(this, arguments);
        },

        render: function(el) {
            el = el || this.el;
            $(el).html(this.template({scope: this}));
            var isWrap = Common.localStorage.getBool("de-outline-wrap",true);
            var fontSizeClass = Common.localStorage.getItem("de-outline-fontsize");
            if(!fontSizeClass) fontSizeClass = 'medium';
            this.$el = $(el);

            this.btnClose = new Common.UI.Button({
                parentEl: $('#navigation-btn-close', this.$el),
                cls: 'btn-toolbar',
                iconCls: 'toolbar__icon btn-close',
                hint: this.txtClosePanel,
            });

            this.btnSettings = new Common.UI.Button({
                parentEl: $('#navigation-btn-settings', this.$el),
                cls: 'btn-toolbar',
                iconCls: 'toolbar__icon btn-settings',
                hint: this.txtSettings,
                menu: new Common.UI.Menu({
                    menuAlign: 'tr-br',
                    style: 'min-width: auto;',
                    cls: 'shifted-right',
                    items: [
                        {
                            caption: this.txtExpand,
                            value: 'expand',
                            iconCls     : 'menu__icon btn-expand-all'
                        },
                        {
                            caption: this.txtCollapse,
                            value: 'collapse',
                            iconCls     : 'menu__icon btn-collapse-all'
                        },
                        {
                            caption: this.txtExpandToLevel,
                            value: 'expand-level',
                            menu: new Common.UI.Menu({
                                    menuAlign: 'tl-tr',
                                    style: 'min-width: auto;',
                                    items: [{ caption : '1', value: 1 }, { caption : '2', value: 2 }, { caption : '3', value: 3 },
                                        { caption : '4', value: 4 }, { caption : '5', value: 5 }, { caption : '6', value: 6 },
                                        { caption : '7', value: 7 }, { caption : '8', value: 8 },  { caption : '9', value: 9 }]})
                        },
                        {
                            caption: '--',
                            visible: true
                        },
                        {
                            caption: this.txtFontSize,
                            value: 'font-size',
                            menu: new Common.UI.Menu({
                                menuAlign: 'tl-tr',
                                style: 'min-width: auto;',
                                items: [
                                    {
                                        caption: this.txtSmall,
                                        checkable: true,
                                        value: 'small',
                                        checked: fontSizeClass == 'small',
                                        toggleGroup: 'fontsize'
                                    },
                                    {
                                        caption: this.txtMedium,
                                        checkable: true,
                                        value: 'medium',
                                        checked: fontSizeClass == 'medium',
                                        toggleGroup: 'fontsize'
                                    },
                                    {
                                        caption: this.txtLarge,
                                        checkable: true,
                                        checked: fontSizeClass == 'large',
                                        value: 'large',
                                        toggleGroup: 'fontsize'
                                    }
                                ]})

                        },
                        {
                            caption: '--',
                            visible: true
                        },
                        {
                            caption: this.txtWrapHeadings,
                            checkable: true,
                            checked: isWrap,
                            value: 'wrap'
                        }
                    ]
                })
            });
            this.btnSettingsMenu = this.btnSettings.menu;

            this.viewNavigationList = new Common.UI.TreeView({
                el: $('#navigation-list'),
                store: this.storeNavigation,
                enableKeyEvents: false,
                emptyText: this.txtEmpty,
                emptyItemText: this.txtEmptyItem,
                style: 'border: none;',
                delayRenderTips: true,
                minScrollbarLength: 25
            });

            this.viewNavigationList.cmpEl.off('click');
            this.viewNavigationList.$el.addClass( fontSizeClass);
            isWrap && this.viewNavigationList.$el.addClass( 'wrap');
            this.navigationMenu = new Common.UI.Menu({
                cls: 'shifted-right',
                items: [{
                        iconCls     : 'menu__icon btn-promote',
                        caption     : this.txtPromote,
                        value: 'promote'
                    },
                    {
                        iconCls     : 'menu__icon btn-demote',
                        caption     : this.txtDemote,
                        value: 'demote'
                    },
                    {
                        caption     : '--'
                    },
                    {
                        caption     : this.txtHeadingBefore,
                        value: 'before'
                    },
                    {
                        caption     : this.txtHeadingAfter,
                        value: 'after'
                    },
                    {
                        caption     : this.txtNewHeading,
                        value: 'new'
                    },
                    {
                        caption     : '--'
                    },
                    {
                        iconCls     : 'menu__icon btn-select-all',
                        caption     : this.txtSelect,
                        value: 'select'
                    },
                    {
                        caption     : '--'
                    },
                    {
                        iconCls     : 'menu__icon btn-expand-all',
                        caption     : this.txtExpand,
                        value: 'expand'
                    },
                    {
                        iconCls     : 'menu__icon btn-collapse-all',
                        caption     : this.txtCollapse,
                        value: 'collapse'
                    },
                    {
                        caption     : this.txtExpandToLevel,
                        menu: new Common.UI.Menu({
                            menuAlign: 'tl-tr',
                            style: 'min-width: 60px;',
                            items: [{ caption : '1', value: 1 }, { caption : '2', value: 2 }, { caption : '3', value: 3 },
                                { caption : '4', value: 4 }, { caption : '5', value: 5 }, { caption : '6', value: 6 },
                                { caption : '7', value: 7 }, { caption : '8', value: 8 },  { caption : '9', value: 9 }
                            ]
                        })
                    }
                ]
            });
            this.trigger('render:after', this);
            return this;
        },

        show: function () {
            Common.UI.BaseView.prototype.show.call(this,arguments);
            this.fireEvent('show', this );
        },

        hide: function () {
            Common.UI.BaseView.prototype.hide.call(this,arguments);
            this.fireEvent('hide', this );
        },

        changeWrapHeadings: function(){
            Common.localStorage.setBool("de-outline-wrap", this.btnSettingsMenu.items[6].checked);
            if(!this.btnSettingsMenu.items[6].checked)
                this.viewNavigationList.$el.removeClass('wrap');
            else
                this.viewNavigationList.$el.addClass('wrap');
        },

        changeFontSize: function (value){
            Common.localStorage.setItem("de-outline-fontsize", value);
            this.viewNavigationList.$el.removeClass();
            this.viewNavigationList.$el.addClass( value);
            this.changeWrapHeadings();
        },

        ChangeSettings: function(props) {
        },

        txtPromote: 'Promote',
        txtDemote: 'Demote',
        txtHeadingBefore: 'New heading before',
        txtHeadingAfter: 'New heading after',
        txtNewHeading: 'New subheading',
        txtSelect: 'Select content',
        txtExpand: 'Expand all',
        txtCollapse: 'Collapse all',
        txtExpandToLevel: 'Expand to level...',
        txtEmpty: 'There are no headings in the document.<br>Apply a heading style to the text so that it appears in the table of contents.',
        txtEmptyItem: 'Empty Heading',
        txtEmptyViewer: 'There are no headings in the document.',
        strNavigate: "Headings",
        txtWrapHeadings: "Wrap long headings",
        txtFontSize: "Font size",
        txtSmall: "Small",
        txtMedium: "Medium",
        txtLarge:"Large",
        txtClosePanel: "Close headings",
        txtSettings: "Headings settings"

    }, DE.Views.Navigation || {}));
});