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

define(["require", "exports", "module", "test","a"], function(require, exports, module) {
var test = require('test');
var a = require('a');
test.assert(a.program() === exports, 'exact exports');
test.print('DONE', 'info');

});
