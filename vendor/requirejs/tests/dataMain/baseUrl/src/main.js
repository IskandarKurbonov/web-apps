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

define(['a'], function (a) {
    doh.register(
        "dataMainBaseUrl",
        [
            function dataMainBaseUrl(t){
                t.is("a", a.name);
            }
        ]
    );
    doh.run();
});
