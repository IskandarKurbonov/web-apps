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

    PE.Models = PE.Models||{};

    PE.Models.Pages = Backbone.Model.extend({
        defaults: {
            current: 0,
            count: 0,
            start: 1
        }
    });
});
