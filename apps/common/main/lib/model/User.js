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
    'underscore',
    'backbone',
    'common/main/lib/component/BaseView'
], function(_, Backbone){
    'use strict';

    Common.Models.User = Backbone.Model.extend({
        defaults: function() {
            return {
                iid         : Common.UI.getId(), // internal id for rendering
                id          : undefined,
                idOriginal   : undefined,
                username    : 'Guest',
                color       : '#fff',
                colorval    : null,
                online      : false,
                view        : false,
                hidden      : false
            }
        }
    });
});
