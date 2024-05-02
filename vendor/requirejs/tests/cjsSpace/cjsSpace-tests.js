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
    ['a'],
    function(a) {
        doh.register(
            'cjsSpace',
            [
                function cjsSpace(t){
                    t.is('a', a.name);
                    t.is('b', a.b.name);
                }
            ]
        );
        doh.run();
    }
);
