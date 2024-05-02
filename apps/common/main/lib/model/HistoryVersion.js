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
 * Time: 16:42
 */

if (Common === undefined)
    var Common = {};

Common.Models = Common.Models || {};

define([
    'underscore',
    'backbone',
    'common/main/lib/component/BaseView'
], function(_, Backbone){
    'use strict';

    Common.Models.HistoryVersion = Backbone.Model.extend({
        defaults: function() {
            return {
                version : 0,
                revision: 0,
                changeid : undefined,
                userid  : undefined,
                username: 'Guest',
                usercolor: '#ff0000',
                created : undefined,
                id      : Common.UI.getId(),        //  internal
                url    : '',
                urlDiff : '',
                urlGetTime : '',
                docId: '',
                docIdPrev: '',
                token: '',
                arrColors: [], // array of user colors for all changes of current version
                markedAsVersion: false,
                canRestore: false,
                isRevision: true,
                hasChanges: false,
                isExpanded: true,
                isVisible: true,
                allowSelected: true,
                selected: false,
                serverVersion: 0,
                fileType: 'docx'
            }
        }
    });
});
