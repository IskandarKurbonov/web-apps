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
    'text!presentationeditor/main/app/template/Viewport.template',
    'jquery',
    'underscore',
    'backbone',
    'common/main/lib/component/BaseView',
    'common/main/lib/component/Layout'
], function (viewportTemplate, $, _, Backbone) {
    'use strict';

    PE.Views.Viewport = Backbone.View.extend({
        el: '#viewport',

        // Compile our stats template
        template: _.template(viewportTemplate),

        // Delegated events for creating new items, and clearing completed ones.
        events: {
        },

        // Set innerHTML and get the references to the DOM elements
        initialize: function() {
            //
        },

        // Render layout
        render: function() {
            var el = $(this.el);
            el.html(this.template({}));

            // Workaround Safari's scrolling problem
            if (Common.Utils.isSafari) {
                $('body').addClass('safari');
                $('body').mousewheel(function(e){
                    e.preventDefault();
                    e.stopPropagation();
                });
            } else if (Common.Utils.isChrome) {
                $('body').addClass('chrome');
            }

            el.on('scroll', function () { el.scrollTop(0); });

            var $container = $('#viewport-vbox-layout', el);
            var items = $container.find(' > .layout-item');
            this.vlayout = new Common.UI.VBoxLayout({
                box: $container,
                items: [{
                    el: $container.find('> .layout-item#app-title').hide(),
                    alias: 'title',
                    height: Common.Utils.InternalSettings.get('document-title-height')
                }, {
                    el: items[1],
                    alias: 'toolbar',
                    height: Common.localStorage.getBool('pe-compact-toolbar') ?
                        Common.Utils.InternalSettings.get('toolbar-height-compact') : Common.Utils.InternalSettings.get('toolbar-height-normal')
                }, {
                    el: items[2],
                    stretch: true
                }, {
                    el: items[3],
                    height: 25
                }]
            });

            $container = $('#viewport-hbox-layout', el);
            items = $container.find(' > .layout-item');

            let iarray =  [{
                el: items[0],
                rely: true,
                alias: 'left',
                resize: {
                    hidden: true,
                    autohide: false,
                    min: 300,
                    max: 600
                }}, { // history versions
                el: items[3],
                rely: true,
                alias: 'history',
                resize: {
                    hidden: true,
                    autohide: false,
                    min: 300,
                    max: 600
                }
            }, {
                el: items[1],
                stretch: true
            }, {
                el: $(items[2]).hide(),
                rely: true
            }];

            if ( Common.UI.isRTL() ) {
                [iarray[0].resize.min, iarray[0].resize.max] = [-600, -300];
                [iarray[1].resize.min, iarray[1].resize.max] = [-600, -300];

                [iarray[0], iarray[3]] = [iarray[3], iarray[0]];
                [iarray[1], iarray[2]] = [iarray[2], iarray[1]];
            }

            this.hlayout = new Common.UI.HBoxLayout({
                box: $container,
                items: iarray
            });

            return this;
        },

        applyEditorMode: function() {
            var me              = this,
                rightMenuView   = PE.getController('RightMenu').getView('RightMenu');

            me._rightMenu   = rightMenuView.render(this.mode);
            var value = Common.UI.LayoutManager.getInitValue('rightMenu');
            value = (value!==undefined) ? !value : false;
            Common.localStorage.getBool("pe-hidden-rightmenu", value) && me._rightMenu.hide();
            Common.Utils.InternalSettings.set("pe-hidden-rightmenu", Common.localStorage.getBool("pe-hidden-rightmenu", value));
        },

        applyCommonMode: function() {
            if ( Common.localStorage.getBool('pe-hidden-status') )
                PE.getController('Statusbar').getView('Statusbar').setVisible(false);

            var value = Common.UI.LayoutManager.getInitValue('leftMenu');
            value = (value!==undefined) ? !value : false;
            Common.localStorage.getBool("pe-hidden-leftmenu", value) && PE.getController('LeftMenu').getView('LeftMenu').hide();
        },

        setMode: function(mode, delay) {
            if (mode.isDisconnected) {
                /** coauthoring begin **/
                if (_.isUndefined(this.mode))
                    this.mode = {};

                this.mode.canCoAuthoring = false;
                /** coauthoring end **/
            } else {
                this.mode = mode;
            }
        }
    });
});
