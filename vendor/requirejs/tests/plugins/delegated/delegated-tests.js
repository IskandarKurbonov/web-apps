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

require.config({
    baseUrl: requirejs.isBrowser ? './' : './plugins/fromTextEvalError',
    paths: {
        'refine': '../fromText/refine',
        'text': '../../../../text/text'
    },
    map: {
        '*': {
            r: 'refine'
        }
    }
});

require(['delegated!r!a'], function (a) {

    doh.register(
        'pluginsDelegated',
        [
            function pluginsDelegated(t){
                t.is('a', a.name);
             }
        ]
    );
    doh.run();
});
