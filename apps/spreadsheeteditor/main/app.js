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
        allfonts        : '../../sdkjs/common/AllFonts',
        sdk             : '../../sdkjs/cell/sdk-all-min',
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
        sdk: {
            deps: [
                'jquery',
                'allfonts',
                'xregexp',
                'socketio'
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
    'sdk',
    'backbone',
    'bootstrap',
    'core',
    'analytics',
    'gateway',
    'locale'
], function (Sdk, Backbone, Bootstrap, Core) {
    if (Backbone.History && Backbone.History.started)
        return;
    Backbone.history.start();

    /**
     * Application instance with SSE namespace defined
     */
    var app = new Backbone.Application({
        nameSpace: 'SSE',
        autoCreate: false,
        controllers : [
            'Viewport',
            'DocumentHolder',
            'CellEditor',
            'FormulaDialog',
            'Print',
            'Toolbar',
            'Statusbar',
            'RightMenu',
            'LeftMenu',
            'Spellcheck',
            'Main',
            'PivotTable',
            'DataTab',
            'ViewTab',
            'Search',
            'WBProtection',
            'Common.Controllers.Fonts',
            'Common.Controllers.History',
            'Common.Controllers.Chat',
            'Common.Controllers.Comments',
            'Common.Controllers.Draw',
            'Common.Controllers.Plugins'
            ,'Common.Controllers.ExternalOleEditor'
            ,'Common.Controllers.ReviewChanges'
            ,'Common.Controllers.Protection'
        ]
    });

    Common.Locale.apply(function(){
        require([
            'common/main/lib/util/LocalStorage',
            'common/main/lib/controller/Scaling',
            'common/main/lib/controller/Themes',
            'common/main/lib/controller/Desktop',
            'spreadsheeteditor/main/app/controller/Viewport',
            'spreadsheeteditor/main/app/controller/DocumentHolder',
            'spreadsheeteditor/main/app/controller/CellEditor',
            'spreadsheeteditor/main/app/controller/Toolbar',
            'spreadsheeteditor/main/app/controller/Statusbar',
            'spreadsheeteditor/main/app/controller/RightMenu',
            'spreadsheeteditor/main/app/controller/LeftMenu',
            'spreadsheeteditor/main/app/controller/Spellcheck',
            'spreadsheeteditor/main/app/controller/Main',
            'spreadsheeteditor/main/app/controller/Print',
            'spreadsheeteditor/main/app/controller/PivotTable',
            'spreadsheeteditor/main/app/controller/DataTab',
            'spreadsheeteditor/main/app/controller/ViewTab',
            'spreadsheeteditor/main/app/controller/Search',
            'spreadsheeteditor/main/app/controller/WBProtection',
            'spreadsheeteditor/main/app/view/FileMenuPanels',
            'spreadsheeteditor/main/app/view/ParagraphSettings',
            'spreadsheeteditor/main/app/view/ImageSettings',
            'spreadsheeteditor/main/app/view/ChartSettings',
            'spreadsheeteditor/main/app/view/ShapeSettings',
            'spreadsheeteditor/main/app/view/TextArtSettings',
            'spreadsheeteditor/main/app/view/PivotSettings',
            'spreadsheeteditor/main/app/view/FieldSettingsDialog',
            'spreadsheeteditor/main/app/view/ValueFieldSettingsDialog',
            'spreadsheeteditor/main/app/view/SignatureSettings',
            'common/main/lib/util/utils',
            'common/main/lib/controller/Fonts',
            'common/main/lib/controller/History',
            'common/main/lib/controller/Comments',
            'common/main/lib/controller/Chat',
            'common/main/lib/controller/Plugins'
            ,'common/main/lib/controller/ExternalOleEditor'
            ,'common/main/lib/controller/ReviewChanges'
            ,'common/main/lib/controller/Protection'
            ,'common/main/lib/controller/Draw'
        ], function() {
            app.start();
        });
    });
}, function(err) {
    if (err.requireType == 'timeout' && !reqerr && window.requireTimeourError) {
        reqerr = window.requireTimeourError();
        window.alert(reqerr);
        window.location.reload();
    }
});