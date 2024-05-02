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

define(['exported'], function (exported) {
    function func(title) {
        return exported.makeMessage(title);
    }

    func.suffix = 'suffix';

    return func;
});

