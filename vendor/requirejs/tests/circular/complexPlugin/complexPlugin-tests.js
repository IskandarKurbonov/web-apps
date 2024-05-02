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
        baseUrl: requirejs.isBrowser ? './' : './circular/complexPlugin'
    },
    ["require", "main"],
    function(require, main) {
        doh.register(
            "circularComplexPlugin",
            [
                function circularComplexPlugin(t) {
                    t.is("main", main.name);
                    t.is('viewport', main.viewport.name);
                    t.is('viewportTemplate', main.viewport.template);
                    t.is('toolbar', main.viewport.toolbar.name);
                    t.is('toolbarTemplate', main.viewport.toolbar.template);
                    t.is('helper', main.helper.name);
                 }
            ]
        );
        doh.run();
    }
);
