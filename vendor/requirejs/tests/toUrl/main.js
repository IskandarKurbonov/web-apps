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
    return {
        html: require('text!./main.html'),
        noext: require('text!sub/noext'),
        hidden: require('text!.hidden.html'),
        util: require('sub/util')
    };
});