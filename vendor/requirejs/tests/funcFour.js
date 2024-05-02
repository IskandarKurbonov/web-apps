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

define("funcFour",
    ["require", "funcThree"],
    function (require) {
        var four = function (arg) {
            return "FOUR called with " + arg;
        };

        four.suffix = function () {
            return require("funcThree").suffix();
        };

        return four;
    }
);
