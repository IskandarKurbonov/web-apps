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

define("two",
  ["require", "one"],
  function(require, one) {
    return {
      size: "small",
      color: "redtwo",
      doSomething: function() {
        return require("one").doSomething();
      }
    };
  }
);
