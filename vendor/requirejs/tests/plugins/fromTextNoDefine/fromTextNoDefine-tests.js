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
        baseUrl: requirejs.isBrowser ? './' : './plugins/fromText',
        paths: {
            'text': '../../../../text/text'
        }
},      ['refine!a'],
function () {

    doh.register(
        'pluginsFromTextNoDefine',
        [
            function pluginsFromTextNoDefine(t){
                t.is('a', a.name);
             }
        ]
    );
    doh.run();
});
