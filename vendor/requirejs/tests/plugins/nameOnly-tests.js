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
        baseUrl: requirejs.isBrowser ? "./" : "./plugins/"
},      ['require', 'nameOnly!'],
function (require,   nameOnly) {

    doh.register(
        "pluginsNameOnly",
        [
            function pluginsNameOnly(t){
                t.is("nameOnly", nameOnly.name);
             }
        ]
    );
    doh.run();
});
