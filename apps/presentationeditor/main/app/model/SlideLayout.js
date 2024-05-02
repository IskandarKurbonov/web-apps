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

    PE.Models = PE.Models||{};

    PE.Models.SlideLayout = Backbone.Model.extend({
        defaults: function() {
            return {
                id      : Common.UI.getId(),
                imageUrl: null,
                title   : null,
                data    : null
            }
        }
    });
});
