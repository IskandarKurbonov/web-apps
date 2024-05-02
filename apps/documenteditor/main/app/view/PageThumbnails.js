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
 * User: Julia.Svinareva
 * Date: 23.08.2021
 */

define([
    'common/main/lib/util/utils',
    'common/main/lib/component/BaseView',
    'common/main/lib/component/Layout',
    'common/main/lib/component/TreeView',
    'common/main/lib/component/Slider'
], function (template) {
    'use strict';

    DE.Views.PageThumbnails = Common.UI.BaseView.extend(_.extend({
        el: '#left-panel-thumbnails',

        storeThumbnails: undefined,
        template: _.template([
            '<div id="thumbnails-box" class="layout-ct vbox">',
                '<div id="thumbnails-header">',
                    '<label><%= scope.textPageThumbnails %></label>',
                    '<div id="thumbnails-btn-close" class="float-right margin-left-4"></div>',
                    '<div id="thumbnails-btn-settings" class="float-right"></div>',
                '</div>',
                '<div id="thumbnails-list">',
                '</div>',
            '</div>'
        ].join('')),

        initialize: function(options) {
            _.extend(this, options);
            Common.UI.BaseView.prototype.initialize.call(this, arguments);
        },

        render: function(el) {
            if (!this.rendered) {
                el = el || this.el;
                $(el).html(this.template({scope: this}));
                this.$el = $(el);

                this.buttonClose = new Common.UI.Button({
                    parentEl: $('#thumbnails-btn-close', this.$el),
                    cls: 'btn-toolbar',
                    iconCls: 'toolbar__icon btn-close',
                    hint: this.textClosePanel
                });
                this.buttonClose.on('click', _.bind(this.onClickClosePanel, this));

                this.mnuSizeSetting = new Common.UI.MenuItem({
                    template: _.template([
                        '<div id="thumbnails-size"',
                            '<% if(!_.isUndefined(options.stopPropagation)) { %>',
                                'data-stopPropagation="true"',
                            '<% } %>', '>',
                            '<label>' + this.textThumbnailsSize + '</label>',
                            '<div class="thumbnails-sld-box">',
                                '<span class="menu-item-icon menu__icon btn-thumbnail-small"></span>',
                                '<div id="sld-thumbnails-size"></div>',
                                '<span class="menu-item-icon menu__icon btn-thumbnail-big"></span>',
                            '</div>',
                        '</div>'
                    ].join('')),
                    stopPropagation: true
                });

                this.buttonSettings = new Common.UI.Button({
                    parentEl: $('#thumbnails-btn-settings', this.$el),
                    cls: 'btn-toolbar',
                    iconCls: 'toolbar__icon btn-settings',
                    hint: this.textThumbnailsSettings,
                    menu: new Common.UI.Menu({
                        menuAlign: 'tr-br',
                        style: 'min-width: 198px;',
                        items: [
                            this.mnuSizeSetting,
                            {caption: '--'},
                            {
                                caption: this.textHighlightVisiblePart,
                                checkable: true,
                                value: 'highlight',
                                checked: Common.localStorage.getBool("de-thumbnails-highlight", true)
                            }
                        ]
                    })
                });
            }

            this.sldrThumbnailsSize = new Common.UI.SingleSlider({
                el: $('#sld-thumbnails-size'),
                width: 120,
                minValue: 0,
                maxValue: 100,
                value: 50
            });

            this.rendered = true;
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

        ChangeSettings: function(props) {
        },

        onClickClosePanel: function() {
            Common.NotificationCenter.trigger('leftmenu:change', 'hide');
        },

        textPageThumbnails: 'Page Thumbnails',
        textClosePanel: 'Close page thumbnails',
        textThumbnailsSettings: 'Thumbnails settings',
        textThumbnailsSize: 'Thumbnails size',
        textHighlightVisiblePart: 'Highlight visible part of page'

    }, DE.Views.PageThumbnails || {}));
});