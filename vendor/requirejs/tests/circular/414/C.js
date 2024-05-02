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
        "./B"
    ],

    function (exports, MyClass, A, B) {

        exports.name = "C";

        exports.say = function(){
            return [MyClass.name, A.name, B.name, exports.name].join(',');
        };

    }

);

