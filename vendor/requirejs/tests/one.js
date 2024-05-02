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

//
//  Test comment
//
define('one',
    [
     "require", "two"
    ],
  function(require) {
    var one = {
      size: "large",
      doSomething: function() {
        return require("two");
      }
    };

    return one;
  }
)
