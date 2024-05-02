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
        baseUrl: './'
    },
    ['a', 'c'],
    function(a, c) {
        doh.register(
            'cjsDotRequire',
            [
                function cjsDotRequire(t){
                    t.is('a', a.name);
                    t.is('b', a.b.name);
                    t.is('c', c.name);
                }
            ]
        );
        doh.run();
    }
);
