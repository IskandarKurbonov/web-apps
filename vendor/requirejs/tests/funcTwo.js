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

define("funcTwo",
    ["require", "funcOne"],
    function (require) {
        var two = function (name) {
            this.name = name;
            this.one = new (require("funcOne"))("ONE");
        };
    
        two.prototype.oneName = function () {
            return this.one.getName();
        };

        return two;
    }
);
