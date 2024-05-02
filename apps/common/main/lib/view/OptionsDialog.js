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
    'common/main/lib/component/Window',
    'common/main/lib/component/RadioBox'
], function () { 'use strict';

    Common.Views.OptionsDialog = Common.UI.Window.extend(_.extend({
        options: {
            width: 214,
            header: true,
            style: 'min-width: 214px;',
            cls: 'modal-dlg',
            items: [],
            buttons: ['ok', 'cancel']
        },

        initialize : function(options) {
            _.extend(this.options, options || {});

            this.template = [
                '<div class="box">',
                '<% if (typeof label !== "undefined" && label !=="") { %>',
                    '<label style="margin-bottom: 10px;"><%= label %></label>',
                '<% } %>',
                '<% _.each(items, function(item, index) { %>',
                    '<% if (!item.id) item.id = Common.UI.getId(); %>',
                    '<div id="<%= item.id %>" style="margin-bottom: 10px;"></div>',
                '<% }) %>',
                '</div>'
            ].join('');

            this.options.tpl = _.template(this.template)(this.options);
            this.radio = [];

            Common.UI.Window.prototype.initialize.call(this, this.options);
        },

        render: function() {
            Common.UI.Window.prototype.render.call(this);

            var me = this,
                $window = me.getChild(),
                items = this.options.items,
                checked = true;
            this.checkedIndex = -1;
            if (items) {
                for (var i=0; i<items.length; i++) {
                    var item = items[i];
                    this.radio.push(new Common.UI.RadioBox({
                        el: $window.find('#' + item.id),
                        labelText: item.caption || '',
                        name: 'asc-radio-opt-dlg',
                        value: item.value,
                        disabled: !!item.disabled,
                        checked: checked && !item.disabled
                    }).on('change', function(field, newValue, eOpts) {
                        if (newValue) {
                            me.currentCell = field.options.value;
                        }
                    }));
                    if ((checked || item.checked)&& !item.disabled) {
                        checked = false;
                        this.checkedIndex = i;
                    }
                }
                if (this.checkedIndex>=0) {
                    this.radio[this.checkedIndex].setValue(true);
                    this.currentCell = this.radio[this.checkedIndex].options.value;
                }
            }
            $window.find('.dlg-btn').on('click', _.bind(this.onBtnClick, this));
        },

        getFocusedComponents: function() {
            return this.radio.concat(this.getFooterButtons());
        },

        getDefaultFocusableComponent: function () {
            return (this.checkedIndex>=0) ? this.radio[this.checkedIndex] : null;
        },

        _handleInput: function(state) {
            if (this.options.handler) {
                this.options.handler.call(this, this, state);
            }

            this.close();
        },

        onBtnClick: function(event) {
            this._handleInput(event.currentTarget.attributes['result'].value);
        },

        getSettings: function() {
            return this.currentCell;
        },

        onPrimary: function() {
            this._handleInput('ok');
            return false;
        }

    }, Common.Views.OptionsDialog || {}))
});