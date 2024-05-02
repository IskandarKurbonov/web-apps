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
        baseUrl: "./"
    },
    ["a"],
    function(a) {
        doh.register(
            "isBrowser",
            [
                function isBrowser(t){
                    t.is(true, a.isBrowser);
                    t.is(true, requirejs.isBrowser);
                }
            ]
        );
        doh.run();
    }
);
