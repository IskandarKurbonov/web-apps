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
 * Time: 15:56
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

    Common.Models.PluginVariation = Backbone.Model.extend({
        defaults: function() {
            return {
                description: "",
                url: "",
                index: 0,
                icons: undefined,
                isSystem: false,
                isViewer: false,
                isDisplayedInViewer: true,
                EditorsSupport: ["word", "cell", "slide"],
                isVisual: false,
                isCustomWindow: false,
                isModal: true,
                isInsideMode: false,
                initDataType: 0,
                initData: "",
                isUpdateOleOnResize: false,
                buttons: [],
                size: [800, 600],
                initOnSelectionChanged: false,
                visible: true
            }
        }
    });

    Common.Models.Plugin = Backbone.Model.extend({
        defaults: function() {
            return {
                id: Common.UI.getId(),
                name : '',
                baseUrl : '',
                guid: Common.UI.getId(),
                variations: [],
                currentVariation: 0,
                pluginObj: undefined,
                allowSelected: false,
                selected: false,
                visible: true,
                groupName: '',
                groupRank: 0
            }
        }
    });
});
