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

export class storeSpreadsheetInfo {
    constructor() {
        makeObservable(this, {
            dataDoc: observable,
            setDataDoc: action,
            changeTitle: action
        })
    }
    
    dataDoc;

    setDataDoc(obj) {
        this.dataDoc = obj;
    }

    changeTitle(title) {
        this.dataDoc.title = title;
    }
}