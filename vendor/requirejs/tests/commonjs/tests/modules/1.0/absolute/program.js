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

define(["require", "exports", "module", "test","submodule/a","b"], function(require, exports, module) {
var test = require('test');
var a = require('submodule/a');
var b = require('b');
test.assert(a.foo().foo === b.foo, 'require works with absolute identifiers');
test.print('DONE', 'info');

});
