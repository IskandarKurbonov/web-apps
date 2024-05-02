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
        "./A",
        "./B",
        "./C"
    ],

    function (exports, A, B, C) {

        exports.name = "MyClass";

        exports.sayAll = function(){
            return [
                exports.say(),
                A.say(),
                B.say(),
                C.say()
            ].join(':');
        };

        exports.say = function(){
            return [exports.name, A.name, B.name, C.name].join(',');
        };

        return exports;

    }

);
