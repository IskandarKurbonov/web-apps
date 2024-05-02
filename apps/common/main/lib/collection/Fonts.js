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

if (Common === undefined)
    var Common = {};

Common.Collections = Common.Collections || {};

define([
    'backbone',
    'common/main/lib/model/Font'
], function(Backbone){ 'use strict';
    Common.Collections.Fonts = Backbone.Collection.extend({
        model: Common.Models.Font
    });
});
