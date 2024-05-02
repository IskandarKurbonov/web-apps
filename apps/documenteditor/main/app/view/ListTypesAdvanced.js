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
    'common/main/lib/component/Window'
], function () { 'use strict';

    DE.Views.ListTypesAdvanced = Common.UI.Window.extend(_.extend({

    options: {
        header: false,
        width: 250,
        cls: 'modal-dlg',
        buttons: ['ok', 'cancel']
    },

    template:   '<div class="box">' +
        '<div class="input-row">' +
            '<label><%= label %></label>' +
        '</div>' +
            '<div class="input-row" id="id-advanced-list-type">' +
        '</div>' +
        '</div>',

    initialize : function(options) {
        _.extend(this.options, options || {}, {
            label: this.labelSelect
        });
        this.options.tpl = _.template(this.template)(this.options);
        this.lang = this.options.lang;
        Common.UI.Window.prototype.initialize.call(this, this.options);
    },

    render: function() {
        Common.UI.Window.prototype.render.call(this);

        var $window = this.getChild();
        $window.find('.dlg-btn').on('click', _.bind(this.onBtnClick, this));

        var data = [];
        var me = this;
        Asc.c_oAscAllNumberingTypes && Asc.c_oAscAllNumberingTypes.forEach(function(item) {
            data.push( { displayValue: AscCommon.IntToNumberFormat(1, item, me.lang) + ', ' + AscCommon.IntToNumberFormat(2, item, me.lang) + ', ' + AscCommon.IntToNumberFormat(3, item, me.lang) + ',...', value: item });
        });

        this.cmbTypes = new Common.UI.ComboBox({
            el: $window.find('#id-advanced-list-type'),
            cls: 'input-group-nr',
            menuStyle: 'min-width: 100%; max-height: 190px;',
            data: data,
            editable: false,
            takeFocusOnClose: true,
            scrollAlwaysVisible: true
        });

        if (this.cmbTypes.scroller) this.cmbTypes.scroller.update({alwaysVisibleY: true});
        var rec = (this.options.current!==undefined) ? this.cmbTypes.store.findWhere({value: this.options.current}) : null;
        this.cmbTypes.setValue(rec ? rec.value : Asc.c_oAscNumberingFormat.Decimal);

        var me = this;
        setTimeout(function(){
            me.cmbTypes.focus();
        }, 100);
    },

    getFocusedComponents: function() {
        return [this.cmbTypes].concat(this.getFooterButtons());
    },

    getDefaultFocusableComponent: function () {
        return this.cmbTypes;
    },

    close: function(suppressevent) {
        var $window = this.getChild();
        if (!$window.find('.combobox.open').length) {
            Common.UI.Window.prototype.close.call(this, arguments);
        }
    },

    onBtnClick: function(event) {
        if (this.options.handler) {
            this.options.handler.call(this, event.currentTarget.attributes['result'].value, this.cmbTypes.getValue());
        }

        this.close();
    },

    onPrimary: function() {
        if (this.options.handler) {
            this.options.handler.call(this, 'ok', this.cmbTypes.getValue());
        }

        this.close();
        return false;
    },

    labelSelect     : 'Select list type'
    }, DE.Views.ListTypesAdvanced || {}))
});