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
 * @example
 *      new Common.UI.LoadMask({
 *          owner: $('#viewport')
 *      });
 *
 *  @property {Object} owner
 *
 *  Component or selector that will be masked.
 *
 *
 *  @property {String} title
 *
 *  @property {String} cls
 *
 *  @property {String} style
 *
 */

if (Common === undefined)
    var Common = {};

define([
    'common/main/lib/component/BaseView'
], function () {
    'use strict';

    Common.UI.LoadMask = Common.UI.BaseView.extend((function() {
        return {
            options : {
                cls     : '',
                style   : '',
                title   : 'Loading...',
                owner   : document.body
            },

            template: _.template([
                '<div id="<%= id %>" class="asc-loadmask-body <%= cls %>" role="presentation" tabindex="-1">',
                    '<i id="loadmask-spinner" class="asc-loadmask-image"></i>',
                    '<div class="asc-loadmask-title"><%= title %></div>',
                '</div>'
            ].join('')),

            initialize : function(options) {
                Common.UI.BaseView.prototype.initialize.call(this, options);

                this.template   = this.options.template || this.template;
                this.title      = this.options.title;

                this.ownerEl     = (this.options.owner instanceof Common.UI.BaseView) ? $(this.options.owner.el) : $(this.options.owner);
                this.loaderEl    = $(this.template({
                    id      : this.id,
                    cls     : this.options.cls,
                    style   : this.options.style,
                    title   : this.title
                }));
                this.maskeEl = $('<div class="asc-loadmask"></div>');
                this.timerId = 0;
            },

            render: function() {
                return this;
            },

            internalShowLoader: function() {
                this.ownerEl.append(this.loaderEl);
                this.loaderEl.css('min-width', $('.asc-loadmask-title', this.loaderEl).width() + 105);

                if (this.ownerEl && this.ownerEl.closest('.asc-window.modal').length==0)
                    Common.util.Shortcuts.suspendEvents();
            },

            internalShowMask: function() {
                if (!!this.ownerEl.ismasked) return;

                this.ownerEl.ismasked = true;
                this.ownerEl.append(this.maskeEl);
            },

            show: function(immediately){
                this.internalShowMask();

                // The owner is already masked
                if (!!this.ownerEl.hasloader)
                    return this;

                this.ownerEl.hasloader = true;

                var me = this;
                if (me.title != me.options.title) {
                    me.options.title = me.title;
                    $('.asc-loadmask-title', this.loaderEl).html(me.title);
                }

                if (immediately) {
                    me.internalShowLoader();
                } else if (!me.timerId) {
                    // show mask after 500 ms if it wont be hided
                    me.timerId = setTimeout(function () {
                        me.internalShowLoader();
                    },500);
                }

                return this;
            },

            hide: function() {
                var ownerEl = this.ownerEl;
                if (this.timerId) {
                    clearTimeout(this.timerId);
                    this.timerId = 0;
                }

                ownerEl && ownerEl.ismasked && this.maskeEl && this.maskeEl.remove();
                delete ownerEl.ismasked;

                if (ownerEl && ownerEl.hasloader) {
                    if (ownerEl.closest('.asc-window.modal').length==0 && !Common.Utils.ModalWindow.isVisible())
                        Common.util.Shortcuts.resumeEvents();

                    this.loaderEl    && this.loaderEl.remove();
                }
                delete ownerEl.hasloader;
            },

            setTitle: function(title) {
                this.title = title;

                if (this.ownerEl && this.ownerEl.hasloader && this.loaderEl){
                    var el = $('.asc-loadmask-title', this.loaderEl);
                    el.html(title);
                    this.loaderEl.css('min-width', el.width() + 105);
                }
            },

            isVisible: function() {
                return !!this.ownerEl.ismasked;
            },

            updatePosition: function() {
                var ownerEl = this.ownerEl,
                    loaderEl = this.loaderEl;
                if (ownerEl && ownerEl.hasloader && loaderEl){
                    loaderEl.css({
                        top : Math.round(ownerEl.height() / 2 - (loaderEl.height() + parseInt(loaderEl.css('padding-top'))  + parseInt(loaderEl.css('padding-bottom'))) / 2) + 'px',
                        left: Math.round(ownerEl.width()  / 2 - (loaderEl.width()  + parseInt(loaderEl.css('padding-left')) + parseInt(loaderEl.css('padding-right')))  / 2) + 'px'
                    });
                    loaderEl.css({visibility: 'visible'});
                }
            }
        }
    })())
});

