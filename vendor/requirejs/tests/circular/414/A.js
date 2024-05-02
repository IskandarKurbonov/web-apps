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

define(
    [
        "exports",
        "./MyClass",
        "./B",
        "./C"
    ],

    function (exports, MyClass, B, C) {

        exports.name = "A";

        exports.say = function(){
            return [MyClass.name, exports.name, B.name, C.name].join(',');
        };

    }

);
