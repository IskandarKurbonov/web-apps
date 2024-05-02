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

define({
    addToDom: function () {
        var div = document.createElement('div');
        div.id = 'one';
        div.setAttribute('data-name', 'one');
        document.getElementsByTagName('body')[0].appendChild(div);
    }
});
