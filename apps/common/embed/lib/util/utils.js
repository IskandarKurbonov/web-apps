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

+function () {
    !window.common && (window.common = {});
    !common.utils && (common.utils = {});

    common.utils = new(function(){
        var userAgent = navigator.userAgent.toLowerCase(),
            check = function(regex){
                return regex.test(userAgent);
            },
            isMac = check(/macintosh|mac os x/);
        return {
            openLink: function(url) {
                if (url) {
                    var newDocumentPage = window.open(url, '_blank');
                    if (newDocumentPage)
                        newDocumentPage.focus();
                }
            }
            , dialogPrint: function(url, api) {
                $('#id-print-frame').remove();

                if ( !!url ) {
                    var iframePrint = document.createElement("iframe");

                    iframePrint.id = "id-print-frame";
                    iframePrint.style.display = 'none';
                    iframePrint.style.visibility = "hidden";
                    iframePrint.style.position = "fixed";
                    iframePrint.style.right = "0";
                    iframePrint.style.bottom = "0";
                    document.body.appendChild(iframePrint);

                    iframePrint.onload = function () {
                        try {
                            iframePrint.contentWindow.focus();
                            iframePrint.contentWindow.print();
                            iframePrint.contentWindow.blur();
                            window.focus();
                        } catch (e) {
                            api.asc_DownloadAs(new Asc.asc_CDownloadOptions(Asc.c_oAscFileType.PDF));
                        }
                    };

                    iframePrint.src = url;
                }
            },
            htmlEncode: function(value) {
                return $('<div/>').text(value).html();
            },

            fillUserInfo: function(info, lang, defname, defid) {
                var _user = info || {};
                _user.anonymous = !_user.id;
                !_user.id && (_user.id = defid);
                _user.fullname = !_user.name ? defname : _user.name;
                _user.group && (_user.fullname = (_user.group).toString() + AscCommon.UserInfoParser.getSeparator() + _user.fullname);
                _user.guest = !_user.name;
                return _user;
            },

            fixedDigits: function(num, digits, fill) {
                (fill===undefined) && (fill = '0');
                var strfill = "",
                    str = num.toString();
                for (var i=str.length; i<digits; i++) strfill += fill;
                return strfill + str;
            },
            getKeyByValue: function(obj, value) {
                for(var prop in obj) {
                    if(obj.hasOwnProperty(prop)) {
                        if(obj[prop] === value)
                            return prop;
                    }
                }
            },

            isMac : isMac
        };
    })();
}();
