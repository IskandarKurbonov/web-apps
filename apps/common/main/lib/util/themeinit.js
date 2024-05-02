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

+function init_themes() {
    let localstorage;
    const local_storage_available = +function () {
        try {
            return !!(localstorage = window.localStorage);
        } catch (e) {
            console.warn('localStorage is unavailable');
            localstorage = {
                getItem: function (key) {return null;},
            };
            return false;
        }
    }();

    !window.uitheme && (window.uitheme = {});

    window.uitheme.set_id = function (id) {
        if ( id == 'theme-system' )
            this.adapt_to_system_theme();
        else this.id = id;
    }

    window.uitheme.is_theme_system = function () {
        return this.id == 'theme-system';
    }

    window.uitheme.adapt_to_system_theme = function () {
        this.id = 'theme-system';
        this.type = this.is_system_theme_dark() ? 'dark' : 'light';
    }

    window.uitheme.relevant_theme_id = function () {
        if ( this.is_theme_system() )
            return this.is_system_theme_dark() ? 'theme-dark' : 'theme-classic-light';
        return this.id;
    }

    if ( !window.uitheme.is_system_theme_dark )
        window.uitheme.is_system_theme_dark = function () {
            return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        }

    !window.uitheme.id && window.uitheme.set_id(localstorage.getItem("ui-theme-id"));
    window.uitheme.iscontentdark = localstorage.getItem("content-theme") == 'dark';

    let objtheme = window.uitheme.colors ? window.uitheme : localstorage.getItem("ui-theme");
    if ( !!objtheme ) {
        if ( typeof(objtheme) == 'string' && objtheme.lastIndexOf("{", 0) === 0 &&
                objtheme.indexOf("}", objtheme.length - 1) !== -1 )
        {
            objtheme = JSON.parse(objtheme);
        }

        if ( objtheme ) {
            if ( window.uitheme.id && window.uitheme.id != objtheme.id ) {
                local_storage_available && localstorage.removeItem("ui-theme");
                !window.uitheme.type && /-dark/.test(window.uitheme.id) && (window.uitheme.type = 'dark');
            } else {
                window.uitheme.cache = objtheme;
                if ( !window.uitheme.type && objtheme.type ) {
                    window.uitheme.type = objtheme.type;
                }

                if ( objtheme.colors ) {
                    let colors = [];
                    for (let c in objtheme.colors) {
                        // TODO: new PE brand color, clear for ver 7.7
                        if ( c == 'toolbar-header-presentation' &&
                                objtheme.colors[c] == '#aa5252' )
                            objtheme.colors[c] = '#BE664F';
                        //

                        colors.push('--' + c + ':' + objtheme.colors[c]);
                    }

                    var style = document.createElement('style');
                    style.type = 'text/css';
                    style.innerHTML = '.' + objtheme.id + '{' + colors.join(';') + ';}';
                    document.getElementsByTagName('head')[0].appendChild(style);
                }
            }
        }
    }
}();