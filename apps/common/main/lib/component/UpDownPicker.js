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
], function () {
    'use strict';

    Common.UI.UpDownPicker = Common.UI.BaseView.extend((function(){
        return {
            options: {
                caption: '',
                iconUpCls: 'btn-zoomup',
                iconDownCls: 'btn-zoomdown',
                minWidth: 40
            },
            disabled    : false,

            template:_.template([
                '<label class="title float-left"><%= options.caption %></label>',
                '<button type="button" class="btn small btn-toolbar updown-picker-button-up float-right"><i class="icon menu__icon <%= options.iconUpCls %>">&nbsp;</i></button>',
                '<label class="updown-picker-value float-right" style="min-width: <%= options.minWidth %>px;"></label>',
                '<button type="button" class="btn small btn-toolbar updown-picker-button-down float-right"><i class="icon menu__icon <%= options.iconDownCls %>">&nbsp;</i></button>'
            ].join('')),

            initialize : function(options) {
                Common.UI.BaseView.prototype.initialize.call(this, options);

                this.render();

                this.cmpEl = this.$el || $(this.el);

                this.btnUp = new Common.UI.Button({
                    el:  this.cmpEl.find('.updown-picker-button-up')
                }).on('click', _.bind(function () {
                    this.trigger('click', 'up');
                }, this));

                this.btnDown = new Common.UI.Button({
                    el:  this.cmpEl.find('.updown-picker-button-down')
                }).on('click', _.bind(function () {
                    this.trigger('click', 'down');
                }, this));

                this.displayValue = this.cmpEl.find('.updown-picker-value');

                if (this.options.disabled)
                    this.setDisabled(this.options.disabled);
            },

            render: function() {
                var el = this.$el || $(this.el);
                el.html($(this.template({
                    options: this.options
                })));

                this.rendered = true;

                return this;
            },

            setValue: function(value) {
                this.displayValue.html(value || '');
            },

            setDisabled: function(disabled) {
                if (!this.rendered)
                    return;

                disabled = (disabled===true);
                if (disabled !== this.disabled) {
                    this.btnUp.setDisabled(disabled);
                    this.btnDown.setDisabled(disabled);
                }

                this.disabled = disabled;
            }
        }
    })())
});
