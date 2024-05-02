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

//Example layer file.

define("alpha",
    ["beta", "gamma"],
    function (beta, gamma) {
        return {
            name: "alpha",
            betaName: beta.name
        };
    }
);

define("beta",
    ["gamma"],
    function (gamma) {
        return {
            name: "beta",
            gammaName: gamma.name
        };
    }
);

define("gamma",
    ["epsilon"],
    function (epsilon) {
        return {
            name: "gamma",
            epsilonName: epsilon.name
        };
    }
);
