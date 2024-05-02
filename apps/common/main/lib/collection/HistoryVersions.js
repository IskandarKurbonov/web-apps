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
 * Date: 05.03.15
 * Time: 17:05
 */

if (Common === undefined)
    var Common = {};

Common.Collections = Common.Collections || {};

define([
    'underscore',
    'backbone',
    'common/main/lib/model/HistoryVersion'
], function(_, Backbone){
    'use strict';

    Common.Collections.HistoryVersions = Backbone.Collection.extend({
        model: Common.Models.HistoryVersion,

        findRevision: function(revision) {
            return this.findWhere({revision: revision});
        },

        findRevisions: function(revision) {
            return this.where({revision: revision});
        },

        hasChanges: function() {
            return !!this.findWhere({isRevision: false});
        },

        hasCollapsed: function() {
            return !!this.findWhere({isRevision: true, hasChanges: true, isExpanded: false});
        }
    });
});
