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
    'common/main/lib/model/ChatMessage'
], function(Backbone){
    'use strict';

    !Common.Collections && (Common.Collections = {});

    Common.Collections.ChatMessages = Backbone.Collection.extend({
        model: Common.Models.ChatMessage
    });
});
