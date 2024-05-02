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

define(["require", "exports", "module", "test","submodule/a","submodule/b"], function(require, exports, module) {
var test = require('test');
var a = require('submodule/a');
var b = require('submodule/b');
test.assert(a.foo == b.foo, 'a and b share foo through a relative require');
test.print('DONE', 'info');

});
