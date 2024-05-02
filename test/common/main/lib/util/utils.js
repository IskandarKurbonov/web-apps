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
        return {
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
            }
        };
    })();
}();
