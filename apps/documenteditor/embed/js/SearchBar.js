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

+function () {
    !window.common && (window.common = {});
    !common.controller && (common.controller = {});

    common.controller.SearchBar = new(function() {
        var $searchBar,
            $searchInput,
            appConfig,
            api,
            _state = {
                searchText: ''
            },
            _lastInputChange,
            _searchTimer,
            _mods = {
                ctrl: false,
                f: false,
                other: false
            };

        var init = function (config) {
            appConfig = config;

            $(document.body).on('keydown', function (event) {
                if (event.keyCode === 27 && $searchBar && $searchBar.is(':visible')) {
                    highlightResults(false);
                    $searchBar.hide();
                    return;
                }
                if (event.keyCode === 70) {
                    _mods.f = true;
                }
                if (event.ctrlKey || event.metaKey) {
                    _mods.ctrl = true;
                }
                if (event.altKey || event.shiftKey) {
                    _mods.other = true;
                }
                if (_mods.f && _mods.ctrl && !_mods.other) {
                    event.preventDefault()
                    onShow();
                }
            }).on('keyup', function () {
                for (var key in _mods) {
                    _mods[key] = false;
                }
            });
        };

        var setApi = function (appApi) {
            api = appApi;
            if (api) {
                api.asc_registerCallback('asc_onSetSearchCurrent', onApiUpdateSearchCurrent);
            }
        };

        var create = function () {
            $searchBar = common.view.SearchBar.create();
            if (appConfig.toolbarDocked === 'bottom') {
                $searchBar.css({'right': '45px', 'bottom': '31px'});
            } else {
                $searchBar.css({'right': '45px', 'top': '31px'});
            }

            $searchInput = $searchBar.find('#search-bar-text');
            $searchInput.on('input', function(e){
                common.view.SearchBar.disableNavButtons();
                onInputSearchChange($searchInput.val());
            }).on('keydown', function (e) {
                onSearchNext('keydown', $searchInput.val(), e);
            });
            $searchBar.find('#search-bar-back').on('click', function(e){
                onSearchNext('back', $searchInput.val());
            });
            $searchBar.find('#search-bar-next').on('click', function(e){
                onSearchNext('next', $searchInput.val());
            });
            $searchBar.find('#search-bar-close').on('click', function(e){
                highlightResults(false);
                $searchBar.hide();
            });

            common.view.SearchBar.disableNavButtons();
        };

        var onShow = function () {
            if ( !$searchBar ) {
                create();
            }
            if (!$searchBar.is(':visible')) {
                highlightResults(true);
                var text = (api && api.asc_GetSelectedText()) || _state.searchText;
                $searchInput.val(text);
                (text.length > 0) && onInputSearchChange(text);

                $searchBar.show();
                setTimeout(function () {
                    $searchInput.focus();
                    $searchInput.select();
                }, 10);
            }
        };

        var onInputSearchChange = function (text) {
            if ((text && _state.searchText !== text) || (!text && _state.newSearchText)) {
                _state.newSearchText = text;
                _lastInputChange = (new Date());
                if (_searchTimer === undefined) {
                    _searchTimer = setInterval(function() {
                        if ((new Date()) - _lastInputChange < 400) return;

                        _state.searchText = _state.newSearchText;
                        if (_state.newSearchText !== '') {
                            onQuerySearch();
                        } else {
                            api.asc_endFindText();
                            common.view.SearchBar.updateResultsNumber();
                        }
                        clearInterval(_searchTimer);
                        _searchTimer = undefined;
                    }, 10);
                }
            }
        };

        var onQuerySearch = function (d, w) {
            var searchSettings = new AscCommon.CSearchSettings();
            searchSettings.put_Text(_state.searchText);
            searchSettings.put_MatchCase(false);
            searchSettings.put_WholeWords(false);
            if (!api.asc_findText(searchSettings, d != 'back')) {
                common.view.SearchBar.disableNavButtons();
                common.view.SearchBar.updateResultsNumber();
                return false;
            }
            return true;
        };

        var onSearchNext = function (type, text, e) {
            if (text && text.length > 0 && (type === 'keydown' && e.keyCode === 13 || type !== 'keydown')) {
                _state.searchText = text;
                if (onQuerySearch(type) && _searchTimer) {
                    clearInterval(_searchTimer);
                    _searchTimer = undefined;
                }
            }
        };

        var onApiUpdateSearchCurrent = function (current, all) {
            common.view.SearchBar.disableNavButtons(current, all);
            common.view.SearchBar.updateResultsNumber(current, all);
        };

        var highlightResults = function (val) {
            if (_state.isHighlightedResults !== val) {
                api.asc_selectSearchingResults(val);
                _state.isHighlightedResults = val;
            }
        };

        return {
            init: init,
            setApi: setApi,
            show: onShow
        };
    });
}();