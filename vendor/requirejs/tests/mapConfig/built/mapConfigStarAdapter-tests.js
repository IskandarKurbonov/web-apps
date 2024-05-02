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

define('d',{
    name: 'd'
});

define('adapter/d',['d'], function(d) {
    d.adapted = true;
    return d;
});

define('e',['d'], function (d) {
    return {
        name: 'e',
        d: d
    };
});

/*global doh */
require({
        baseUrl: './',
        map: {
            '*': {
                'd': 'adapter/d'
            },
            'adapter/d': {
                d: 'd'
            }
        }
    },
    ['e', 'adapter/d'],
    function(e, adapterD) {
        
        doh.register(
            'mapConfigStarAdapter',
            [
                function mapConfigStarAdapter(t){
                    t.is('e', e.name);
                    t.is('d', e.d.name);
                    t.is(true, e.d.adapted);
                    t.is(true, adapterD.adapted);
                    t.is('d', adapterD.name);
                }
            ]
        );
        doh.run();
    }
);

define("mapConfigStarAdapter-tests", function(){});
