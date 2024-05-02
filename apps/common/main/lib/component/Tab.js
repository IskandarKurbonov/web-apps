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
], function (base) {
    'use strict';

    var Tab = function(opts) {
        this.active     = false;
        this.label      = 'Tab';
        this.cls        = '';
        this.iconCls    = '';
        this.iconVisible = false;
        this.iconTitle = '';
        this.index = -1;
        this.template   = _.template(['<li class="list-item <% if(active){ %>active selected<% } %> <% if(cls.length){%><%= cls %><%}%><% if(iconVisible){%> icon-visible <%}%>" data-label="<%- label %>">',
                                            '<span tabtitle="<%- label %>" draggable="true" oo_editor_input="true" tabindex="-1" data-index="<%= index %>">',
                                            '<div class="toolbar__icon <% if(iconCls.length){%><%= iconCls %><%}%>" title="<% if(iconTitle.length){%><%=Common.Utils.String.htmlEncode(iconTitle)%><%}%>"></div>',
                                            '<%- label %>',
                                            '</span>',
                                        '</li>'].join(''));

        this.initialize.call(this, opts);
        return this;
    };

    _.extend(Tab.prototype, {
        initialize: function(options) {
            _.extend(this, options);
        },

        render: function() {
            var el      = this.template(this);
            this.$el    = $(el);
            /*this.$el.find('span').tooltip({
                title: this.label,
                placement: 'cursor'});*/
            this.rendered = true;
            this.disable(this.disabled);
            return this;
        },

        isActive: function() {
            return this.$el.hasClass('active');
        },

        activate: function(){
            if (!this.$el.hasClass('active'))
                this.$el.addClass('active');
        },

        isSelected: function() {
            return this.$el.hasClass('selected');
        },

        deactivate: function(){
            this.$el.removeClass('active');
        },

        on: function() {
            this.$el.on.apply(this, arguments);
        },

        disable: function(val) {
            this.disabled = val;

            if (this.rendered) {
                if (val && !this.$el.hasClass('disabled'))
                    this.$el.addClass('disabled'); else
                    this.$el.removeClass('disabled');
            }
        },

        addClass: function(cls) {
            if (cls.length && !this.$el.hasClass(cls))
                this.$el.addClass(cls);
        },

        removeClass: function(cls) {
            if (cls.length && this.$el.hasClass(cls))
                this.$el.removeClass(cls);
        },

        toggleClass: function(cls) {
            if (cls.length)
                this.$el.toggleClass(cls);
        },

        hasClass: function(cls) {
            return this.$el.hasClass(cls);
        },

        setCaption: function(text) {
            this.$el.find('> span').text(text);
        },

        changeIconState: function(visible, title) {
            if (this.iconCls.length) {
                this.iconVisible = visible;
                this.iconTitle = title || '';
                this[visible ? 'addClass' : 'removeClass']('icon-visible');
                if (title)
                    this.$el.find('.' + this.iconCls).attr('title', title);
            }
        }
    });

    Common.UI.Tab = Tab;
});

