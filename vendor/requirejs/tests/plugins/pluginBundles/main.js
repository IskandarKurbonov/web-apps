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

define('text', [], {
    load: function () {
        throw new Error('not implemented');
    }
});

define('text!template.html', [], function () {
    return 'main template';
});

define('main', ['text!template.html'], function(template) {
    return {
        name: 'main',
        template: template
    };
});
