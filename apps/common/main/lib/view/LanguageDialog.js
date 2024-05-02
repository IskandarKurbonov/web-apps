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
    'common/main/lib/component/Window'
], function () { 'use strict';

    Common.Views.LanguageDialog = Common.UI.Window.extend(_.extend({

    options: {
        header: false,
        width: 350,
        cls: 'modal-dlg',
        buttons: ['ok', 'cancel']
    },

    template:   '<div class="box">' +
        '<div class="input-row">' +
        '<label><%= label %></label>' +
        '</div>' +
        '<div class="input-row" id="id-document-language">' +
        '</div>' +
        '</div>',

    initialize : function(options) {
        _.extend(this.options, options || {}, {
            label: this.labelSelect
        });
        this.options.tpl = _.template(this.template)(this.options);

        Common.UI.Window.prototype.initialize.call(this, this.options);
    },

    render: function() {
        Common.UI.Window.prototype.render.call(this);

        var $window = this.getChild();
        $window.find('.dlg-btn').on('click', _.bind(this.onBtnClick, this));

        this.cmbLanguage = new Common.UI.ComboBox({
            el: $window.find('#id-document-language'),
            cls: 'input-group-nr',
            menuStyle: 'min-width: 318px; max-height: 285px;',
            editable: false,
            template: _.template([
                '<span class="input-group combobox <%= cls %> combo-langs" id="<%= id %>" style="<%= style %>">',
                    '<input type="text" class="form-control">',
                    '<span class="icon input-icon spellcheck-lang toolbar__icon btn-ic-docspell"></span>',
                    '<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">',
                        '<span class="caret" />',
                    '</button>',
                    '<ul class="dropdown-menu <%= menuCls %>" style="<%= menuStyle %>" role="menu">',
                        '<% _.each(items, function(item) { %>',
                        '<li id="<%= item.id %>" data-value="<%= item.value %>">',
                            '<a tabindex="-1" type="menuitem" langval="<%= item.value %>">',
                                '<i class="icon <% if (item.spellcheck) { %> toolbar__icon btn-ic-docspell spellcheck-lang <% } %>"></i>',
                                '<%= scope.getDisplayValue(item) %>',
                            '</a>',
                        '</li>',
                        '<% }); %>',
                    '</ul>',
                '</span>'
            ].join('')),
            data: this.options.languages,
            takeFocusOnClose: true,
            search: true,
            scrollAlwaysVisible: true
        });

        if (this.cmbLanguage.scroller) this.cmbLanguage.scroller.update({alwaysVisibleY: true});
        this.cmbLanguage.on('selected', _.bind(this.onLangSelect, this));
        var langname = Common.util.LanguageInfo.getLocalLanguageName(this.options.current);
        this.cmbLanguage.setValue(langname[0], langname[1]);
        this.onLangSelect(this.cmbLanguage, this.cmbLanguage.getSelectedRecord());

        var me = this;
        setTimeout(function(){
            me.cmbLanguage.focus();
        }, 100);
    },

    getFocusedComponents: function() {
        return [this.cmbLanguage].concat(this.getFooterButtons());
    },

    getDefaultFocusableComponent: function () {
        return this.cmbLanguage;
    },

    close: function(suppressevent) {
        var $window = this.getChild();
        if (!$window.find('.combobox.open').length) {
            Common.UI.Window.prototype.close.call(this, arguments);
        }
    },

    onBtnClick: function(event) {
        if (this.options.handler) {
            this.options.handler.call(this, event.currentTarget.attributes['result'].value, this.cmbLanguage.getValue());
        }

        this.close();
    },

    onLangSelect: function(cmb, rec, e) {
        cmb.$el.find('.input-icon').toggleClass('spellcheck-lang', rec && rec.spellcheck);
        cmb._input.css(Common.UI.isRTL() ? 'padding-right' : 'padding-left', rec && rec.spellcheck ? 25 : 3);
    },

    onPrimary: function() {
        if (this.options.handler) {
            this.options.handler.call(this, 'ok', this.cmbLanguage.getValue());
        }

        this.close();
        return false;
    },

    labelSelect     : 'Select document language'
    }, Common.Views.LanguageDialog || {}))
});