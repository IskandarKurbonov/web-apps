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
    load: function (name, require, load, config) {
        if (!name) {
            name = 'main';
        } else if (name.charAt(0) === '/') {
            name = 'main' + name;
        }

        //Only grab the first segment of the name.
        //This is just to be different, nothing
        //that is required behavior.
        name = name.split('/').shift();

        name = 'plug/' + name;

        require([name], load);
    }
});