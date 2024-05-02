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
    'underscore',
    'backbone'
], function(_, Backbone){
    'use strict';

    PDFE.Models = PDFE.Models||{};

    PDFE.Models.Pages = Backbone.Model.extend({
        defaults: {
            current: 0,
            count: 0
        }
    });
});
