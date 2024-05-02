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

define(function(require) {
    doh.register(
        'nestedRelativeRequire',
        [
            function nestedRelativeRequire(t){
                //Just confirm it loaded.
                t.is(true, true);
            }
        ]
    );
    doh.run();
});
