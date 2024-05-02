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

require({
        baseUrl: "../"
    },
    ["require", "simple"],
    function(require, simple) {
        doh.register(
            "dataMain",
            [
                function dataMain(t){
                    t.is("blue", simple.color);
                }
            ]
        );
        doh.run();
    }
);
