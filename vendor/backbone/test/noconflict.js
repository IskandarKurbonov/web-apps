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

(function() {

  module("Backbone.noConflict");

  test('noConflict', 2, function() {
    var noconflictBackbone = Backbone.noConflict();
    equal(window.Backbone, undefined, 'Returned window.Backbone');
    window.Backbone = noconflictBackbone;
    equal(window.Backbone, noconflictBackbone, 'Backbone is still pointing to the original Backbone');
  });

})();
