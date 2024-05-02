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
    'common/main/lib/model/User'
], function(Backbone){
    'use strict';

    Common.Collections = Common.Collections || {};

    Common.Collections.Users = Backbone.Collection.extend({
        model: Common.Models.User,

        getOnlineCount: function() {
            var count = 0;
            this.each(function(user){
                user.get('online') && ++count;
            });

            return count;
        },

        getEditingCount: function() {
            return this.filter(function(item){return item.get('online') && !item.get('view')}).length;
        },

        getVisibleEditingCount: function() {
            return this.filter(function(item){return item.get('online') && !item.get('view') && !item.get('hidden')}).length;
        },

        getEditingOriginalCount: function() {
            return this.chain().filter(function(item){return item.get('online') && !item.get('view')}).groupBy(function(item) {return item.get('idOriginal');}).size().value();
        },

        getVisibleEditingOriginalCount: function() {
            return this.chain().filter(function(item){return item.get('online') && !item.get('view') && !item.get('hidden')}).groupBy(function(item) {return item.get('idOriginal');}).size().value();
        },

        findUser: function(id) {
            return this.find(
                function(model){
                    return model.get('id') == id;
                });
        },

        findOriginalUser: function(id) {
            return this.find(
                function(model){
                    return model.get('idOriginal') == id;
                });
        },

        findOriginalUsers: function(id) {
            return this.where({idOriginal: id});
        }
    });

    Common.Collections.HistoryUsers = Backbone.Collection.extend({
        model: Common.Models.User,

        findUser: function(id) {
            return this.find(
                function(model){
                    return model.get('id') == id;
                });
        }
    });
});
