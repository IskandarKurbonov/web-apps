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

define(function (require) {
    //Tests detecting a full URL dependency inside simplified wrapper.
    require('https://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js');

    function noop() {};

    return {
        isFunction: jQuery.isFunction(noop)
    };
});
