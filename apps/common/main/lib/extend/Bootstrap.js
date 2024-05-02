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

function onDropDownKeyDown(e) {
    var $this       = $(this),
        $parent     = $this.parent(),
        beforeEvent = jQuery.Event('keydown.before.bs.dropdown', {keyCode: e.keyCode}),
        afterEvent  = jQuery.Event('keydown.after.bs.dropdown', {keyCode: e.keyCode});

    $parent.trigger(beforeEvent);

    if ($parent.hasClass('no-stop-propagate')) {
        if (arguments.length>1 && arguments[1] instanceof KeyboardEvent)
            e = arguments[1];
        if ( /^(38|40|27|13|9|37|39)$/.test(e.keyCode) && !e.ctrlKey && !e.altKey) {
            patchDropDownKeyDownAdditional.call(this, e);
            if (!/(37|39)/.test(e.keyCode)) {
                e.preventDefault();
                e.stopPropagation();
            }
        }
    } else if ($this.hasClass('move-focus')) {
        if (!((/^(13|9|32)/.test(e.keyCode) || e.keyCode===27 && !$parent.hasClass('open')) && !e.ctrlKey && !e.altKey)) {
            patchDropDownKeyDown.call(this, e);
            e.preventDefault();
            e.stopPropagation();
        }
    } else {
        patchDropDownKeyDown.call(this, e);
        e.preventDefault();
        e.stopPropagation();
    }

    $parent.trigger(afterEvent);
}

function checkFocusedItem(cmp, item) {
    var innerHeight = cmp.innerHeight(),
        padding = (innerHeight - cmp.height())/2,
        pos = item.position().top,
        itemHeight = item.outerHeight();
    if (pos<0)
        cmp.scrollTop(cmp.scrollTop() + pos - padding);
    else if (pos+itemHeight>innerHeight)
        cmp.scrollTop(cmp.scrollTop() + pos + itemHeight - innerHeight + padding);
}

function patchDropDownKeyDown(e) {
    if (!/(38|40|27|37|39)/.test(e.keyCode)) return;

    var $this = $(this);

    e.preventDefault();
    e.stopPropagation();

    if ($this.is('.disabled, :disabled')) return;

    var $parent  = getParent($this);
    var isActive = $parent.hasClass('open') || $parent.hasClass('over');

    if (!isActive || (isActive && e.keyCode == 27)) {
        if (e.which == 27) {
            $items = $('[role=menu] li.dropdown-submenu.over:visible', $parent);
            if ($items.length) {
                $items.eq($items.length-1).removeClass('over');
                return false;
            } else if ($parent.hasClass('dropdown-submenu') && $parent.hasClass('over')) {
                $parent.removeClass('over');
                $parent.find('> a').focus();
            } else {
                $parent.find('[data-toggle=dropdown]').focus();
            }
        }
        return (isActive) ? $this.click() : undefined;
    }

//    var $items = $('[role=menu] li:not(.divider):visible a', $parent)   - original search function
    var $items = $('> [role=menu] > li:not(.divider):not(.disabled):visible', $parent).find('> a');

    if (!$items.length) return;

    var index = $items.index($items.filter(':focus'));
    if (e.keyCode == 39) {     // right
        if (index<0) return;

        var li = $items.eq(index).parent();
        if (li.hasClass('dropdown-submenu') && !li.hasClass('over')) {// open submenu and select first <li> item
            li.mouseenter();
            li.addClass('focused-submenu');
             _.delay(function() {
                 var mnu = $('> [role=menu]', li),
                    $subitems = mnu.find('> li:not(.divider):not(.disabled):visible > a'),
                    $dataviews = mnu.find('> li:not(.divider):not(.disabled):visible .dataview'),
                    $palette = mnu.find('> li:not(.divider):not(.disabled):visible .theme-colorpalette.focused'),
                    $internal_menu = mnu.find('> li:not(.divider):not(.disabled):visible ul.internal-menu');
                if ($subitems.length>0 && $dataviews.length<1 && $internal_menu.length<1 && $palette.length<1)
                    ($subitems.index($subitems.filter(':focus'))<0) && $subitems.eq(0).focus();
            }, 250);
        }
    } else if (e.keyCode == 37) {     // left
        if ($parent.hasClass('dropdown-submenu') && $parent.hasClass('over')) { // close submenu
            $parent.removeClass('over');
            $parent.find('> a').focus();
        }
    } else {
        if (e.keyCode == 38) { index > 0 ? index-- : ($this.hasClass('no-cyclic') ? (index = 0) : (index = $items.length - 1));} else         // up
        if (e.keyCode == 40) { index < $items.length - 1 ? index++ : ($this.hasClass('no-cyclic') ? (index = $items.length - 1) : (index = 0));}              // down
        if (!~index) index=0;
        if ($parent.hasClass('dropdown-submenu') && $parent.hasClass('over'))
            $parent.addClass('focused-submenu'); // for Safari. When focus go from parent menuItem to it's submenu don't hide this submenu


        checkFocusedItem($this, $items.eq(index));
        $items.eq(index).focus();
    }
}

