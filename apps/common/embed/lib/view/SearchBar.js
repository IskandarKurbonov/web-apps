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

!window.common && (window.common = {});
!common.view && (common.view = {});
common.view.SearchBar = new(function() {
    var tpl = '<div class="asc-window search-window" style="display: none;">' +
                    '<div class="body">{body}</div>' +
                '</div>';
    var tplBody = '<div class="search-input-group">' +
                    '<input type="text" id="search-bar-text" placeholder="{textFind}" autocomplete="off">' +
                    '<div id="search-bar-results">0/0</div>' +
                '</div>' +
                '<div class="tools">' +
                    '<button id="search-bar-back" class="svg-icon search-arrow-up"></button>' +
                    '<button id="search-bar-next" class="svg-icon search-arrow-down"></button>' +
                    '<button id="search-bar-close" class="svg-icon search-close"></button>' +
                '</div>';

    return {
        create: function(parent) {
            !parent && (parent = 'body');

            var _$dlg = $(tpl
                .replace(/\{body}/, tplBody)
                .replace(/\{textFind}/, this.textFind))
                    .appendTo(parent)
                    .attr('id', 'dlg-search');

            return _$dlg;
        },

        disableNavButtons: function (resultNumber, allResults) {
            var disable = $('#search-bar-text').val() === '' || !allResults;
            $('#search-bar-back').attr({disabled: disable});
            $('#search-bar-next').attr({disabled: disable});
        },

        updateResultsNumber: function (current, all) {
            var $results = $('#search-bar-results'),
                $input = $('#search-bar-text');
            $results.text(!all || $input.val() === '' ? '0/0' : current + 1 + '/' + all);
            $input.css('padding-right', $results.outerWidth() + 'px');
        },

        textFind: 'Find'

    };
})();