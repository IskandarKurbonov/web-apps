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
    'pdfeditor/main/app/model/ShapeGroup'
], function(Backbone){ 'use strict';
    if (Common === undefined)
        var Common = {};

    Common.Collections = Common.Collections || {};
    PDFE.Collections = PDFE.Collections || {};

    PDFE.Collections.ShapeGroups = Backbone.Collection.extend({
        model: PDFE.Models.ShapeGroup
    });
});
