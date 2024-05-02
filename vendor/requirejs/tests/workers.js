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

importScripts('../require.js');

require({
        baseUrl: "./"
    },
    ["require", "simple", "anon/blue", "func", "anon/green"],
    function(require, simple, blue, func, green) {
        postMessage(simple.color);
        postMessage(green.name);
        postMessage(func());
        postMessage(blue.name);
    }
);
