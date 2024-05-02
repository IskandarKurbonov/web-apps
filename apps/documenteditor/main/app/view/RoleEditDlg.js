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
    'common/main/lib/component/InputField'
], function () { 'use strict';

    DE.Views.RoleEditDlg = Common.UI.Window.extend(_.extend({
        options: {
            width: 330,
            cls: 'modal-dlg',
            buttons: ['ok', 'cancel']
        },

        initialize : function(options) {
            _.extend(this.options, options || {});

            this.template = [
                '<div class="box">',
                    '<table cols="2" style="width: 100%;">',
                        '<tr>',
                            '<td class="padding-right-10" style="width: 50px;">',
                                '<label></label>',
                                '<div id="id-dlg-role-color" style="margin-bottom: 10px;"></div>',
                            '</td>',
                            '<td>',
                                '<label>' + this.textName + '</label>',
                                '<div id="id-dlg-role-name" class="input-row" style="margin-bottom: 10px; "></div>',
                            '</td>',
                        '</tr>',
                    '</table>',
                '</div>'
            ].join('');

            this.options.tpl = _.template(this.template)(this.options);
            this.props = this.options.props;
            this.colors = this.options.colors;
            this.lastColor = 'FFEFBF';
            this.oformManager = this.options.oformManager;

            Common.UI.Window.prototype.initialize.call(this, this.options);
        },

        render: function() {
            Common.UI.Window.prototype.render.call(this);

            var me = this;
            var $window = this.getChild();
            $window.find('.dlg-btn').on('click',     _.bind(this.onBtnClick, this));

            me.inputName = new Common.UI.InputField({
                el          : $window.find('#id-dlg-role-name'),
                allowBlank  : false,
                blankError  : me.textEmptyError,
                style       : 'width: 100%;',
                placeHolder: me.textNameEx,
                validateOnBlur: false,
                validation  : function(value) {
                    value = value.trim();
                    if (_.isEmpty(value))
                        return '';
                    if (!(me.props && value === me.props.name) && me.oformManager.asc_haveRole(value))
                        return me.errNameExists;
                    return true;
                }
            });

            this.btnColor = new Common.UI.ColorButton({
                parentEl: $window.find('#id-dlg-role-color'),
                additionalItems: [ this.mnuNoFormsColor = new Common.UI.MenuItem({
                                      id: 'id-dlg-role-menu-no-highlight',
                                      caption: this.textNoHighlight,
                                      checkable: true,
                                      style: Common.UI.isRTL() ? 'padding-right:20px;' : 'padding-left:20px;',
                                  }),
                                  {caption: '--'}],
                additionalAlign: this.menuAddAlign,
                colors: ['FEF8E5', 'FFEFBF', 'E2EFD8', 'C6E0B3', 'EDEDED', 'DBDBDB', 'CDD6E4', 'A2B2CA', 'F2F2F2', 'D9D9D9', 'DDEBF6', 'C2DDF2', 'FBECE2',
                        'F7D9C6', 'D6E3EE', 'B9CAE7', 'F2DADA', 'F2C2C2', 'F0DDF6', 'E5C2F2', 'E6FBD6', 'CDF7AC', 'EED6D6', 'E7B9B9', 'CCE1FF', '9AC4FF', 'E4CDDB', 'D9ADC7'],
                color: this.lastColor,
                themecolors: 0,
                effects: 0,
                colorHints: false,
                takeFocusOnClose: true
            });
            this.btnColor.on('color:select', _.bind(this.onColorsSelect, this));
            this.mnuNoFormsColor.on('click', _.bind(this.onNoColorClick, this));
            this.mnuColorPicker = this.btnColor.getPicker();

            this.afterRender();
        },

        afterRender: function() {
            this.setSettings(this.props);
            this.setTitle((this.options.isEdit) ? this.txtTitleEdit : this.txtTitleNew);
        },

        show: function() {
            Common.UI.Window.prototype.show.apply(this, arguments);
        },

        setSettings: function (props) {
            if (props) {
                var clr = props.color;
                this.mnuNoFormsColor.setChecked(!clr, true);
                this.mnuColorPicker.clearSelection();
                if (clr) {
                    this.mnuColorPicker.selectByRGB(clr, true);
                    this.lastColor = clr;
                }
                this.btnColor.setColor(clr || 'transparent');

                this.inputName.setValue(props.name || '');
            } else {
                var arr = _.difference(this.btnColor.options.colors, this.colors);
                if (arr.length>0) {
                    var i = Math.floor(Math.random() * arr.length);
                    this.lastColor = arr[i];
                    this.mnuColorPicker.selectByRGB(this.lastColor, true);
                    this.btnColor.setColor(this.lastColor);
                }
            }
        },

        getSettings: function() {
            return {name: this.inputName.getValue(), color: this.mnuNoFormsColor.isChecked() ? null : Common.Utils.ThemeColor.getRgbColor(this.lastColor)};
        },

        onColorsSelect: function(btn, color) {
            this.lastColor = color;
            this.mnuNoFormsColor.setChecked(false, true);
        },

        onNoColorClick: function(item) {
            if (!item.isChecked()) {
                this.btnColor.setColor(this.lastColor);
                this.mnuColorPicker.selectByRGB(this.lastColor, true);
            } else {
                this.btnColor.setColor('transparent');
                this.mnuColorPicker.clearSelection();
            }
        },

        onPrimary: function(event) {
            this._handleInput('ok');
            return false;
        },

        onBtnClick: function(event) {
            this._handleInput(event.currentTarget.attributes['result'].value);
        },

        getFocusedComponents: function() {
            return [this.btnColor, this.inputName].concat(this.getFooterButtons());
        },

        getDefaultFocusableComponent: function () {
            return this.inputName;
        },

        _handleInput: function(state) {
            if (this.options.handler) {
                if (state == 'ok') {
                    if (this.inputName.checkValidate() !== true)  {
                        this.inputName.cmpEl.find('input').focus();
                        return;
                    }
                }

                this.options.handler.call(this, state, (state == 'ok') ? this.getSettings() : undefined);
            }

            this.close();
        },
        txtTitleEdit: 'Edit Role',
        txtTitleNew: 'Create New Role',
        textName: 'Role name',
        textEmptyError: 'Role name must not be empty.',
        textNoHighlight: 'No highlighting',
        errNameExists: 'Role with such a name already exists.',
        textNameEx: 'Example: Applicant, Client, Sales Rep'
    }, DE.Views.RoleEditDlg || {}));
});