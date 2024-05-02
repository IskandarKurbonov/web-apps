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

define("two", ["one", "three", "one"], function (one, three, one2) {
    return {
        name: "two",
        oneName: one.name,
        oneName2: one2.name,
        threeName: three.name
    };
});
