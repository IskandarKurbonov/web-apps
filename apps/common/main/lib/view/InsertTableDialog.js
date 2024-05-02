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
    'common/main/lib/component/Window'
], function () { 'use strict';

    Common.Views.InsertTableDialog = Common.UI.Window.extend(_.extend({
        options: {
            width: 230,
            style: 'min-width: 230px;',
            cls: 'modal-dlg',
            id: 'window-insert-table',
            split: false,
            buttons: ['ok', 'cancel']
        },

        initialize : function(options) {
            _.extend(this.options, {
                title: (options.split) ? this.txtTitleSplit : this.txtTitle
            }, options || {});

            this.template = [
                '<div class="box">',
                    '<div class="input-row">',
                        '<label class="text columns-text" style="width: 130px;">' + this.txtColumns + '</label><div class="columns-val float-right"></div>',
                    '</div>',
                    '<div class="input-row" style="margin-top: 10px;">',
                        '<label class="text rows-text" style="width: 130px;">' + this.txtRows + '</label><div class="rows-val float-right"></div>',
                    '</div>',
                '</div>'
            ].join('');

            this.options.tpl = _.template(this.template)(this.options);

            Common.UI.Window.prototype.initialize.call(this, this.options);
        },

        render: function() {
            Common.UI.Window.prototype.render.call(this);

            var $window = this.getChild();
            $window.find('.dlg-btn').on('click', _.bind(this.onBtnClick, this));

            this.udColumns = new Common.UI.MetricSpinner({
                el          : $window.find('.columns-val'),
                step        : 1,
                width       : 64,
                value       : 2,
                defaultUnit : '',
                maxValue    : 63,
                minValue    : 1,
                allowDecimal: false
            });

            this.udRows = new Common.UI.MetricSpinner({
                el          : $window.find('.rows-val'),
                step        : 1,
                width       : 64,
                value       : 2,
                defaultUnit : '',
                maxValue    : 100,
                minValue    : 1,
                allowDecimal: false
            });
//            this.udColumns.on('entervalue', _.bind(this.onPrimary, this));
//            this.udRows.on('entervalue', _.bind(this.onPrimary, this));
        },

        getFocusedComponents: function() {
            return [this.udColumns, this.udRows].concat(this.getFooterButtons());
        },

        getDefaultFocusableComponent: function () {
            return this.udColumns;
        },

        onBtnClick: function(event) {
            if (this.options.handler) {
                this.options.handler.call(this, event.currentTarget.attributes['result'].value, {
                    columns : this.udColumns.getNumberValue(),
                    rows    : this.udRows.getNumberValue()
                });
            }

            this.close();
        },

        onPrimary: function() {
            if (this.options.handler) {
                this.options.handler.call(this, 'ok', {
                    columns : this.udColumns.getNumberValue(),
                    rows    : this.udRows.getNumberValue()
                });
            }

            this.close();
            return false;
        },

        txtTitle: 'Table Size',
        txtTitleSplit: 'Split Cell',
        txtColumns: 'Number of Columns',
        txtRows: 'Number of Rows',
        textInvalidRowsCols: 'You need to specify valid rows and columns count.',
        txtMinText: 'The minimum value for this field is {0}',
        txtMaxText: 'The maximum value for this field is {0}'
    }, Common.Views.InsertTableDialog || {}))
});