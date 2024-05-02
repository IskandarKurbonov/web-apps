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

define([
    'backbone'
], function(Backbone){
    'use strict';

    SSE.Models = SSE.Models || {};

    SSE.Models.FormulaModel = Backbone.Model.extend({
        defaults: function () {
            return {
                id              : Common.UI.getId(),
                index           : 0,
                group           : null,
                name            : null,
                origin          : null,
                args            : null
            }
        }
    });

    SSE.Models.FormulaGroup = Backbone.Model.extend({
        defaults: function () {
            return {
                id              : Common.UI.getId(),
                index           : 0,
                name            : null,
                store           : null,
                functions       : []
            }
        }
    });
});

