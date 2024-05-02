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
 * User: Julia.Svinareva
 * Date: 23.08.2021
 */

define([
    'core',
    /*'pdfeditor/main/app/collection/Thumbnails',*/
    'pdfeditor/main/app/view/PageThumbnails'
], function () {
    'use strict';

    PDFE.Controllers.PageThumbnails = Backbone.Controller.extend(_.extend({
        models: [],
        /*collections: [
            'Thumbnails'
        ],*/
        views: [
            'PageThumbnails'
        ],

        initialize: function() {
            this._sendUndoPoint = true;
            this.firstShow = true;
            this.addListeners({
                'PageThumbnails': {
                    'show': _.bind(function () {
                        this.api.asc_viewerThumbnailsResize();
                        if (this.firstShow) {
                            this.api.asc_setViewerThumbnailsUsePageRect(Common.localStorage.getBool("de-thumbnails-highlight", true));
                            this.firstShow = false;
                        }
                    }, this)
                }
            });
        },

        events: function() {
        },

        onLaunch: function() {
            this.panelThumbnails = this.createView('PageThumbnails');
            this.panelThumbnails.on('render:after', _.bind(this.onAfterRender, this));
        },

        setApi: function(api) {
            this.api = api;
            this.api.asc_registerCallback('asc_onViewerThumbnailsZoomUpdate', _.bind(this.updateSize, this));
            return this;
        },

        setMode: function(mode) {
            this.mode = mode;
            return this;
        },

        onAfterRender: function(panelThumbnails) {
            panelThumbnails.sldrThumbnailsSize.on('change', _.bind(this.onChangeSize, this));

            panelThumbnails.buttonSettings.menu.on('item:click', _.bind(this.onHighlightVisiblePart, this));
            panelThumbnails.buttonSettings.menu.on('show:before', _.bind(function () {
                this.panelThumbnails.sldrThumbnailsSize.setValue(this.thumbnailsSize);
            }, this));


            var viewport = PDFE.getController('Viewport').getView('Viewport');
            viewport.hlayout.on('layout:resizedrag',  _.bind(function () {
                if (!this.firstShow) {
                    this.api.asc_viewerThumbnailsResize();
                }
            }, this));
        },

        onHighlightVisiblePart: function(menu, item, e) {
            if (item.value === 'highlight') {
                var checked = item.isChecked();
                this.api.asc_setViewerThumbnailsUsePageRect(checked);
                Common.localStorage.setBool("de-thumbnails-highlight", checked);
            }
        },

        updateSize: function (size) {
            this.thumbnailsSize = Math.min(size * 100, 100);
        },

        onChangeSize: function(field, newValue) {
            if (newValue!==undefined) {
                this.thumbnailsSize = newValue;
                this.api.asc_setViewerThumbnailsZoom(newValue / 100);
            }
        },

    }, PDFE.Controllers.PageThumbnails || {}));
});