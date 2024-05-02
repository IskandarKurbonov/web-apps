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

define("widget",
  ["subwidget", "text!widget.html"],
  function(subwidget, template) {
    return {
      subWidgetName: subwidget.name,
      subWidgetTemplate: subwidget.template,
      subWidgetTemplate2: subwidget.template2,
      template: template
    };
  }
);
