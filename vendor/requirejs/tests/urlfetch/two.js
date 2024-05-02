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

define("one", {
    name: "one"
});

define("two", ["one"], function (one) {
    return {
        name: "two",
        oneName: "one"
    };
});
