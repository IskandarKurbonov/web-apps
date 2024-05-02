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

define('one', function () {
    return { name: 'one' };
});

define('two', function () {
    return { name: 'two' };
});

define('three', ['one'], function (one) {
    return { name: 'three',
        one: one
    };
});

require([], function() {
    require({
            map : {
                '*': {
                    'one': 'two'
                }
            }
        },
        ['three'],
        function (three) {
            doh.register(
                'mapConfigDelayed',
                [
                    function mapConfigDelayed(t){
                        t.is('three', three.name);
                        t.is('two', three.one.name);
                    }
                ]
            );
            doh.run();
        }
    );
});

define("app", function(){});
