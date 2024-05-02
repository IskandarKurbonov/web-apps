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

    Common.Views.ExternalDiagramEditor = Common.Views.ExternalEditor.extend(_.extend({
        initialize : function(options) {
            var _options = {};
            _.extend(_options,  {
                id: 'id-external-diagram-editor',
                title: this.textTitle,
                storageName: 'diagram-editor',
                sdkplaceholder: 'id-diagram-editor-placeholder',
                initwidth: 900,
                initheight: 700,
                minwidth: 730,
                minheight: 275
            }, options);

            this._chartData = null;
            Common.Views.ExternalEditor.prototype.initialize.call(this, _options);
        },

        show: function() {
            this.setPlaceholder();
            Common.Views.ExternalEditor.prototype.show.apply(this, arguments);
        },

        setChartData: function(data) {
            this._chartData = data;
            if (this._isExternalDocReady)
                this.fireEvent('setchartdata', this);
        },

        setPlaceholder: function(placeholder) {
            this._placeholder = placeholder;
        },

        getPlaceholder: function() {
            return this._placeholder;
        },

        textTitle: 'Chart Editor'
    }, Common.Views.ExternalDiagramEditor || {}));
});
