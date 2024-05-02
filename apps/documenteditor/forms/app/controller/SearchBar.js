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
    'core',
    'common/main/lib/view/SearchBar'
], function () {
    'use strict';

    DE.Controllers.SearchBar = Backbone.Controller.extend(_.extend({
        initialize: function() {
        },

        events: function() {
        },

        onLaunch: function() {
            this._state = {
                searchText: ''
            };
            Common.NotificationCenter.on('search:show', _.bind(this.onSearchShow, this));
        },

        setApi: function (api) {
            this.api = api;
            if (this.api) {
                this.api.asc_registerCallback('asc_onSetSearchCurrent', _.bind(this.onApiUpdateSearchCurrent, this));
            }
            return this;
        },

        onSearchShow: function () {
            if (!this.searchBar) {
                this.searchBar = new Common.UI.SearchBar({
                    showOpenPanel: false,
                    width: 303,
                    iconType: 'svg',
                });
                this.searchBar.on({
                    'search:back': _.bind(this.onSearchNext, this, 'back'),
                    'search:next': _.bind(this.onSearchNext, this, 'next'),
                    'search:input': _.bind(this.onInputSearchChange, this),
                    'search:keydown': _.bind(this.onSearchNext, this, 'keydown'),
                    'show': _.bind(this.onSelectSearchingResults, this, true),
                    'hide': _.bind(this.onSelectSearchingResults, this, false)
                });
            }
            if (!this.searchBar.isVisible()) {
                this.searchBar.show(this.api.asc_GetSelectedText() || this._state.searchText);
            }
        },

        onSelectSearchingResults: function (val) {
            if (this._state.isHighlightedResults !== val) {
                this.api.asc_selectSearchingResults(val);
                this._state.isHighlightedResults = val;
            }
        },

        onApiUpdateSearchCurrent: function (current, all) {
            if (this.searchBar) {
                this.searchBar.disableNavButtons(current, all);
                this.searchBar.updateResultsNumber(current, all);
            }
        },

        onSearchNext: function (type, arg) {
            var text = arg[0],
                event = arg[1];
            if (text && text.length > 0 && (type === 'keydown' && event.keyCode === 13 || type !== 'keydown')) {
                this._state.searchText = text;
                if (this.onQuerySearch(type) && this._searchTimer) {
                    if (this._searchTimer) {
                        clearInterval(this._searchTimer);
                        this._searchTimer = undefined;
                    }
                }
            }
        },

        onQuerySearch: function (d, w) {
            var searchSettings = new AscCommon.CSearchSettings();
            searchSettings.put_Text(this._state.searchText);
            searchSettings.put_MatchCase(false);
            searchSettings.put_WholeWords(false);
            if (!this.api.asc_findText(searchSettings, d != 'back')) {
                this.searchBar.disableNavButtons();
                this.searchBar.updateResultsNumber();
                return false;
            }
            return true;
        },

        onInputSearchChange: function (text) {
            var text = text[0];
            if ((text && this._state.searchText !== text) || (!text && this._state.newSearchText)) {
                this._state.newSearchText = text;
                this._lastInputChange = (new Date());
                if (this._searchTimer === undefined) {
                    var me = this;
                    this._searchTimer = setInterval(function() {
                        if ((new Date()) - me._lastInputChange < 400) return;

                        me._state.searchText = me._state.newSearchText;
                        if (me._state.newSearchText !== '') {
                            me.onQuerySearch();
                        } else {
                            me.api.asc_endFindText();
                            me.searchBar.updateResultsNumber();
                        }
                        clearInterval(me._searchTimer);
                        me._searchTimer = undefined;
                    }, 10);
                }
            }
        },

    }, DE.Controllers.SearchBar || {}));
});