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

Common.Models = Common.Models || {};

define([
    'backbone'
], function(Backbone){ 'use strict';

    Common.Models.Font = Backbone.Model.extend({
        defaults: function() {
            return {
                id      : Common.UI.getId(),
                name    : null,
                cloneid : null,
                imgidx  : 0,
                type    : 0
            }
        }
    });
});
