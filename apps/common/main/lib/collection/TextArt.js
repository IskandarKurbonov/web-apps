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
    'backbone'
], function(Backbone){
    'use strict';

    Common.Collections.TextArt = Backbone.Collection.extend({
        model: Backbone.Model.extend({
            defaults: function() {
                return {
                    id: Common.UI.getId(),
                    imageUrl: null,
                    data: null
                }
            }
        })
    });
});

