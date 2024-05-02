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

function onhyperlinkclick(element) {
    function _postMessage(msg) {
       if (window.parent && window.JSON) {
            window.parent.postMessage(window.JSON.stringify(msg), "*");
      	}
    }

    _postMessage({
        command: 'internalCommand',
        data: {
            type: 'help:hyperlink',
            data: element.href
        }
    });
}
