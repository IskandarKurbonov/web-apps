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
        baseUrl: "./",
        paths: {
            "bar/foo": "foo2"
        }
    },
    ["require", "bar/baz"],
    function(require, baz) {
        doh.register(
            "relativeNormalize",
            [
                function relativeNormalize(t){
                    t.is("baz", baz.name);
                    t.is("foo2", baz.foo.name);
                }
            ]
        );

        doh.run();
    }
);
