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
        baseUrl: requirejs.isBrowser ? "./" : "./remoteUrls/"
    },
    ["require", "jqwrap"],
    function(require, jqwrap) {
        doh.register(
            "remoteUrls",
            [
                function remoteUrls(t){
                    t.is(true, jqwrap.isFunction);
                }
            ]
        );

        doh.run();
    }
);
