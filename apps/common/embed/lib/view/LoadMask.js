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

common.view.LoadMask = function(owner) {
    var tpl = '<div class="asc-loadmask-body" role="presentation" tabindex="-1">' +
                '<i id="loadmask-spinner" class="asc-loadmask-image"></i>' +
                '<div class="asc-loadmask-title"></div>' +
               '</div>';
    var ownerEl = owner || $(document.body),
        loaderEl,
        maskedEl,
        title = '',
        timerId = 0,
        rendered = false;
    return {

        show: function(){
            if (!loaderEl || !maskedEl) {
                loaderEl = $(tpl);
                maskedEl = $('<div class="asc-loadmask"></div>');
            }

            $('.asc-loadmask-title', loaderEl).html(title);

            // show mask after 500 ms if it wont be hided
            if (!rendered) {
                rendered = true;
                timerId = setTimeout(function () {
                    ownerEl.append(maskedEl);
                    ownerEl.append(loaderEl);

                    loaderEl.css('min-width', $('.asc-loadmask-title', loaderEl).width() + 108);
                },500);
            }
        },

        hide: function() {
            if (timerId) {
                clearTimeout(timerId);
                timerId = 0;
            }
            maskedEl && maskedEl.remove();
            loaderEl && loaderEl.remove();
            maskedEl = loaderEl = null;
            rendered = false;
        },

        setTitle: function(text) {
            title = text;

            if (ownerEl && loaderEl){
                var el = $('.asc-loadmask-title', loaderEl);
                el.html(title);
                loaderEl.css('min-width', el.width() + 108);
            }
        }
    }
};

