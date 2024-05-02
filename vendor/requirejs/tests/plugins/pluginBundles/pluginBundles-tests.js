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
    bundles: {
        'main': ['text', 'text!template.html']
    }
}, ['text!template.html'], function (template) {

    doh.register(
        'pluginBundles',
        [
            function pluginBundles(t){
                t.is('main template', template);
            }
        ]
    );
    doh.run();

});
