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
            'person': 'employee'
        },
        'employee': {
            'person': 'person'
        }
    }
}, ['application'], function (application) {

    doh.register(
        'pluginMapDynamic',
        [
            function pluginMapDynamic(t){
                t.is('application', application.name);
                t.is('employed person', application.person.name);
            }
        ]
    );
    doh.run();

});
