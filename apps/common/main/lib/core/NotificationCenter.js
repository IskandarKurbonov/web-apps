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
 *  Using:
 *
 *  Common.NotificationCenter.on("foo", function(){
 *      alert("bar");
 *  });
 *
 *  Common.NotificationCenter.trigger("foo"); // => alert box "bar"
 *
 */

if (Common === undefined)
    var Common = {};

define([
    'backbone'
], function (Backbone) {
    'use strict';

    var NotificationCenter = function(){};

    // Copy the basic Backbone.Events on to the event aggregator
    _.extend(NotificationCenter.prototype, Backbone.Events);

    if(typeof Common.NotificationCenter == 'undefined') {
        // Method to create new Common.NotificationCenter class
        NotificationCenter.extend = Backbone.Model.extend;

        Common.NotificationCenter = new NotificationCenter();
    }
    else {
        throw ('Native Common.NotificationCenter instance already defined.')
    }
});