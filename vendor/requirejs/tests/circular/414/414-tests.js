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
        baseUrl: requirejs.isBrowser ? './' : './circular/414'
    },
    ["MyClass"],
    function(MyClass) {
        doh.register(
            "circular414",
            [
                function circularComplexPlugin(t) {
                    t.is("MyClass,A,B,C:MyClass,A,B,C:MyClass,A,B,C:MyClass,A,B,C", MyClass.sayAll());
                 }
            ]
        );
        doh.run();
    }
);
