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

function doSearch(e) {
    if (e.keyCode == 13) {
        document.location.href = '../search/search.html?query=' + document.getElementById('search').value;
    }
}