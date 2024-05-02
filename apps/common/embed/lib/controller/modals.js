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

+function () {
    !window.common && (window.common = {});
    !common.controller && (common.controller = {});

    common.controller.modals = new(function() {
        var $dlgShare, $dlgEmbed, $dlgPassword;
        var appConfig;
        var embedCode = '<iframe allowtransparency="true" frameborder="0" scrolling="no" src="{embed-url}" width="{width}" height="{height}"></iframe>',
            minEmbedWidth = 400,
            minEmbedHeight = 600;

        function copytext(el, event) {
            el.select();
            if ( !document.execCommand('copy') ) {
                window.alert('Browser\'s error! Use keyboard shortcut [Ctrl] + [C]');
            }
        }

        var createDlgShare = function () {
            $dlgShare = common.view.modals.create('share');

            var _encoded = encodeURIComponent(appConfig.shareUrl);
            var _mailto = 'mailto:?subject=I have shared a document with you: ' + appConfig.docTitle + '&body=I have shared a document with you: ' + _encoded;

            $dlgShare.find('#btn-copyshort').on('click', copytext.bind(this, $dlgShare.find('#id-short-url')));
            $dlgShare.find('.share-buttons > span').on('click', function(e){
                if ( window.config ) {
                    const key = $(e.target).attr('data-name');
                    const btn = config.btnsShare[key];
                    if ( btn && btn.getUrl ) {
                        window.open(btn.getUrl(appConfig.shareUrl, appConfig.docTitle), btn.target || '',
                            btn.features || 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');
                        return;
                    }
                }

                var _url;
                switch ($(e.target).attr('data-name')) {
                    case 'facebook':
                        _url = 'https://www.facebook.com/sharer/sharer.php?u=' + appConfig.shareUrl + '&t=' + encodeURI(appConfig.docTitle);
                        window.open(_url, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');
                        break;
                    case 'twitter':
                        _url = 'https://twitter.com/share?url='+ _encoded;
                        !!appConfig.docTitle && (_url += encodeURIComponent('&text=' + appConfig.docTitle));
                        window.open(_url, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');
                        break;
                    case 'email':
                        window.open(_mailto, '_self');
                        break;
                }
            });

            $dlgShare.find('#id-short-url').val(appConfig.shareUrl);
            $dlgShare.find('.share-buttons > #email.autotest').attr('data-test', _mailto);
        };

        var createDlgEmbed =function () {
            $dlgEmbed = common.view.modals.create('embed');

            var txtembed = $dlgEmbed.find('#txt-embed-url');
            txtembed.text(embedCode.replace('{embed-url}', appConfig.embedUrl).replace('{width}', minEmbedWidth).replace('{height}', minEmbedHeight));
            $dlgEmbed.find('#btn-copyembed').on('click', copytext.bind(this, txtembed));
            $dlgEmbed.find('#txt-embed-width, #txt-embed-height').on({
                'keypress': function(e){
                    if (e.keyCode == 13)
                        updateEmbedCode();
                }
                , 'focusout': function(e){
                    updateEmbedCode();
                }
            });
        };

        var createDlgPassword = function (submitCallback) {
            if(!$dlgPassword) {
                var submit = function() {
                    if (submitCallback) {
                        $dlgPassword.modal('hide');
                        $dlgPassword.find('#password-input').attr('disabled', true)
                        $dlgPassword.find('#password-btn').attr('disabled', true)
                        setTimeout(function() {
                            submitCallback($dlgPassword.find('#password-input').val())
                        }, 350);
                    }
                };
                $dlgPassword = common.view.modals.create('password');
                $dlgPassword.modal({backdrop: 'static', keyboard: false})  
                $dlgPassword.modal('show');
                $dlgPassword.find('#password-btn').on('click', function() {
                    submit();
                });
                $dlgPassword.find('#password-input').keyup(function(e){ 
                    if(e.key == "Enter") {
                        submit();
                    }
                });
            } else {
                $dlgPassword.modal('show');
                $dlgPassword.find('#password-input').attr('disabled', false).addClass('error').val('');
                $dlgPassword.find('#password-label-error').addClass('error');
                $dlgPassword.find('#password-btn').attr('disabled', false)
            }
            setTimeout(function() {
                $dlgPassword.find('#password-input').focus();
            }, 500);
        };

        function updateEmbedCode(){
            var $txtwidth = $dlgEmbed.find('#txt-embed-width');
            var $txtheight = $dlgEmbed.find('#txt-embed-height');
            var newWidth  = parseInt($txtwidth.val()),
                newHeight = parseInt($txtheight.val());

            if (newWidth < minEmbedWidth)
                newWidth = minEmbedWidth;

            if (newHeight < minEmbedHeight)
                newHeight = minEmbedHeight;

            $dlgEmbed.find('#txt-embed-url').text(embedCode.replace('{embed-url}', appConfig.embedUrl).replace('{width}', newWidth).replace('{height}', newHeight));

            $txtwidth.val(newWidth + 'px');
            $txtheight.val(newHeight + 'px');
        }

        var attachToView = function(config) {
            if ( config.share && !!appConfig.shareUrl ) {
                if ( !$dlgShare ) {
                    createDlgShare();
                }

                $(config.share).on('click', function(e){
                    $dlgShare.modal('show');
                });
            }

            if ( config.embed && !!appConfig.embedUrl ) {
                if ( !$dlgEmbed ) {
                    createDlgEmbed();
                }

                $(config.embed).on('click', function(e) {
                    $dlgEmbed.modal('show');
                })
            }
        };

        return {
            init: function(config) { appConfig = config; }, 
            attach: attachToView,
            createDlgPassword: createDlgPassword
        };
    });
}();