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

define({
    load: function (id, require, load, config) {
        'use strict';
        if (id === 'broken') {
            var err = new Error('broken');
            err.plugMessage = id;
            load.error(err);
        } else {
            load(id);
        }
    }
});