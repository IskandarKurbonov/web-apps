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

define("subwidget",
  ["text!subwidget.html!strip", "text!subwidget2.html"],
  function(template, template2) {
    return {
      name: "subwidget",
      template: template,
      template2: template2
    };
  }
);
