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

define('a', {
    name: 'a'
});

define('index', ['a'], function (a) {
    doh.register(
        "dataMainIndex",
        [
            function dataMainIndex(t){
                t.is("a", a.name);
            }
        ]
    );
    doh.run();
});
