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

'use strict';
var reqerr;
require.config({
    // The shim config allows us to configure dependencies for
    // scripts that do not call define() to register a module
    baseUrl: '../../',
    paths: {
        jquery          : '../vendor/jquery/jquery',
        underscore      : '../vendor/underscore/underscore',
        backbone        : '../vendor/backbone/backbone',
        bootstrap       : '../vendor/bootstrap/dist/js/bootstrap',
        text            : '../vendor/requirejs-text/text',
        perfectscrollbar: 'common/main/lib/mods/perfect-scrollbar',
        jmousewheel     : '../vendor/perfect-scrollbar/src/jquery.mousewheel',
        xregexp         : '../vendor/xregexp/xregexp-all-min',
        socketio        : '../vendor/socketio/socket.io.min',
        api             : 'api/documents/api',
        core            : 'common/main/lib/core/application',
        notification    : 'common/main/lib/core/NotificationCenter',
        keymaster       : 'common/main/lib/core/keymaster',
        tip             : 'common/main/lib/util/Tip',
        localstorage    : 'common/main/lib/util/LocalStorage',
        analytics       : 'common/Analytics',
        gateway         : 'common/Gateway',
        locale          : 'common/locale',
        irregularstack  : 'common/IrregularStack'
    },

    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        bootstrap: {
            deps: [
                'jquery'
            ]
        },
        perfectscrollbar: {
            deps: [
                'jmousewheel'
            ]
        },
        notification: {
            deps: [
                'backbone'
            ]
        },
        core: {
            deps: [
                'backbone',
                'notification',
                'irregularstack'
            ]
        },
        gateway: {
            deps: [
                'jquery'
            ]
        },
        analytics: {
            deps: [
                'jquery'
            ]
        }
    }
});

require([
    'backbone',
    'bootstrap',
    'core',
    'analytics',
    'gateway',
    'locale',
    'socketio',
	'underscore'
], function (Backbone, Bootstrap, Core) {
    if (Backbone.History && Backbone.History.started)
        return;
    Backbone.history.start();

    /**
     * Application instance with DE namespace defined
     */
    var app = new Backbone.Application({
        nameSpace: 'DE',
        autoCreate: false,
        controllers : [
            'Viewport',
            'DocumentHolder',
            'Toolbar',
            'Statusbar',
            'Links',
            'FormsTab',
            'Navigation',
            'PageThumbnails',
            'RightMenu',
            'LeftMenu',
            'Main',
            'ViewTab',
            'Search',
            'DocProtection',
            'Print',
            'Common.Controllers.Fonts',
            'Common.Controllers.History'
            /** coauthoring begin **/
            ,'Common.Controllers.Chat'
            ,'Common.Controllers.Comments'
            ,'Common.Controllers.Draw'
            /** coauthoring end **/
            ,'Common.Controllers.Plugins'
            ,'Common.Controllers.ExternalDiagramEditor'
            ,'Common.Controllers.ExternalMergeEditor'
            ,'Common.Controllers.ExternalOleEditor'
            ,'Common.Controllers.ReviewChanges'
            ,'Common.Controllers.Protection'
        ]
    });

    Common.Locale.apply(
        function() {
            require([
                'common/main/lib/util/LocalStorage',
                'common/main/lib/controller/Scaling',
                'common/main/lib/controller/Themes',
                'common/main/lib/controller/Desktop',
                'documenteditor/main/app/controller/Viewport',
                'documenteditor/main/app/controller/DocumentHolder',
                'documenteditor/main/app/controller/Toolbar',
                'documenteditor/main/app/controller/Links',
                'documenteditor/main/app/controller/FormsTab',
                'documenteditor/main/app/controller/Navigation',
                'documenteditor/main/app/controller/PageThumbnails',
                'documenteditor/main/app/controller/Statusbar',
                'documenteditor/main/app/controller/RightMenu',
                'documenteditor/main/app/controller/LeftMenu',
                'documenteditor/main/app/controller/Main',
                'documenteditor/main/app/controller/ViewTab',
                'documenteditor/main/app/controller/Search',
                'documenteditor/main/app/controller/DocProtection',
                'documenteditor/main/app/controller/Print',
                'documenteditor/main/app/view/FileMenuPanels',
                'documenteditor/main/app/view/ParagraphSettings',
                'documenteditor/main/app/view/HeaderFooterSettings',
                'documenteditor/main/app/view/ImageSettings',
                'documenteditor/main/app/view/TableSettings',
                'documenteditor/main/app/view/ShapeSettings',
                'documenteditor/main/app/view/TextArtSettings',
                'documenteditor/main/app/view/SignatureSettings',
                'common/main/lib/util/utils',
                'common/main/lib/controller/Fonts',
                'common/main/lib/controller/History'
                /** coauthoring begin **/
                ,'common/main/lib/controller/Comments'
                ,'common/main/lib/controller/Chat'
                /** coauthoring end **/
                ,'common/main/lib/controller/Plugins'
                ,'documenteditor/main/app/view/ChartSettings'
                ,'common/main/lib/controller/ExternalDiagramEditor'
                ,'common/main/lib/controller/ExternalMergeEditor'
                ,'common/main/lib/controller/ExternalOleEditor'
                ,'common/main/lib/controller/ReviewChanges'
                ,'common/main/lib/controller/Protection'
                ,'common/main/lib/controller/Draw'
            ], function() {
                window.compareVersions = true;
                app.start();
            });
        }
    );
}, function(err) {
    if (err.requireType == 'timeout' && !reqerr && window.requireTimeourError) {
        reqerr = window.requireTimeourError();
        window.alert(reqerr);
        window.location.reload();
    }
});