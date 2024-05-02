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
        getA: function () {
            return require("./index!0?./a:./b:./c");
        },
        getC: function () {
            return require("./index!2?./a:./b:./c");
        },
        getB: function () {
            return require("./index!1?./a:./b:./c");
        }
   };
});
