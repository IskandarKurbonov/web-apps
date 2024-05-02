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
    'spreadsheeteditor/main/app/model/Formula'
], function(Backbone) {
    'use strict';

    SSE.Collections = SSE.Collections || {};
    SSE.Collections.FormulaGroups = Backbone.Collection.extend({
        model: SSE.Models.FormulaGroup
    });
});
