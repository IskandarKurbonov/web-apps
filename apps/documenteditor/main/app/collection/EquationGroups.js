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
    'documenteditor/main/app/model/EquationGroup'
], function(Backbone){ 'use strict';
    DE.Collections = DE.Collections || {};

    DE.Collections.EquationGroups = Backbone.Collection.extend({
        model: DE.Models.EquationGroup
    });
});
