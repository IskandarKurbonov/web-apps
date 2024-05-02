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

define("uno",
  ["dos", "tres"],
  function(dos, tres) {
    return {
      name: "uno",
      doSomething: function() {
        return {
          dosName: dos.name,
          tresName: tres.name
        };
      }
    };
  }
);
