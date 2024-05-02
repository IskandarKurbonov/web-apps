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
    'presentationeditor/main/app/model/SlideLayout'
], function(Backbone){ 'use strict';

    PE.Collections = PE.Collections || {};

    PE.Collections.SlideLayouts = Backbone.Collection.extend({
        model: PE.Models.SlideLayout,

        findLayoutByIndex: function(index) {
            return this.find(
                function(model){
                    return model.get('data').idx == index;
                });
        }
    });
});
