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

if (Common.UI === undefined) {
    Common.UI = {};
}

Common.UI.FocusManager = new(function() {
    var _tabindex = 1,
        _windows = [],
        _count = 0;

    var register = function(fields) {
        var arr = [];
        if (!fields.forEach) {
            fields = [fields];
        }
        fields.forEach(function(field) {
            if (field) {
                var item = {};
                if (field.cmp && typeof field.selector == 'string')
                    item = field;
                else {
                    item.cmp = field;
                    if (Common.UI.ListView && field instanceof Common.UI.ListView)
                        item.selector = '.listview';
                    else if (field instanceof Common.UI.CheckBox)
                        item.selector = '.checkbox-indeterminate';
                    else if (field instanceof Common.UI.RadioBox)
                        item.selector = '.radiobox';
                    else if (field instanceof Common.UI.TreeView)
                        item.selector = '.treeview';
                    else if (field instanceof Common.UI.Button)
                        item.selector = field.split ? '.btn-group' : 'button';
                    else
                        item.selector = '.form-control';
                }
                item.el = (item.cmp.$el || $(item.cmp.el || item.cmp)).find(item.selector).addBack().filter(item.selector);
                item.el && item.el.attr && (item.cmp.setTabIndex ? item.cmp.setTabIndex(_tabindex) : item.el.attr('tabindex', _tabindex.toString()));
                arr.push(item);
            }
        });
        return arr;
    };

    var addTraps = function(current) {
        if (!current || current.traps || !current.fields || current.fields.length<1) return;

        var trapFirst = $('<span aria-hidden="true" tabindex="' + _tabindex + '"></span>');
        trapFirst.on('focus', function() {
            if (current.hidden) return;
            var fields = current.fields;
            for (var i=fields.length-1; i>=0; i--) {
                var field = fields[i];
                if ((field.cmp.isVisible ? field.cmp.isVisible() : field.cmp.is(':visible')) && !(field.cmp.isDisabled && field.cmp.isDisabled())) {
                    var el = (field.selector) ? (field.cmp.$el || $(field.cmp.el || field.cmp)).find(field.selector).addBack().filter(field.selector) : field.el;
                    el && setTimeout(function(){ el.focus(); }, 10);
                    break;
                }
            }
        });
        current.parent.$window.prepend(trapFirst);

        var trapLast = $('<span aria-hidden="true" tabindex="' + (_tabindex+1) + '"></span>');
        trapLast.on('focus', function() {
            if (current.hidden) return;
            var fields = current.fields;
            for (var i=0; i<fields.length; i++) {
                var field = fields[i];
                if ((field.cmp.isVisible ? field.cmp.isVisible() : field.cmp.is(':visible')) && !(field.cmp.isDisabled && field.cmp.isDisabled())) {
                    var el = (field.selector) ? (field.cmp.$el || $(field.cmp.el || field.cmp)).find(field.selector).addBack().filter(field.selector) : field.el;
                    el && setTimeout(function(){ el.focus(); }, 10);
                    break;
                }
            }
        });
        current.parent.$window.append(trapLast);
        current.traps = [trapFirst, trapLast];
    };

    var updateTabIndexes = function(increment, winindex) {
        var step = increment ? 1 : -1;
        for (var cid in _windows) {
            if (_windows.hasOwnProperty(cid)) {
                var item = _windows[cid];
                if (item && item.index < winindex && item.traps)
                    item.traps[1].attr('tabindex', (parseInt(item.traps[1].attr('tabindex')) + step).toString());
                if (!increment && item && item.index > winindex) //change windows indexes when close one
                    item.index--;
            }
        }
    };

    var _insert = function(e, fields, index) { // index<0 - index from the end of array
        if (e && e.cid) {
            if (_windows[e.cid]) {
                var currfields = _windows[e.cid].fields || [];
                (index<0) && (index += currfields.length);
                _windows[e.cid].fields = (index===undefined) ? currfields.concat(register(fields))
                                                             : currfields.slice(0, index).concat(register(fields)).concat(currfields.slice(index));
            } else {
                _windows[e.cid] = {
                    parent: e,
                    fields: register(fields),
                    hidden: false,
                    index: _count++
                };
            }
            addTraps(_windows[e.cid]);
            return index || 0;
        }
    };

    var _add = function(e, fields) {
        _insert(e, fields);
    };

    var _remove = function(e, start, len) {
        if (e && e.cid && _windows[e.cid] && _windows[e.cid].fields && start!==undefined) {
            var removed = _windows[e.cid].fields.splice(start, len);
            removed && removed.forEach(function(item) {
                item.el && item.el.attr && (item.cmp.setTabIndex ? item.cmp.setTabIndex(-1) : item.el.attr('tabindex', "-1"));
            });
        }
    };

    var _init = function() {
        Common.NotificationCenter.on({
            'modal:show': function(e){
                if (e && e.cid) {
                    if (_windows[e.cid]) {
                        _windows[e.cid].hidden = false;
                    } else {
                        _windows[e.cid] = {
                            parent: e,
                            hidden: false,
                            index: _count++
                        };
                        updateTabIndexes(true, _windows[e.cid].index);
                    }
                }
            },
            'window:show': function(e){
                if (e && e.cid && _windows[e.cid] && !_windows[e.cid].fields) {
                    _windows[e.cid].fields = register(e.getFocusedComponents());
                    addTraps(_windows[e.cid]);
                }

                var el = e ? e.getDefaultFocusableComponent() : null;
                el && setTimeout(function(){ el.focus(); }, 100);
            },
            'modal:close': function(e, last) {
                if (e && e.cid && _windows[e.cid]) {
                    updateTabIndexes(false, _windows[e.cid].index);
                    delete _windows[e.cid];
                    _count--;
                }
            },
            'modal:hide': function(e, last) {
                if (e && e.cid && _windows[e.cid]) {
                    _windows[e.cid].hidden = true;
                }
            }
        });
    };

    return {
        init: _init,
        add: _add,
        insert: _insert,
        remove: _remove
    }
})();