function patchDropDownKeyDownAdditional(e) { // only for formula menu when typing in cell editor
    if (!/(38|40|27|37|39)/.test(e.keyCode)) return;

    var $this = $(this);

    if (!/(37|39)/.test(e.keyCode)) {
        e.preventDefault();
        e.stopPropagation();
    }

    if ($this.is('.disabled, :disabled')) return;

    var $parent  = getParent($this);
    var isActive = $parent.hasClass('open') || $parent.hasClass('over');

    if (!isActive || (isActive && (e.keyCode == 27 || e.keyCode == 37 || e.keyCode == 39))) {
//        if (e.which == 27)
//            $parent.find('[data-toggle=dropdown]').focus();
        return (isActive) ? $this.click() : undefined;
    }

    var $items = $('> [role=menu] > li:not(.divider):not(.disabled):visible', $parent).find('> a');

    if (!$items.length) return;

    var index = $items.index($items.filter('.focus')),
        previndex = index;
    if (e.keyCode == 38) { index > 0 ? index-- : ($this.hasClass('no-cyclic') ? (index = 0) : (index = $items.length - 1));} else         // up
    if (e.keyCode == 40) { index < $items.length - 1 ? index++ : ($this.hasClass('no-cyclic') ? (index = $items.length - 1) : (index = 0));}              // down
    if (!~index) index=0;

    $items.removeClass('focus');
    $items.eq(index).addClass('focus');

    if (previndex !== index) {
        var tip = $items.eq(previndex).parent().data('bs.tooltip');
        if (tip) {
            tip.hide();
        }
        tip = $items.eq(index).parent().data('bs.tooltip');
        if (tip) {
            tip.show();
        }
    }
}

function getParent($this) {
    var selector = $this.attr('data-target');

    if (!selector) {
        selector = $this.attr('href');
        selector = selector && /#/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, ''); //strip for ie7
    }

    var $parent = selector && $(selector);

    return $parent && $parent.length ? $parent : $this.parent();
}

function clearMenus(isFromInputControl) {
    $('.dropdown-toggle').each(function (e) {
        var $parent = ($(this)).parent();
        if (!$parent.hasClass('open')) return;
        if ($parent.attr('data-value') == 'prevent-canvas-click') {
            $parent.attr('data-value','');
            return;
        }
        $parent.trigger(e = $.Event('hide.bs.dropdown'));
        if (e.isDefaultPrevented()) return;
        $parent.removeClass('open').trigger('hidden.bs.dropdown', isFromInputControl);
    })
}

function toggle() {
    $('.dropdown-backdrop').remove();
}

$(document)
    .off('keydown.bs.dropdown.data-api')
    .on('keydown.bs.dropdown.data-api', '[data-toggle=dropdown], [role=menu]' , onDropDownKeyDown);

('ontouchstart' in document.documentElement) && $(document).on('click.bs.dropdown.data-api', '[data-toggle=dropdown]', toggle);
/*
*      workaround closing menu by right click
* */
(function () {
    var eventsObj = $._data($(document).get(0), "events"), clickDefHandler;
    if (eventsObj && eventsObj.click) {
        eventsObj.click.every(function(e, i, a){
            if (/click/.test(e.type) && !e.selector && /bs\..+\.dropdown/.test(e.namespace)) {
                clickDefHandler = e.handler;
            }

            return !clickDefHandler;
        });
    }

    function onDropDownClick(e) {
        if (e.which == 1 || e.which == undefined)
            clearMenus(/form-control/.test(e.target.className));
    }

    if (!!clickDefHandler) {
        $(document)
            .off('click.bs.dropdown.data-api', clickDefHandler)
            .on('click.bs.dropdown.data-api', onDropDownClick);
    }
})();
/*
* */