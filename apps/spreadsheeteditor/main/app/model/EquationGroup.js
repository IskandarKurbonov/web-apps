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
], function(Backbone){ 'use strict';

    SSE.Models = SSE.Models || {};

    SSE.Models.EquationModel = Backbone.Model.extend({
        defaults: function() {
            return {
                id          : Common.UI.getId(),
                data        : null,
                width       : 0,
                height      : 0,
                posX        : 0,
                posY        : 0
            }
        }
    });

    SSE.Models.EquationGroup = Backbone.Model.extend({
        defaults: function() {
            return {
                id          : Common.UI.getId(),
                groupName   : null,
                groupId     : null,
                groupStore  : null
            }
        }
    });
});
