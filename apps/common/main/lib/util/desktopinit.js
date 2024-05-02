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

if ( window.AscDesktopEditor ) {
    window.desktop = window.AscDesktopEditor;
    desktop.features = {};
    window.native_message_cmd = [];

    window.on_native_message = function (cmd, param) {
        if ( /window:features/.test(cmd) ) {
            var obj = JSON.parse(param);
            if ( obj.singlewindow !== undefined ) {
                desktop.features.singlewindow = obj.singlewindow;
            }
        } else
            window.native_message_cmd[cmd] = param;
    }

    if ( !!window.RendererProcessVariable ) {
        const theme = desktop.theme = window.RendererProcessVariable.theme;
        const map_themes = window.RendererProcessVariable.localthemes;

        if ( theme ) {
            window.uitheme = {
                id: theme.id,
                type: theme.type,
            }

            if ( /dark|light/.test(theme.system) ) {
                window.uitheme.is_system_theme_dark = function () {
                    return theme.system == 'dark';
                }
            }

            if ( map_themes && map_themes[theme.id] ) {
                window.uitheme.colors = map_themes[theme.id].colors;
                // window.desktop.themes = map_themes;
            }
        }

        if ( window.RendererProcessVariable.rtl !== undefined ) {
            window.nativeprocvars = {
                rtl: window.RendererProcessVariable.rtl === true || window.RendererProcessVariable.rtl == "yes" || window.RendererProcessVariable.rtl == "true"
            };
        }
    }

    if ( !params || !params['internal'] ) {
        !window.features && (window.features = {});
        window.features.framesize = {width: window.innerWidth, height: window.innerHeight};
        window.desktop.execCommand('webapps:entry', (window.features && JSON.stringify(window.features)) || '');
    }
}
