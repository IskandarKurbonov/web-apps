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

    SSE.Models.TableTemplate = Backbone.Model.extend({
        defaults: function() {
            return {
                id          : Common.UI.getId(),
                name        : null,
                caption     : null,
                type        : null,
                imageUrl    : null
            }
        }
    });
});