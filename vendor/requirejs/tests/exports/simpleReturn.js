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

//This file does not use exports, just
//return, but need to test that it does not
//automatically get an exports object assigned
define(
    function () {
        return function () {
            return 'simpleReturn';
        };
    }
);
