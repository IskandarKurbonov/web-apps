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

define('foo-1.0/bar/baz', [], function(){ return '1.0'; });
define('foo-1.2/bar/baz', [], function(){ return '1.2'; });

define('oldmodule', ['foo/bar/baz'], function(baz) {
    return {
        name: 'oldmodule',
        baz: baz
    };
});


require({
        baseUrl: './',

        map: {
            'oldmodule': {
                //This one should be favored over the * value.
                'foo' : 'foo-1.0'
            },

            '*': {
                'foo/bar' : 'foo-1.2/bar'
            }
        }
    },
    ['oldmodule'],
    function(oldmodule) {
        doh.register(
            'mapConfigSpecificity',
            [
                function mapConfigSpecificity(t){
                    t.is('oldmodule', oldmodule.name);
                    t.is('1.0', oldmodule.baz);
                }
            ]
        );
        doh.run();
    }
);
