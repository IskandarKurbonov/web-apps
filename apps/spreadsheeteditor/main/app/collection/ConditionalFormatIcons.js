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
], function(Backbone){ 'use strict';

    SSE.Collections.ConditionalFormatIcons = Backbone.Collection.extend({
        model: Backbone.Model.extend({
            defaults: function() {
                return {
                    id: Common.UI.getId(),
                    index: 0,
                    icon: null
                }
            }
        })
    });

    SSE.Collections.ConditionalFormatIconsPresets = Backbone.Collection.extend({
        model: Backbone.Model.extend({
            defaults: function() {
                return {
                    id: Common.UI.getId(),
                    data: 0,
                    icons: null
                }
            }
        })
    });
});
