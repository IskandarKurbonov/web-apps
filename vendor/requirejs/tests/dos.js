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

define("dos",
  ["tres"],
  function(tres) {
    return {
      name: "dos",
      doSomething: function() {
        return {
          tresName: tres.name
        };
      }
    };
  }
);
