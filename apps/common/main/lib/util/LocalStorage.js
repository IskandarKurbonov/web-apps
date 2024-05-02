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

define(['gateway'], function () {
    Common.localStorage = new (function() {
        var _storeName, _filter;
        var _store = {};

        var ongetstore = function(data) {
            if (data.type == 'localstorage') {
                _store = data.keys;
            }
        };

        Common.Gateway.on('internalcommand', ongetstore);

        var _refresh = function() {
            // if (!_lsAllowed)
            //     Common.Gateway.internalMessage('localstorage', {cmd:'get', keys:_filter});
        };

        var _save = function() {
            // if (!_lsAllowed)
            //     Common.Gateway.internalMessage('localstorage', {cmd:'set', keys:_store});
        };

        var _setItem = function(name, value, just) {
            if (_lsAllowed) {
                try
                {
                    localStorage.setItem(name, value);
                }
                catch (error){}

            } else {
                _store[name] = value;

                // if (just===true) {
                    // TDDO: remove after ver 7.2. using external local storage is depricated
                    // Common.Gateway.internalMessage('localstorage', {
                    //     cmd:'set',
                    //     keys: {
                    //         name: value
                    //     }
                    // });
                // }
            }
        };

        var _setItemAsBool = function(name, value, just) {
            _setItem(name, value ? 1 : 0, just);
        };

        var _getItem = function(name) {
            if (_lsAllowed)
                return localStorage.getItem(name);
            else
                return _store[name]===undefined ? null : _store[name];
        };

        var _getItemAsBool = function (name, defValue) {
            var value = _getItem(name);
            defValue = defValue || false;
            return (value!==null) ? (parseInt(value) != 0) : defValue;
        };

        var _getItemExists = function (name) {
            var value = _getItem(name);
            return value !== null;
        };

        var _removeItem = function(name) {
            if (_lsAllowed)
                localStorage.removeItem(name);
            else
                delete _store[name];
        };

        try {
            var _lsAllowed = !!window.localStorage;
        } catch (e) {
            _lsAllowed = false;
        }

        return {
            getId: function() {
                return _storeName;
            },
            setId: function(name) {
                _storeName = name;
            },
            getItem: _getItem,
            getBool: _getItemAsBool,
            setBool: _setItemAsBool,
            setItem: _setItem,
            removeItem: _removeItem,
            setKeysFilter: function(value) {
                _filter = value;
            },
            getKeysFilter: function() {
                return _filter;
            },
            itemExists: _getItemExists,
            sync: _refresh,
            save: _save
        };
    })();
});
