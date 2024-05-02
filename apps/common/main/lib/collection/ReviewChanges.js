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
    'underscore',
    'backbone',
    'common/main/lib/model/ReviewChange'
], function(_, Backbone){
    'use strict';

    Common.Collections.ReviewChanges = Backbone.Collection.extend({
        model: Common.Models.ReviewChange
    });
});
