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
    'common/main/lib/model/Comment'
], function(_, Backbone){
    'use strict';

    Common.Collections.Comments = Backbone.Collection.extend({
        model: Common.Models.Comment,
        groups: null,

        clearEditing: function () {
            this.each(function(comment) {
                comment.set('editText', false);
                comment.set('editTextInPopover', false);
                comment.set('showReply', false);
                comment.set('showReplyInPopover', false);
                comment.set('hideAddReply', false);
            });
        },

        getCommentsReplysCount: function(userid) {
            var cnt = 0;
            this.each(function(comment) {
                if (comment.get('userid')==userid) cnt++;
                var rpl = comment.get('replys');
                if (rpl && rpl.length>0) {
                    rpl.forEach(function(reply) {
                        if (reply.get('userid')==userid) cnt ++;
                    });
                }
            });
            return cnt;
        }
    });
});
