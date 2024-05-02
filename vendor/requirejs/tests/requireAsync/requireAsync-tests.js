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

require(['a', 'b'], function (a, b) {
    doh.register(
        "requireAsync",
        [
            function requireAsync(t){
                t.is('a', a.name);
                t.is('b', b.name);
            }
        ]
    );

    doh.run();
});

define('b', {
    name: 'b'
});
