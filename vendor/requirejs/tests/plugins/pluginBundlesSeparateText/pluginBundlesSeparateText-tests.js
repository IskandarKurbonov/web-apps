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
    paths: {
        'text': '../../../../text/text'
    },
    bundles: {
        'main': ['text!template.html']
    }
}, ['text!template.html', 'text!second.html'], function (template, secondTemplate) {

    doh.register(
        'pluginBundlesSeparateText',
        [
            function pluginBundlesSeparateText(t){
                t.is('main template', template);
                t.is('second template', secondTemplate);
            }
        ]
    );
    doh.run();

});
