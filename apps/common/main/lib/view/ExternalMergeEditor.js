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
    'common/main/lib/view/ExternalEditor'
], function () { 'use strict';

    Common.Views.ExternalMergeEditor = Common.Views.ExternalEditor.extend(_.extend({
        initialize : function(options) {
            var _options = {};
            _.extend(_options,  {
                id: 'id-external-merge-editor',
                title: this.textTitle,
                storageName: 'merge-editor',
                sdkplaceholder: 'id-merge-editor-placeholder',
                initwidth: 900,
                initheight: 700,
                minwidth: 370,
                minheight: 275
            }, options);

            this._mergeData = null;
            Common.Views.ExternalEditor.prototype.initialize.call(this, _options);
        },

        setMergeData: function(data) {
            this._mergeData = data;
            if (this._isExternalDocReady)
                this.fireEvent('setmergedata', this);
        },

        textTitle: 'Mail Merge Recipients'
    }, Common.Views.ExternalMergeEditor || {}));
});