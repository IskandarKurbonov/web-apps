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

define(["require", "exports", "module"], function(require, exports, module) {
exports.foo = function () {
    return this;
};
exports.set = function (x) {
    this.x = x;
};
exports.get = function () {
    return this.x;
};
exports.getClosed = function () {
    return exports.x;
};

});
