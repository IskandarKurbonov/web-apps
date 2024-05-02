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

!window.common && (window.common = {});
!common.view && (common.view = {});
common.view.modals = new(function() {
    var tplDialog = '<div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="idm-title" aria-hidden="true">' +
                        '<div class="modal-dialog" role="document">' +
                            '<div class="modal-content">' +
                                '<div class="modal-header">' +
                                    '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
                                        '<span aria-hidden="true">&times;</span>' +
                                    '</button>' +
                                    '<h4 id="idm-title" class="modal-title">{title}</h4>'+
                                '</div>'+
                                '<div class="modal-body">{body}</div>'+
                                '<div class="modal-footer">{footer}</div>'+
                            '</div>' +
                        '</div>' +
                    '</div>';

    var _tplbody_share = '<div class="share-link">' +
                            '<input id="id-short-url" class="form-control" type="text" readonly/>' +
                        '</div>' +
                        '<div class="share-buttons">' +
                            '<span class="svg big-facebook" data-name="facebook"></span>' +
                            '<span class="svg big-twitter" data-name="twitter"></span>' +
                            '<span class="svg big-email" data-name="email"></span>' +
                            '<div class="autotest" id="email" style="display: none"></div>' +
                        '</div>';

    var _tplbody_embed = '<div class="size-manual">' +
                            '<span class="caption">{width}:</span>' +
                            '<input id="txt-embed-width" class="form-control input-xs" type="text" value="400px">' +
                            '<input id="txt-embed-height" class="form-control input-xs right" type="text" value="600px">' +
                            '<span class="right caption">{height}:</span>' +
                        '</div>' +
                        '<textarea id="txt-embed-url" rows="4" class="form-control" readonly></textarea>';
    
    var _tplbody_password =  '<div class="password-body">' +
                                '<label>{label}</label>' + 
                                '<input id="password-input" class="form-control" type="password"/>' +
                                '<label id="password-label-error">{error}</label>' + 
                                '{button}' + 
                            '</div>';

    return {
        create: function(name, parent) {
            !parent && (parent = 'body');

            var _$dlg;
            if (name == 'share') {
                if ( window.config && window.config.btnsShare ) {
                    let _btns = [];
                    for (const key of Object.keys(config.btnsShare))
                        _btns.push(`<span class="svg big-${key}" data-name="${key}"></span>`);

                    if ( _btns ) {
                        let $sharebox = $(_tplbody_share);
                        $sharebox.find('.autotest').prevAll().remove();
                        $sharebox.eq(1).prepend(_btns.join(''));

                        _tplbody_share = $("<div>").append($sharebox).html();
                    }
                }

                _$dlg = $(tplDialog
                            .replace(/\{title}/, this.txtShare)
                            .replace(/\{body}/, _tplbody_share)
                            .replace(/\{footer}/, '<button id="btn-copyshort" type="button" class="btn">' + this.txtCopy + '</button>'))
                                .appendTo(parent)
                                .attr('id', 'dlg-share');
            } else if (name == 'embed') {
                _$dlg = $(tplDialog
                            .replace(/\{title}/, this.txtEmbed)
                            .replace(/\{body}/, _tplbody_embed)
                            .replace(/\{width}/, this.txtWidth)
                            .replace(/\{height}/, this.txtHeight)
                            .replace(/\{footer}/, '<button id="btn-copyembed" type="button" class="btn">' + this.txtCopy + '</button>'))
                                .appendTo(parent)
                                .attr('id', 'dlg-embed');
            } else if(name == 'password') {
                _$dlg = $(tplDialog
                    .replace(/\{title}/, this.txtTitleProtected)
                    .replace(/\{body}/, _tplbody_password)
                    .replace(/\{label}/, this.txtOpenFile)
                    .replace(/\{error}/, this.txtIncorrectPwd)
                    .replace(/\{button}/, '<button id="password-btn" type="button" class="btn">OK</button>'))
                        .appendTo(parent)
                        .attr('id', 'dlg-password');

                _$dlg.find('button.close').remove();
                _$dlg.find('.modal-footer').remove();
            }

            return _$dlg;
        },
        txtWidth: 'Width',
        txtHeight: 'Height',
        txtShare: 'Share Link',
        txtCopy: 'Copy to clipboard',
        txtEmbed: 'Embed',
        txtTitleProtected: 'Protected file',
        txtOpenFile: 'Enter a password to open the file',
        txtIncorrectPwd: 'Password is incorrect',
    };
})();
