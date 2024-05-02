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

define(function (require, exports, module) {
    return {
        //no config, just should get an empty object.
        id: 'plain' + (module.config().foo || '')
    }
});
