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

require.config({
    config: {
        foo: {
            related: 'bar'
        }
    }
});

require(["foo"], function (foo) {
    doh.register(
        "specialDeps",
        [
            function specialDeps(t) {
                t.is("foo", foo.name);
                t.is("bar", foo.related);
            }
        ]
    );
    doh.run();
});
