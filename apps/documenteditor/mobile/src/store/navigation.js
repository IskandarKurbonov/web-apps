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

import {action, observable, makeObservable} from 'mobx';

export class storeNavigation { 
    constructor() {
        makeObservable(this, {
            bookmarks: observable,
            initBookmarks: action
        });
    }

    bookmarks = [];

    initBookmarks(bookmarks) {
        this.bookmarks = bookmarks;
    }
}