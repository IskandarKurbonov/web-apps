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
    map: {
        '*': {
            'plugin': 'plugin/plugin'
        }
    }
}, ['plugin!foo'], function (value) {

    doh.register(
        'pluginMapSameName',
        [
            function pluginMapSameName(t){
                t.is('foo', value);
            }
        ]
    );
    doh.run();

});
