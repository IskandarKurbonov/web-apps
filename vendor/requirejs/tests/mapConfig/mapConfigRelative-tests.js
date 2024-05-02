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

define('lib/b', [], { name: 'b' });

define('b1', [], { name: 'b1' });

define('lib/a', ['./b'], function(b) {
    return {
        name: 'a',
        b: b
    };
});

require({
    map: {
        'lib/a': {
            'lib/b': 'b1'
        }
    }
},['lib/a'], function(a) {
    doh.register(
        'mapConfigRelative',
        [
            function mapConfigRelative(t){
                t.is('a', a.name);
                t.is('b1', a.b.name);
            }
        ]
    );
    doh.run();
});
