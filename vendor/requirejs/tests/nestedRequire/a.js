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

define(['base'], function (base) {
    return {
        name: 'a',
        counter: 0,
        doSomething: function () {
            this.counter += 1;
            this.base = base;
            //This should not cause double notifications.
            require(['base'], function () {
            });
        }
    };
});
