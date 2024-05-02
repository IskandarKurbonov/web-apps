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
    'common/main/lib/component/BaseView',
    'common/main/lib/component/Tooltip'
], function () { 'use strict';

    Common.UI.TextareaField = Common.UI.BaseView.extend((function() {
        return {
            options : {
                id          : null,
                cls         : '',
                style       : '',
                value       : '',
                maxlength   : undefined,
                placeHolder : '',
                spellcheck  : false,
                disabled: false,
                resize: false
            },

            template: _.template([
                '<div class="textarea-field" style="<%= style %>">',
                    '<textarea ',
                    'spellcheck="<%= spellcheck %>" ',
                    'class="form-control <%= cls %>" ',
                    'placeholder="<%= placeHolder %>" ',
                    '<% if (dataHint) {%>',
                    'data-hint="<%= dataHint %>" ',
                    '<% } %>',
                    '<% if (dataHintDirection) {%>',
                    'data-hint-direction="<%= dataHintDirection %>" ',
                    '<% } %>',
                    '<% if (dataHintOffset) {%>',
                    'data-hint-offset="<%= dataHintOffset %>" ',
                    '<% } %>',
                    '></textarea>',
                '</div>'
            ].join('')),

            initialize : function(options) {
                Common.UI.BaseView.prototype.initialize.call(this, options);

                var me = this;

                this.id             = me.options.id || Common.UI.getId();
                this.cls            = me.options.cls;
                this.style          = me.options.style;
                this.value          = me.options.value;
                this.placeHolder    = me.options.placeHolder;
                this.template       = me.options.template || me.template;
                this.disabled       = me.options.disabled;
                this.spellcheck     = me.options.spellcheck;
                this.maxLength      = me.options.maxLength;

                me.rendered         = me.options.rendered || false;

                if (me.options.el) {
                    me.render();
                }
            },

            render : function(parentEl) {
                var me = this;

                if (!me.rendered) {
                    this.cmpEl = $(this.template({
                        id          : this.id,
                        cls         : this.cls,
                        style       : this.style,
                        placeHolder : this.placeHolder,
                        spellcheck  : this.spellcheck,
                        dataHint    : this.options.dataHint,
                        dataHintDirection: this.options.dataHintDirection,
                        dataHintOffset: this.options.dataHintOffset,
                        scope       : me
                    }));

                    if (parentEl) {
                        this.setElement(parentEl, false);
                        parentEl.html(this.cmpEl);
                    } else {
                        this.$el.html(this.cmpEl);
                    }
                } else {
                    this.cmpEl = this.$el;
                }

                if (!me.rendered) {
                    var el = this.cmpEl;

                    this._input = this.cmpEl.find('textarea').addBack().filter('textarea');
                    this._input.on('blur',   _.bind(this.onInputChanged, this));
                    this._input.on('keydown',    _.bind(this.onKeyDown, this));
                    if (this.maxLength) this._input.attr('maxlength', this.maxLength);
                    if (!this.resize) this._input.css('resize', 'none');

                    if (this.disabled)
                        this.setDisabled(this.disabled);
                }

                me.rendered = true;

                if (me.value)
                    me.setValue(me.value);

                return this;
            },

            _doChange: function(e, extra) {
                // skip processing for internally-generated synthetic event
                // to avoid double processing
                if (extra && extra.synthetic)
                    return;

                var newValue = $(e.target).val(),
                    oldValue = this.value;

                this.trigger('changed:before', this, newValue, oldValue, e);

                if (e.isDefaultPrevented())
                    return;

                this.value = newValue;

                // trigger changed event
                this.trigger('changed:after', this, newValue, oldValue, e);
            },

            onInputChanged: function(e, extra) {
                this._doChange(e, extra);
            },

            onKeyDown: function(e) {
                this.trigger('keydown:before', this, e);

                if (e.isDefaultPrevented())
                    return;

                if (e.keyCode === Common.UI.Keys.RETURN) {
                    e.stopPropagation();
                }
                if (e.keyCode == Common.UI.Keys.ESC)
                    this.setValue(this.value);
                if (e.keyCode==Common.UI.Keys.ESC)
                    this.trigger('inputleave', this);
            },

            setDisabled: function(disabled) {
                disabled = !!disabled;
                this.disabled = disabled;
                $(this.el).toggleClass('disabled', disabled);
                disabled
                    ? this._input.attr('disabled', true)
                    : this._input.removeAttr('disabled');
            },

            isDisabled: function() {
                return this.disabled;
            },

            setValue: function(value) {
                this.value = value;

                if (this.rendered){
                    this._input.val(value);
                }
            },

            getValue: function() {
                return this.value;
            },

            focus: function() {
                this._input.focus();
            }
        }
    })());
});
