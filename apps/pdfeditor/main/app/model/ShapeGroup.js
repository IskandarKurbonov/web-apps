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

    PDFE.Models = PDFE.Models || {};

    PDFE.Models.ShapeModel = Backbone.Model.extend({
        defaults: function() {
            return {
                id: Common.UI.getId(),
                imageUrl: null,
                data: null
            }
        }
    });

    PDFE.Models.ShapeGroup = Backbone.Model.extend({
        defaults: function() {
            return {
                id: Common.UI.getId(),
                groupName: null,
                groupId: null,
                groupStore: null
            }
        }
    });
});
