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

//Trailing comma is there ON PURPOSE
require(['a',], function(a) {
    doh.register(
        "trailingComma",
        [
            function trailingComma(t){
                t.is('a', a.name, 'a.name is a');
            }
        ]
    );
    doh.run();
});
