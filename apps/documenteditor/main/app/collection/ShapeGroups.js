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
    'documenteditor/main/app/model/ShapeGroup'
], function(Backbone){ 'use strict';
    if (Common === undefined)
        var Common = {};

    Common.Collections = Common.Collections || {};
    DE.Collections = DE.Collections || {};

    DE.Collections.ShapeGroups = Backbone.Collection.extend({
        model: DE.Models.ShapeGroup
    });
});
