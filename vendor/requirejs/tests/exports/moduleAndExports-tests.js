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
        baseUrl: requirejs.isBrowser ? "./" : "./exports/"
    },
    ['am'],
    function(am) {
        doh.register(
            "moduleAndExports",
            [
                function moduleAndExports(t){
                    t.is('am', am.name);
                    t.is('bm', am.bName);
                    t.is('cm', am.cName);
                }
            ]
        );
        doh.run();
    }
);
