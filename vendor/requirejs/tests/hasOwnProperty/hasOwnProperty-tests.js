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

require(["toString", "hasOwnProperty", "prototype"], function(toString, hop, p) {
        doh.register(
            "hasOwnPropertyTests",
            [
                function hasOwnPropertyTests(t){
                    t.is("toString", toString.name);
                    t.is("hasOwnProperty", hop.name);
                    t.is("prototype", p.name);
                }
            ]
        );
        doh.run();
    }
);
