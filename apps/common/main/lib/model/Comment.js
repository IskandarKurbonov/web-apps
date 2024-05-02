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

    Common.Models.Comment = Backbone.Model.extend({
        defaults: {
            uid                 : 0,                        //  asc
            guid                : '',
            userid              : 0,
            username            : 'Guest',
            parsedName          : 'Guest',
            parsedGroups        : undefined,
            usercolor           : null,
            date                : undefined,
            quote               : '',
            comment             : '',
            resolved            : false,
            lock                : false,
            lockuserid          : '',
            unattached          : false,
            userdata            : '',
            position            : -1,

            id                  : Common.UI.getId(),        //  internal
            time                : 0,
            showReply           : false,
            showReplyInPopover  : false,
            editText            : false,
            editTextInPopover   : false,
            last                : undefined,
            replys              : [],
            hideAddReply        : false,
            scope               : null,
            hide                : false,
            filtered            : false,
            hint                : false,
            fullInfoInHint      : false,
            dummy               : undefined,
            editable            : true,
            removable           : true
        }
    });
    Common.Models.Reply = Backbone.Model.extend({
        defaults: {
            time                : 0,                    //  acs
            userid              : 0,
            username            : 'Guest',
            parsedName          : 'Guest',
            usercolor           : null,
            reply               : '',
            date                : undefined,
            userdata            : '',

            id                  : Common.UI.getId(),    //  internal
            editText            : false,
            editTextInPopover   : false,
            scope               : null,
            editable            : true,
            removable           : true,
            hide                : false
        }
    });
});
