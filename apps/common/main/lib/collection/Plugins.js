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

/**
 * User: Julia.Radzhabova
 * Date: 17.05.16
 * Time: 15:54
 */

if (Common === undefined)
    var Common = {};

Common.Collections = Common.Collections || {};

define([
    'underscore',
    'backbone',
    'common/main/lib/model/Plugin'
], function(_, Backbone){
    'use strict';

    Common.Collections.Plugins = Backbone.Collection.extend({
        model: Common.Models.Plugin,

        hasVisible: function() {
            return !!this.findWhere({visible: true});
        }
    });
});
