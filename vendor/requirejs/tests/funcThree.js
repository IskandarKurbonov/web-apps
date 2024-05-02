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

define("funcThree",
    ["funcFour"],
    function (four) {
        var three = function (arg) {
            return arg + "-" + require("funcFour").suffix();
        };

        three.suffix = function () {
            return "THREE_SUFFIX";
        };

        return three;
    }
);
