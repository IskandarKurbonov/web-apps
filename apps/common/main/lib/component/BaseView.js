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

define([
    'backbone'
], function (Backbone) {
    'use strict';

    Common.UI = _.extend(Common.UI || {}, {
        Keys : {
            BACKSPACE:  8,
            TAB:        9,
            RETURN:     13,
            SHIFT:      16,
            CTRL:       17,
            ALT:        18,
            ESC:        27,
            LEFT:       37,
            UP:         38,
            RIGHT:      39,
            DOWN:       40,
            DELETE:     46,
            HOME:       36,
            END:        35,
            SPACE:      32,
            PAGEUP:     33,
            PAGEDOWN:   34,
            INSERT:     45,
            ZERO:       48,
            EQUALITY_FF:61,
            NUM_ZERO:   96,
            NUM_PLUS:   107,
            NUM_MINUS:  109,
            F1:         112,
            F2:         113,
            F3:         114,
            F4:         115,
            F5:         116,
            F6:         117,
            F7:         118,
            F8:         119,
            F9:         120,
            F10:        121,
            F11:        122,
            F12:        123,
            MINUS_FF:   173,
            EQUALITY:   187,
            MINUS:      189
        },

        BaseView: Backbone.View.extend({
            isSuspendEvents: false,

            initialize : function(options) {
                this.options = this.options ? _({}).extend(this.options, options) : options;
            },

            setVisible: function(visible) {
                return this[visible ? 'show': 'hide']();
            },

            isVisible: function() {
                return $(this.el).is(":visible");
            },

            suspendEvents: function() {
                this.isSuspendEvents = true;
            },

            resumeEvents: function() {
                this.isSuspendEvents = false;
            }
        }),

        getId: function(prefix) {
            return _.uniqueId(prefix || "asc-gen");
        }
    });
});