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
 * Date: 14.12.17
 */

define([
    'underscore',
    'backbone',
    'common/main/lib/component/TreeView'
], function(_, Backbone){
    'use strict';

    DE.Collections = DE.Collections || {};

    DE.Collections.Navigation = Common.UI.TreeViewStore.extend({
        model: Common.UI.TreeViewModel
    });
});
