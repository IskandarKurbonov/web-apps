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

define([
    'common/main/lib/component/BaseView'
], function () { 'use strict';

    Common.UI.ColorPalette = Common.UI.BaseView.extend({
        options: {
            allowReselect: true,
            cls: '',
            style: ''
        },

        template:_.template([
            '<div class="palette-color">',
                '<% _.each(colors, function(color, index) { %>',
                    '<span class="color-item" data-color="<%= color %>" style="background-color: #<%= color %>;"></span>',
                '<% }) %>',
            '</div>'
        ].join('')),

        initialize : function(options) {
            Common.UI.BaseView.prototype.initialize.call(this, options);

            var me = this;

            this.id = me.options.id;
            this.cls = me.options.cls;
            this.style = me.options.style;
            this.colors = me.options.colors || [];
            this.value = me.options.value;

            if (me.options.el) {
                me.render();
            }
        },

        render: function (parentEl) {
            var me = this;

            if (!me.rendered) {
                this.cmpEl = $(this.template({
                    id          : this.id,
                    cls         : this.cls,
                    style       : this.style,
                    colors      : this.colors
                }));

                if (parentEl) {
                    this.setElement(parentEl, false);
                    parentEl.html(this.cmpEl);
                } else {
                    me.$el.html(this.cmpEl);
                }
            } else {
                this.cmpEl = me.$el || $(this.el);
            }

            if (!me.rendered) {
                me.cmpEl.on('click', 'span.color-item', me.itemClick.bind(me));
            }

            me.rendered = true;

            return this;
        },

        itemClick: function(e) {
            var item = $(e.target);

            this.select(item.attr('data-color'));
        },

        select: function(color, suppressEvent) {
            if (this.value != color) {
                var me = this;

                // Remove selection with other elements
                $('span.color-item', this.cmpEl).removeClass('selected');

                this.value = color;

                if (color && /#?[a-fA-F0-9]{6}/.test(color)) {
                    color = /#?([a-fA-F0-9]{6})/.exec(color)[1].toUpperCase();

                    $('span[data-color=' + color + ']', this.cmpEl).addClass('selected');

                    if (!suppressEvent)
                        me.trigger('select', me, this.value);
                }
            }
        }
    });
});