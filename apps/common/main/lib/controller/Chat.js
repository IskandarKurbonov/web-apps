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
    'core',
    'common/main/lib/collection/Users',
    'common/main/lib/collection/ChatMessages',
    'common/main/lib/view/Chat'
], function () {
    'use strict';

    Common.Controllers.Chat = Backbone.Controller.extend(_.extend({
        models: [],
        collections: [
            'Common.Collections.Users',
            'Common.Collections.ChatMessages'
        ],
        views: [
            'Common.Views.Chat'
        ],

        initialize: function() {
            this.addListeners({
                'Common.Views.Chat': {
                    'message:add': _.bind(this.onSendMessage, this)
                }
            });

            var me = this;
            Common.NotificationCenter.on('layout:changed', function(area){
                Common.Utils.asyncCall(function(e) {
                    if ( (e == 'toolbar' || e == 'status') && me.panelChat.$el.is(':visible') ) {
                        me.panelChat.updateLayout(true);
                        me.panelChat.setupAutoSizingTextBox();
                    }
                }, this, area);
            });
        },

        events: {
        },


        onLaunch: function() {
            this.panelChat = this.createView('Common.Views.Chat', {
                storeUsers: this.getApplication().getCollection('Common.Collections.Users'),
                storeMessages: this.getApplication().getCollection('Common.Collections.ChatMessages')
            });
            this.panelChat.on('render:after', _.bind(this.onAfterRender, this));
        },

        onAfterRender: function(panel) {
            var viewport = this.getApplication().getController('Viewport').getView('Viewport');
            viewport.hlayout.on('layout:resizedrag',  _.bind(function () {
                panel && panel.updateScrolls();
            }, this));
        },

        setMode: function(mode) {
            this.mode = mode;
            this.currentUserId = mode.user.id;

            if (this.api) {
                if (this.mode.canCoAuthoring && this.mode.canChat)
                    this.api.asc_registerCallback('asc_onCoAuthoringChatReceiveMessage', _.bind(this.onReceiveMessage, this));

                if ( !this.mode.isEditDiagram && !this.mode.isEditMailMerge && !this.mode.isEditOle ) {
                    Common.NotificationCenter.on('mentions:setusers', _.bind(this.avatarsUpdate, this));
                    this.api.asc_registerCallback('asc_onAuthParticipantsChanged', _.bind(this.onUsersChanged, this));
                    this.api.asc_registerCallback('asc_onConnectionStateChanged', _.bind(this.onUserConnection, this));
                    this.api.asc_coAuthoringGetUsers();
                }

                if (this.mode.canCoAuthoring && this.mode.canChat)
                    this.api.asc_coAuthoringChatGetMessages();
            }
            return this;
        },

        setApi: function(api) {
            this.api = api;

            return this;
        },

        onUsersChanged: function(users, currentUserId){
            if (!this.mode.canLicense || !this.mode.canCoAuthoring) {
                var len = 0;
                for (name in users) {
                    if (undefined !== name) len++;
                }
                if (len>1 && this._isCoAuthoringStopped==undefined) {
                    this._isCoAuthoringStopped = true;
                    this.api.asc_coAuthoringDisconnect();
                    Common.NotificationCenter.trigger('api:disconnect');

                    return;
                }
            }

            var usersStore = this.getApplication().getCollection('Common.Collections.Users');

            if (usersStore) {
                var arrUsers = [], name, user, arrIds = [];

                for (name in users) {
                    if (undefined !== name) {
                        user = users[name];
                        if (user) {
                            var avatar = Common.UI.ExternalUsers.getImage(user.asc_getIdOriginal());
                            var usermodel = new Common.Models.User({
                                id          : user.asc_getId(),
                                idOriginal  : user.asc_getIdOriginal(),
                                username    : user.asc_getUserName(),
                                parsedName  : AscCommon.UserInfoParser.getParsedName(user.asc_getUserName()),
                                initials    : Common.Utils.getUserInitials(AscCommon.UserInfoParser.getParsedName(user.asc_getUserName())),
                                online      : true,
                                color       : user.asc_getColor(),
                                avatar      : avatar,
                                view        : user.asc_getView(),
                                hidden      : !(user.asc_getIdOriginal()===this.currentUserId || AscCommon.UserInfoParser.isUserVisible(user.asc_getUserName()))
                            });
                            arrUsers[(user.asc_getId() == currentUserId ) ? 'unshift' : 'push'](usermodel);
                            (avatar===undefined) && arrIds.push(user.asc_getIdOriginal());
                        }
                    }
                }

                usersStore[usersStore.size() > 0 ? 'add' : 'reset'](arrUsers);
                arrIds.length && Common.UI.ExternalUsers.get('info', arrIds);
            }
        },

        onUserConnection: function(change){
            var usersStore = this.getApplication().getCollection('Common.Collections.Users');

            if (usersStore){
                var user = usersStore.findUser(change.asc_getId());
                var avatar = Common.UI.ExternalUsers.getImage(change.asc_getIdOriginal());
                if (!user) {
                    usersStore.add(new Common.Models.User({
                        id          : change.asc_getId(),
                        idOriginal  : change.asc_getIdOriginal(),
                        username    : change.asc_getUserName(),
                        parsedName  : AscCommon.UserInfoParser.getParsedName(change.asc_getUserName()),
                        initials    : Common.Utils.getUserInitials(AscCommon.UserInfoParser.getParsedName(change.asc_getUserName())),
                        online      : change.asc_getState(),
                        color       : change.asc_getColor(),
                        avatar      : avatar,
                        view        : change.asc_getView(),
                        hidden      : !(change.asc_getIdOriginal()===this.currentUserId || AscCommon.UserInfoParser.isUserVisible(change.asc_getUserName()))
                    }));
                } else {
                    user.set({online: change.asc_getState()});
                    user.set({username: change.asc_getUserName()});
                    user.set({parsedName: AscCommon.UserInfoParser.getParsedName(change.asc_getUserName())});
                    user.set({initials: Common.Utils.getUserInitials(change.asc_getUserName())});
                    user.set({avatar: avatar});
                }
                (avatar===undefined) && Common.UI.ExternalUsers.get('info', [change.asc_getIdOriginal()]);
            }
        },

        avatarsUpdate: function(type, users) {
            if (type!=='info') return;

            var usersStore = this.getApplication().getCollection('Common.Collections.Users'),
                msgStore = this.getApplication().getCollection('Common.Collections.ChatMessages'),
                needrender = false;
            if (users && users.length>0 ){
                _.each(users, function(item) {
                    usersStore && usersStore.findOriginalUsers(item.id).forEach(function(user){
                        user.set({avatar: item.image});
                    });
                    msgStore && msgStore.where({userid: item.id}).forEach(function(msg){
                        if (item.image!==undefined && item.image !== msg.get('avatar')) {
                            needrender = true;
                            msg.set('avatar', item.image, {silent: true});
                        }
                    });
                });
            }
            needrender && this.panelChat && this.panelChat.renderMessages();
        },

        onReceiveMessage: function(messages, clear){
            var msgStore = this.getApplication().getCollection('Common.Collections.ChatMessages');

            if ( msgStore ) {
                var array = [];
                messages.forEach(function(msg) {
                    array.push(new Common.Models.ChatMessage({
                        userid      : msg.useridoriginal,
                        message     : msg.message,
                        username    : msg.username,
                        parsedName  : AscCommon.UserInfoParser.getParsedName(msg.username),
                    }));
                });

                msgStore[(msgStore.size() < 1 || clear) ? 'reset' : 'add'](array);
            }
        },

        onSendMessage: function(panel, text){
            if (text.length > 0){
                var splitString = function(string, chunkSize) {
                    var chunks = [];

                    while (string) {
                        if (string.length < chunkSize) {
                            chunks.push(string);
                            break;
                        } else {
                            chunks.push(string.substr(0, chunkSize));
                            string = string.substr(chunkSize);
                        }
                    }

                    return chunks;
                };

                var me = this;
                splitString(text, 2048).forEach(function(message) {
                    me.api.asc_coAuthoringChatSendMessage(message);
                });
            }
        },

        notcriticalErrorTitle: 'Warning'
    }, Common.Controllers.Chat || {}));
});