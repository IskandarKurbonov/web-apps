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
        "./A",
        "./C"
    ],

    function (exports, MyClass, A, C) {

        exports.name = "B";

        exports.say = function(){
            return [MyClass.name, A.name, exports.name, C.name].join(',');
        };

    }

);