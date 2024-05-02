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

/**
 * User: Julia.Radzhabova
 * Date: 15.04.15
 * Time: 16:47
 */

define([    'text!documenteditor/main/app/template/MailMergeEmailDlg.template',
    'common/main/lib/view/AdvancedSettingsWindow',
    'common/main/lib/component/ComboBox',
    'common/main/lib/component/InputField'
], function (contentTemplate) {
    'use strict';

    DE.Views.MailMergeEmailDlg = Common.Views.AdvancedSettingsWindow.extend(_.extend({
        options: {
            alias: 'MailMergeEmail',
            contentWidth: 500
        },

        initialize : function(options) {
            _.extend(this.options, {
                title: this.textTitle,
                contentStyle: 'padding: 0;',
                contentTemplate: _.template(contentTemplate)({scope: this})
            }, options);
            Common.Views.AdvancedSettingsWindow.prototype.initialize.call(this, this.options);
        },

        render: function() {
            Common.Views.AdvancedSettingsWindow.prototype.render.call(this);
            var me = this;

            this._arrFrom = [
            ];
            this.cmbFrom = new Common.UI.ComboBox({
                el: $('#merge-email-dlg-from'),
                cls: 'input-group-nr',
                menuStyle: 'min-width: 100%;',
                editable: false,
                takeFocusOnClose: true,
                data: this._arrFrom
            });

            this._arrTo = [
            ];
            this.cmbTo = new Common.UI.ComboBox({
                el: $('#merge-email-dlg-to'),
                cls: 'input-group-nr',
                menuStyle: 'min-width: 100%;',
                editable: false,
                takeFocusOnClose: true,
                data: this._arrTo
            });

            this.inputSubject = new Common.UI.InputField({
                el          : $('#merge-email-dlg-subject'),
                allowBlank  : true,
                validateOnBlur: false,
                placeHolder: this.subjectPlaceholder,
                style       : 'width: 100%;'
            });

            this._arrFormat = [
                {displayValue: this.textHTML,  value: Asc.c_oAscFileType.HTML},
                {displayValue: this.textAttachDocx,value: Asc.c_oAscFileType.DOCX},
                {displayValue: this.textAttachPdf,value: Asc.c_oAscFileType.PDF}
            ];
            this.cmbFormat = new Common.UI.ComboBox({
                el: $('#merge-email-dlg-format'),
                cls: 'input-group-nr',
                menuStyle: 'min-width: 100%;',
                editable: false,
                takeFocusOnClose: true,
                data: this._arrFormat
            });
            this.cmbFormat.setValue(Asc.c_oAscFileType.HTML);
            this.cmbFormat.on('selected', _.bind(this.onCmbFormatSelect, this));

            this.inputFileName = new Common.UI.InputField({
                el          : $('#merge-email-dlg-filename'),
                allowBlank  : true,
                validateOnBlur: false,
                disabled: true,
                placeHolder: this.filePlaceholder,
                style       : 'width: 100%;'
            });

            this.textareaMessage = this.$window.find('textarea');

            this.lblFileName = $('#merge-email-dlg-lbl-filename');

            this.lblMessage = $('#merge-email-dlg-lbl-message');

            this._eventfunc = function(msg) {
                me._onWindowMessage(msg);
            };
//            this._bindWindowEvents.call(this);
//            this.on('close', function(obj){
//                me._unbindWindowEvents();
//            });

            this.mergeProps = this.options.props;
            this.mergedFileUrl = this.options.mergedFileUrl || '';

            this.afterRender();
        },

        getFocusedComponents: function() {
            return [this.cmbFrom, this.cmbTo, this.inputSubject, this.cmbFormat, this.inputFileName, this.textareaMessage].concat(this.getFooterButtons());
        },

        getDefaultFocusableComponent: function () {
            return this.cmbFrom;
        },

        _bindWindowEvents: function() {
            if (window.addEventListener) {
                window.addEventListener("message", this._eventfunc, false)
            } else if (window.attachEvent) {
                window.attachEvent("onmessage", this._eventfunc);
            }
        },

        _unbindWindowEvents: function() {
            if (window.removeEventListener) {
                window.removeEventListener("message", this._eventfunc)
            } else if (window.detachEvent) {
                window.detachEvent("onmessage", this._eventfunc);
            }
        },

        _onWindowMessage: function(msg) {
            // TODO: check message origin
            if (msg && window.JSON) {
                try {
                    this._onMessage.call(this, window.JSON.parse(msg.data));
                } catch(e) {}
            }
        },

        _onMessage: function(msg) {
            if (msg && msg.Referer == "onlyoffice") {
//                if ( !_.isEmpty(msg.folder) ) {
//                    this.trigger('saveasfolder', this, msg.folder); // save last folder url
//                }
            }
        },

        afterRender: function() {
            this._setDefaults(this.mergeProps);
        },

        getSettings: function() {
            var filename = this.inputFileName.getValue(),
                mailformat = this.cmbFormat.getValue();
            if (mailformat!==Asc.c_oAscFileType.HTML) {
                if (_.isEmpty(filename)) filename = 'attach';
                var idx = filename.lastIndexOf('.'),
                    ext = (idx>0) ? filename.substring(idx, filename.length).toLowerCase() : '';
                if (mailformat==Asc.c_oAscFileType.PDF && ext!=='.pdf')
                    filename += '.pdf';
                else if (mailformat==Asc.c_oAscFileType.DOCX && ext!=='.docx')
                    filename += '.docx';
            }

            return {
                from: this.cmbFrom.getValue(),
                to: this.cmbTo.getValue(),
                subject: this.inputSubject.getValue(),
                mailFormat: mailformat,
                fileName: filename,
                message: this.textareaMessage.val()
            };
        },

        _setDefaults: function(props) {
            if (props ){
                if (props.fieldsList) {
                    var arr = [];
                    _.each(props.fieldsList, function(field, index) {
                        arr.push({displayValue: '<' + field + '>',    value: field});
                    });
                    this.cmbTo.setData(arr);
                    if (arr.length>0)
                        this.cmbTo.setValue(arr[0].value);
                }

                if (props.emailAddresses) {
                    var arr = [];
                    _.each(props.emailAddresses, function(field, index) {
                        arr.push({displayValue: field,    value: field});
                    });
                    this.cmbFrom.setData(arr);
                    if (arr.length>0)
                        this.cmbFrom.setValue(arr[0].value);
                }
            }
        },

        onPrimary: function() {
            return true;
        },

        onDlgBtnClick: function(event) {
            var me = this;
            var state = event.currentTarget.attributes['result'].value;
            if (state == 'ok') {
//                _.delay(function() {
//                    Common.Gateway.sendMergedUrl(me.mergedFileUrl);
//                }, 10);
                this.handler && this.handler.call(this, state,  (state == 'ok') ? this.getSettings() : undefined);
            }
            this.close();
        },

        onCmbFormatSelect: function(combo, record) {
            var attachDisable = (record.value == Asc.c_oAscFileType.HTML);
            this.inputFileName.setDisabled(attachDisable);
            this.lblFileName.toggleClass('disabled', attachDisable);
            (attachDisable) ? this.textareaMessage.attr('disabled', 'disabled') : this.textareaMessage.removeAttr('disabled');
            this.textareaMessage.toggleClass('disabled', attachDisable);
            this.lblMessage.toggleClass('disabled', attachDisable);
        },

        textTitle:          'Send to E-mail',
        textFrom:           'From',
        textTo:             'To',
        textSubject:        'Subject Line',
        textFormat:         'Mail format',
        textFileName:       'File name',
        textMessage:        'Message',
        textHTML:           'HTML',
        textAttachDocx:     'Attach as DOCX',
        textAttachPdf:      'Attach as PDF',
        subjectPlaceholder: 'Theme',
        filePlaceholder:    'PDF',
        textWarning:        'Warning!',
        textWarningMsg:     'Please note that mailing cannot be stopped once your click the \'Send\' button.'

    }, DE.Views.MailMergeEmailDlg || {}));
});
