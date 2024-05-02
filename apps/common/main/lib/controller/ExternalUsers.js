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

if (Common === undefined)
    var Common = {};

if (Common.UI === undefined) {
    Common.UI = {};
}

Common.UI.ExternalUsers = new( function() {
    var externalUsers = [],
        isUsersLoading = false,
        externalUsersInfo = [],
        isUsersInfoLoading = false,
        stackUsersInfoResponse = [];

    var _get = function(type, ids) {
        if (type==='info') {
            (typeof ids !== 'object') && (ids = [ids]);
            ids && (ids = _.uniq(ids));
            if (ids.length>100) {
                while (ids.length>0) {
                    Common.Gateway.requestUsers('info', ids.splice(0, 100));
                }
            } else
                Common.Gateway.requestUsers('info', ids);
        } else {
            if (isUsersLoading) return;

            type = type || 'mention';
            if (externalUsers[type]===undefined) {
                isUsersLoading = true;
                Common.Gateway.requestUsers(type || 'mention');
            } else {
                Common.NotificationCenter.trigger('mentions:setusers', type, externalUsers[type]);
            }
        }
    };

    var _getImage = function(id, request) {
        var image,
            user = _.findWhere(externalUsersInfo, {id: id})
        user && (image = user.image);
        request && (image===undefined) && _get('info', [id]);
        return image;
    };

    var _setImage = function(id, image) {
        var user = _.findWhere(externalUsersInfo, {id: id})
        user ? (user.image = image) : externalUsersInfo.push({id: id, image: image});
    };

    var _onUsersInfo = function(data) {
        if (data.c !== 'info') return;

        if (isUsersInfoLoading) {
            stackUsersInfoResponse.push(data);
            return;
        }

        isUsersInfoLoading = true;

        var append = [];
        data.users && _.each(data.users, function(item) {
            var user = _.findWhere(externalUsersInfo, {id: item.id});
            if (user) {
                user.image = item.image;
                user.name = item.name;
                user.email = item.email;
            } else
                append.push(item);
        });
        externalUsersInfo = externalUsersInfo.concat(append);
        Common.NotificationCenter.trigger('mentions:setusers', data.c, data.users);
        isUsersInfoLoading = false;
        if (stackUsersInfoResponse.length>0)
            _onUsersInfo(stackUsersInfoResponse.shift());
    };

    var _init = function(canRequestUsers) {
        Common.Gateway.on('setusers', _onUsersInfo);

        if (!canRequestUsers) return;

        Common.Gateway.on('setusers', function(data) {
            if (data.c === 'info') return;
            if (data.users===null) {// clear user lists
                externalUsers = [];
                return;
            }
            var type = data.c || 'mention';
            externalUsers[type] = data.users || [];
            isUsersLoading = false;
            Common.NotificationCenter.trigger('mentions:setusers', type, externalUsers[type]);
        });

        Common.NotificationCenter.on('mentions:clearusers',   function(type) {
            if (type !== 'info')
                externalUsers[type || 'mention'] = undefined;
        });
    };

    return {
        init: _init,
        get: _get,
        getImage: _getImage,
        setImage: _setImage
    }
})();
