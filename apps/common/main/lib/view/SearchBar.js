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

define([
    'common/main/lib/component/Window',
    'common/main/lib/component/Button'
], function () {
    'use strict';

    Common.UI.SearchBar = Common.UI.Window.extend(_.extend({
        options: {
            modal: false,
            width: 328,
            height: 54,
            header: false,
            cls: 'search-bar',
            alias: 'SearchBar',
            showOpenPanel: true,
            toolclose: 'hide',
            automove: false
        },

        initialize : function(options) {
            _.extend(this.options, options || {});

            this.template = [
                '<div class="box">',
                    '<div class="search-input-group">',
                        '<input type="text" id="search-bar-text" class="input-field form-control" maxlength="255" placeholder="'+this.textFind+'" autocomplete="off">',
                        '<div id="search-bar-results">0/0</div>',
                    '</div>',
                    '<div class="tools">',
                        '<div id="search-bar-back"></div>',
                        '<div id="search-bar-next"></div>',
                        this.options.showOpenPanel ? '<div id="search-bar-open-panel"></div>' : '',
                        '<div id="search-bar-close"></div>',
                    '</div>',
                '</div>'
            ].join('');

            this.options.tpl = _.template(this.template)(this.options);
            this.iconType = this.options.iconType;

            Common.UI.Window.prototype.initialize.call(this, this.options);

            Common.NotificationCenter.on('layout:changed', _.bind(this.onLayoutChanged, this));
            $(window).on('resize', _.bind(this.onLayoutChanged, this));
        },

        render: function() {
            Common.UI.Window.prototype.render.call(this);

            this.inputSearch = this.$window.find('#search-bar-text');
            this.inputSearch.on('input', _.bind(function () {
                this.disableNavButtons();
                this.fireEvent('search:input', [this.inputSearch.val()]);
            }, this)).on('keydown', _.bind(function (e) {
                this.fireEvent('search:keydown', [this.inputSearch.val(), e]);
            }, this));

            const is_svg_icon = this.iconType === 'svg';
            this.btnBack = new Common.UI.Button({
                parentEl: $('#search-bar-back'),
                cls: 'btn-toolbar',
                iconCls: is_svg_icon ? 'svg-icon search-arrow-up' : 'toolbar__icon btn-arrow-up',
                hint: this.tipPreviousResult,
                scaling: !is_svg_icon,
            });
            this.btnBack.on('click', _.bind(this.onBtnNextClick, this, 'back'));

            this.btnNext = new Common.UI.Button({
                parentEl: $('#search-bar-next'),
                cls: 'btn-toolbar',
                iconCls: is_svg_icon ? 'svg-icon search-arrow-down' : 'toolbar__icon btn-arrow-down',
                hint: this.tipNextResult,
                scaling: !is_svg_icon,
            });
            this.btnNext.on('click', _.bind(this.onBtnNextClick, this, 'next'));

            if (this.options.showOpenPanel) {
                this.btnOpenPanel = new Common.UI.Button({
                    parentEl: $('#search-bar-open-panel'),
                    cls: 'btn-toolbar',
                    iconCls: 'toolbar__icon btn-more-vertical',
                    hint: this.tipOpenAdvancedSettings
                });
                this.btnOpenPanel.on('click', _.bind(this.onOpenPanel, this));
            }

            this.btnClose = new Common.UI.Button({
                parentEl: $('#search-bar-close'),
                cls: 'btn-toolbar',
                iconCls: is_svg_icon ? 'svg-icon search-close' : 'toolbar__icon btn-close',
                hint: this.tipCloseSearch,
                scaling: !is_svg_icon,
            });
            this.btnClose.on('click', _.bind(function () {
                this.hide();
            }, this))

            this.searchResults = $('#search-bar-results');

            this.on('animate:before', _.bind(this.focus, this));

            Common.NotificationCenter.on('search:updateresults', _.bind(function (resultNumber, allResults) {
                this.disableNavButtons(resultNumber, allResults);
                this.updateResultsNumber(resultNumber, allResults);
            }, this));

            return this;
        },

        show: function(text) {
            var top = ($('#app-title').length > 0 ? $('#app-title').height() : 0) + $('#toolbar').height() + 2,
                left = !Common.UI.isRTL() ? Common.Utils.innerWidth() - ($('#right-menu').is(':visible') ? $('#right-menu').width() : 0) - this.options.width - 32 :
                    ($('#right-menu').is(':visible') ? $('#right-menu').width() : 0) + 32;
            Common.UI.Window.prototype.show.call(this, left, top);

            this.disableNavButtons();
            if (text) {
                this.inputSearch.val(text);
                this.fireEvent('search:input', [text]);
            } else {
                this.inputSearch.val('');
                window.SSE && this.fireEvent('search:input', ['', true]);
            }

            this.focus();
        },

        focus: function() {
            var me  = this;
            setTimeout(function(){
                me.inputSearch.focus();
                me.inputSearch.select();
            }, 10);
        },

        setText: function (text) {
            this.inputSearch.val(text);
            this.fireEvent('search:input', [text]);
        },

        getSettings: function() {
            return {

            };
        },

        onLayoutChanged: function () {
            var top = $('#app-title').height() + $('#toolbar').height() + 2,
                left = !Common.UI.isRTL() ? Common.Utils.innerWidth() - ($('#right-menu').is(':visible') ? $('#right-menu').width() : 0) - this.options.width - 32 :
                    ($('#right-menu').is(':visible') ? $('#right-menu').width() : 0) + 32;
            this.$window.css({left: left, top: top});
        },

        onBtnNextClick: function(action) {
            this.fireEvent('search:'+action, [this.inputSearch.val(), false]);
        },

        onOpenPanel: function () {
            this.hide();
            this.fireEvent('search:show', [true, this.inputSearch.val()]);
        },

        disableNavButtons: function (resultNumber, allResults) {
            var disable = (this.inputSearch.val() === '' && !window.SSE) || !allResults;
            this.btnBack.setDisabled(disable);
            this.btnNext.setDisabled(disable);
        },

        updateResultsNumber: function (current, all) {
            this.searchResults.text(!all || (this.inputSearch.val() === '' && !window.SSE) ? '0/0' :
                (Common.UI.isRTL() ? all + '/' + (current + 1) : current + 1 + '/' + all));
            this.inputSearch.css(Common.UI.isRTL() ? 'padding-left' : 'padding-right', this.searchResults.outerWidth() + 'px');
        },

        textFind: 'Find',
        tipPreviousResult: 'Previous result',
        tipNextResult: 'Next result',
        tipOpenAdvancedSettings: 'Open advanced settings',
        tipCloseSearch: 'Close search'

    }, Common.UI.SearchBar || {}));
});