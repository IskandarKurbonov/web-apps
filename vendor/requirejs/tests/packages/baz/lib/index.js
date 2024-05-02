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

define(['bar', 'foo', './helper'], function (bar, foo, helper) {
    return {
        name: 'baz',
        barDepVersion: bar.version,
        fooName: foo.name,
        helperName: helper.name
    };
});
