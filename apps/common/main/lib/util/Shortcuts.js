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

/*
*       Methods
*       -------
*
*       @method delegateShortcuts
*       Accepts named array of shortcuts and callbacks
*
*       @method suspendEvents
*
*       @method resetEvents
*
*
*       Examples of usage
*       ----------------
*
*       Common.util.Shortcuts.delegateShortcuts({
*           shortcuts: {
*               "ctrl+f": this.onShortcutSearch
*           }
*       });
*
*       Common.util.Shortcuts.delegateShortcuts({
*           shortcuts: {
*               "ctrl+f": "shortcutSearch"
*           },
*           shortcutSearch: function(event) {
*           }
*       });
*
*       Common.util.Shortcuts.suspendEvents('ctrl+f')
*       Common.util.Shortcuts.resumeEvents('ctrl+f')
* */

if (Common === undefined) {
    var Common = {};
}

Common.util = Common.util||{};

 define([
    'backbone',
    'keymaster'
], function (Backbone) {
    'use strict';

    var Shortcuts = function(options) {
        this.cid = _.uniqueId("shortcuts");
        this.initialize.apply(this, arguments);
//        return this.delegateShortcuts(options);
        return this;
    };

    _.extend(Shortcuts.prototype, Backbone.Events, {
        initialize: function() {
            window.key.filter = function(event) {
                return true;
            };

            Common.NotificationCenter.on({
                'modal:show': function(e){
                    window.key.suspend();
                },
                'modal:close': function(e, last) {
                    last && window.key.resume();
                },
                'modal:hide': function(e, last) {
                    last && window.key.resume();
                }
            });
        },

        delegateShortcuts: function(options) {
            if (!options || !options.shortcuts) return;

            this.removeShortcuts(options);

            var callback, match, method, scope, shortcut, shortcutKey;
            var _results = [];
            for (shortcut in options.shortcuts) {
                callback = options.shortcuts[shortcut];

                if (!_.isFunction(callback)){
                    method = options[callback];
                    if (!method) throw new Error("Method " + callback + " does not exist");
                } else {
                    method = callback;
                }

                match = shortcut.match(/^(\S+)\s*(.*)$/);
                shortcutKey = match[1];
                scope = match[2].length ? match[2] : 'all';
                method = _.bind(method, this);
                _results.push(window.key(shortcutKey, scope, method));
            }
//            return _results;
        },

        removeShortcuts: function(options) {
            if (!options || !options.shortcuts) return;

            var match, scope, shortcut, shortcutKey;
            var _results = [];
            for (shortcut in options.shortcuts) {
                match = shortcut.match(/^(\S+)\s*(.*)$/);
                shortcutKey = match[1];
                scope = match[2].length ? match[2] : 'all';

                window.key.unbind(shortcutKey, scope);
            }
        },

        suspendEvents: function(key,scope,propagate) {
            window.key.suspend(key,scope,propagate);
        },

        resumeEvents: function(key,scope) {
            window.key.resume(key,scope);
        }
    });

    Shortcuts.extend = Backbone.View.extend;

    Common.util.Shortcuts = new Shortcuts;
});
