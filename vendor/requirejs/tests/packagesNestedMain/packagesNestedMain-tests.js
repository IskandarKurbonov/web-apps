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
    packages: [{
        name: 'foo',
        main: 'lib/index'
    }]
}, ['foo'], function (foo) {

    doh.register(
        'packagesNestedMain',
        [
            function packagesNestedMain(t){
                t.is('foo', foo.name);
                t.is('bar', foo.bar.name);
            }
        ]
    );
    doh.run();
});
