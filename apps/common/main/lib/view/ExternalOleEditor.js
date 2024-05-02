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

    Common.Views.ExternalOleEditor = Common.Views.ExternalEditor.extend(_.extend({
        initialize : function(options) {
            var _options = {};
            _.extend(_options,  {
                id: 'id-external-ole-editor',
                title: this.textTitle,
                storageName: 'ole-editor',
                sdkplaceholder: 'id-ole-editor-placeholder',
                initwidth: 900,
                initheight: 700,
                minwidth: 875,
                minheight: 275
            }, options);

            this._oleData = null;
            Common.Views.ExternalEditor.prototype.initialize.call(this, _options);
        },

        setOleData: function(data) {
            this._oleData = data;
            if (this._isExternalDocReady)
                this.fireEvent('setoledata', this);
        },

        textTitle: 'Spreadsheet Editor'
    }, Common.Views.ExternalOleEditor || {}));
});
