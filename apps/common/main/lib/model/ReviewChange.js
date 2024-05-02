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

    Common.Models.ReviewChange = Backbone.Model.extend({
        defaults: {
            uid                 : 0,                        //  asc
            userid              : 0,
            username            : 'Guest',
            usercolor           : null,
            date                : undefined,
            changetext          : '',
            lock                : false,
            lockuser            : '',
            type                : 0,
            changedata          : null,
            hint                : false,
            editable            : false,
            id                  : Common.UI.getId(),        //  internal
            scope               : null
        }
    });
});
