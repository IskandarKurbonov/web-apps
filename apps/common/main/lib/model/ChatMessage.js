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
], function(Backbone){
    'use strict';

    Common.Models = Common.Models || {};

    Common.Models.ChatMessage = Backbone.Model.extend({
        defaults: {
            type        : 0,
            userid      : null,
            username    : '',
            message     : ''
        }
    });
});
