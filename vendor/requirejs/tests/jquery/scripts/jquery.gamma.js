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

(function () {
    //Define the plugin.
    function plugin($) {
        $.fn.gamma = function() {
            return 'gamma';
        };

        $(function () {
            doh.is('gamma', $('body').gamma());
            readyFired();
        });
    }

    //Register the plugin.
    if (typeof define !== 'undefined' && define.amd) {
        define(['jquery'], plugin);
    } else if (typeof jQuery !== 'undefined') {
        plugin(jQuery);
    }
}());
