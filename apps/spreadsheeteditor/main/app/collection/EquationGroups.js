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
    'backbone',
    'spreadsheeteditor/main/app/model/EquationGroup'
], function(Backbone){ 'use strict';
    if (Common === undefined)
        var Common = {};

    Common.Collections = Common.Collections || {};

    SSE.Collections.EquationGroups = Backbone.Collection.extend({
        model: SSE.Models.EquationGroup
    });
});
