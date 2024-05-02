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

    function define(msg) {
        log('STILL GOOD, inner define: ' + msg);
    }

    if (typeof define !== 'function') { var define = window.badDefine; }

    define("four.js script");


}());

