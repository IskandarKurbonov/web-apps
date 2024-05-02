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
     * Application instance with PDFE namespace defined
     */
    var app = new Backbone.Application({
        nameSpace: 'PDFE',
        autoCreate: false,
        controllers : [
            'Viewport',
            'DocumentHolder',
            'Toolbar',
            'Statusbar',
            'Navigation',
            'PageThumbnails',
            'LeftMenu',
            'Main',
            'ViewTab',
            'Search',
            'Print',
            'Common.Controllers.Fonts'
            ,'Common.Controllers.Chat'
            ,'Common.Controllers.Comments'
            ,'Common.Controllers.Draw'
            ,'Common.Controllers.Plugins'
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
                'pdfeditor/main/app/controller/Viewport',
                'pdfeditor/main/app/controller/DocumentHolder',
                'pdfeditor/main/app/controller/Toolbar',
                'pdfeditor/main/app/controller/Navigation',
                'pdfeditor/main/app/controller/PageThumbnails',
                'pdfeditor/main/app/controller/Statusbar',
                'pdfeditor/main/app/controller/LeftMenu',
                'pdfeditor/main/app/controller/Main',
                'pdfeditor/main/app/controller/ViewTab',
                'pdfeditor/main/app/controller/Search',
                'pdfeditor/main/app/controller/Print',
                'pdfeditor/main/app/view/FileMenuPanels',
                'common/main/lib/util/utils',
                'common/main/lib/controller/Fonts',
                'common/main/lib/controller/Comments'
                ,'common/main/lib/controller/Chat'
                ,'common/main/lib/controller/Plugins'
                ,'common/main/lib/controller/Draw'
                ,'common/main/lib/controller/Protection'
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