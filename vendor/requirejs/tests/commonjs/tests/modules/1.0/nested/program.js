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

define(["require", "exports", "module", "test","a/b/c/d"], function(require, exports, module) {
var test = require('test');
test.assert(require('a/b/c/d').foo() == 1, 'nested module identifier');
test.print('DONE', 'info');

});
