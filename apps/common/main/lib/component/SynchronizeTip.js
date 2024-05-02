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

    Common.UI.SynchronizeTip = Common.UI.BaseView.extend(_.extend((function() {
        return {
            options : {
                target  : $(document.body),
                text    : '',
                placement: 'right-bottom',
                showLink: true,
                showButton: false,
                closable: true
            },

            template: _.template([
                '<div class="synch-tip-root <% if (!!scope.options.extCls) {print(scope.options.extCls + \" \");} %><%= scope.placement %>" style="<%= scope.style %>">',
                    '<div class="asc-synchronizetip">',
                        '<div class="tip-arrow <%= scope.placement %>"></div>',
                        '<div>',
                            '<div class="tip-text"><%= scope.text %></div>',
                            '<% if ( scope.closable ) { %>',
                            '<div class="close"></div>',
                            '<% } %>',
                        '</div>',
                        '<% if ( scope.showLink ) { %>',
                        '<div class="show-link"><label><%= scope.textLink %></label></div>',
                        '<% } %>',
                        '<% if ( scope.showButton ) { %>',
                        '<div class="btn-div"><%= scope.textButton %></div>',
                        '<% } %>',
                    '</div>',
                '</div>'
            ].join('')),

            initialize : function(options) {
                this.textSynchronize += Common.Utils.String.platformKey('Ctrl+S');
                
                Common.UI.BaseView.prototype.initialize.call(this, options);
                this.target = this.options.target;
                this.text = !_.isEmpty(this.options.text) ? this.options.text : this.textSynchronize;
                this.textLink = !_.isEmpty(this.options.textLink) ? this.options.textLink : this.textDontShow;
                this.placement = this.options.placement; // if placement='target' and position is undefined  show in top,left position of target, also use for arrow position
                this.showLink = this.options.showLink;
                this.showButton = this.options.showButton;
                this.closable = this.options.closable;
                this.textButton = this.options.textButton || '';
                this.position = this.options.position; // show in the position relative to target
                this.style = this.options.style || '';
            },

            render: function() {
                if (!this.cmpEl) {
                    this.cmpEl = $(this.template({ scope: this }));
                    $(document.body).append(this.cmpEl);
                    this.cmpEl.find('.close').on('click', _.bind(function() { this.trigger('closeclick');}, this));
                    this.cmpEl.find('.show-link label').on('click', _.bind(function() { this.trigger('dontshowclick');}, this));
                    this.cmpEl.find('.btn-div').on('click', _.bind(function() { this.trigger('buttonclick');}, this));

                    this.closable && this.cmpEl.addClass('closable');
                }

                this.applyPlacement();

                return this;
            },

            show: function(){
                if (this.cmpEl) {
                    this.applyPlacement();
                    this.cmpEl.show()
                } else
                    this.render();
            },

            hide: function() {
                if (this.cmpEl) this.cmpEl.hide();
                this.trigger('hide');
            },

            close: function() {
                if (this.cmpEl) this.cmpEl.remove();
                this.trigger('close');
            },

            applyPlacement: function () {
                var target = this.target && this.target.length>0 ? this.target : $(document.body);
                var showxy = target.offset();
                if (this.placement=='target' && !this.position) {
                    this.cmpEl.css({top : showxy.top + 5 + 'px', left: showxy.left + 5 + 'px'});
                    return;
                }

                if (this.position && typeof this.position == 'object') {
                    var top = this.position.top, left = this.position.left, bottom = this.position.bottom, right = this.position.right;
                    if (bottom!==undefined || top!==undefined)
                        left = showxy.left + (target.width() - this.cmpEl.width())/2;
                    else
                        top = showxy.top + (target.height() - this.cmpEl.height())/2;
                    top = (top!==undefined) ? (top + 'px') : 'auto';
                    bottom = (bottom!==undefined) ? (bottom + 'px') : 'auto';
                    right = (right!==undefined) ? (right + 'px') : 'auto';
                    left = (left!==undefined) ? (left + 'px') : 'auto';

                    this.cmpEl.css({top : top, left: left, right: right, bottom: bottom});
                    return;
                }

                var placement = this.placement.split('-');
                if (placement.length>0) {
                    var top, left, bottom, right;
                    var pos = placement[0];
                    if (pos=='top') {
                        bottom = Common.Utils.innerHeight() - showxy.top;
                    } else if (pos == 'bottom') {
                        top = showxy.top + target.height();
                    } else if (pos == 'left') {
                        right = Common.Utils.innerWidth() - showxy.left;
                    } else if (pos == 'right') {
                        left = showxy.left + target.width();
                    }
                    pos = placement[1];
                    if (pos=='top') {
                        bottom = Common.Utils.innerHeight() - showxy.top - target.height()/2;
                    } else if (pos == 'bottom') {
                        top = showxy.top + target.height()/2;
                        var height = this.cmpEl.height();
                        if (top+height>Common.Utils.innerHeight())
                            top = Common.Utils.innerHeight() - height - 10;
                    } else if (pos == 'left') {
                        right = Common.Utils.innerWidth() - showxy.left - target.width()/2;
                    } else if (pos == 'right') {
                        left = showxy.left + target.width()/2;
                    } else {
                        if (bottom!==undefined || top!==undefined)
                            left = showxy.left + (target.width() - this.cmpEl.width())/2;
                        else
                            top = showxy.top + (target.height() - this.cmpEl.height())/2;
                    }
                    top = (top!==undefined) ? (top + 'px') : 'auto';
                    bottom = (bottom!==undefined) ? (bottom + 'px') : 'auto';
                    right = (right!==undefined) ? (right + 'px') : 'auto';
                    if (left!==undefined) {
                        var width = this.cmpEl.width();
                        if (left+width>Common.Utils.innerWidth())
                            left = Common.Utils.innerWidth() - width - 10;
                        left = (left + 'px');
                    } else
                        left = 'auto';
                    this.cmpEl.css({top : top, left: left, right: right, bottom: bottom});
                }
            },

            isVisible: function() {
                return this.cmpEl && this.cmpEl.is(':visible');
            },

            textDontShow        : 'Don\'t show this message again',
            textSynchronize     : 'The document has been changed by another user.<br>Please click to save your changes and reload the updates.'
        }
    })(), Common.UI.SynchronizeTip || {}));
});

