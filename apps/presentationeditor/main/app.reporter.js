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
        jquery          : '../vendor/jquery/jquery.min',
        underscore      : '../vendor/underscore/underscore-min',
        xregexp         : '../vendor/xregexp/xregexp-all-min',
        socketio        : '../vendor/socketio/socket.io.min',
        allfonts        : '../../sdkjs/common/AllFonts',
        sdk             : '../../sdkjs/slide/sdk-all-min'
    },
    shim: {
        underscore: {
            exports: '_'
        },
        sdk: {
            deps: [
                'jquery',
                'allfonts',
                'xregexp',
                'socketio'
            ]
        }
    }
});

require([
    'sdk'
], function () {

    var _msg_func = function(msg) {
        var data = msg.data, cmd;

        try {
            cmd = window.JSON.parse(data)
        } catch(e) {}

        if ( cmd ) {
            if ( cmd.type == 'file:open' ) {
                load_document(cmd.data);
            }
        }
    };

    if ( window.attachEvent )
        window.attachEvent('onmessage', _msg_func); else
        window.addEventListener('message', _msg_func, false);

    var api = new Asc.asc_docs_api({
        'id-view'  : 'editor_sdk',
        using      : 'reporter',
        skin       : localStorage.getItem("ui-theme-id")
    });

    var setDocumentTitle = function(title) {
        (title) && (window.document.title += (' - ' + title));
    };

    function load_document(data) {
        var docInfo = {};

        if ( data ) {
            docInfo = new Asc.asc_CDocInfo();
            docInfo.put_Id(data.key);
            docInfo.put_Url(data.url);
            docInfo.put_DirectUrl(data.directUrl);
            docInfo.put_Title(data.title);
            docInfo.put_Format(data.fileType);
            docInfo.put_VKey(data.vkey);
            docInfo.put_Options(data.options);
            docInfo.put_Token(data.token);
            docInfo.put_Permissions(data.permissions || {});
            setDocumentTitle(data.title);
        }

        api.preloadReporter(data);
        api.SetThemesPath("../../../../sdkjs/slide/themes/");
        api.asc_setDocInfo( docInfo );
        api.asc_getEditorPermissions();
        api.asc_setViewMode(true);
    }

    var onDocumentContentReady = function() {
        api.SetDrawingFreeze(false);
        $('#loading-mask').hide().remove();
    };

    var onOpenDocument = function(progress) {
        var proc = (progress.asc_getCurrentFont() + progress.asc_getCurrentImage())/(progress.asc_getFontsCount() + progress.asc_getImagesCount());
        console.log('progress: ' + proc);
    };

    var onEditorPermissions = function(params) {
        api.asc_LoadDocument();
    };

    api.asc_registerCallback('asc_onDocumentContentReady', onDocumentContentReady);
    // api.asc_registerCallback('asc_onOpenDocumentProgress', onOpenDocument);
    api.asc_registerCallback('asc_onGetEditorPermissions', onEditorPermissions);

	setTimeout(function(){
		// waiting for an event to be subscribed
		api.sendFromReporter('i:am:ready');
	}, 500);

}, function(err) {
    if (err.requireType == 'timeout' && !reqerr && window.requireTimeourError) {
        reqerr = window.requireTimeourError();
        window.alert(reqerr);
        window.location.reload();
    }
});