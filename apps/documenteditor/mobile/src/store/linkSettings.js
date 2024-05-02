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

export class storeLinkSettings {
    constructor() {
        makeObservable(this, {
            canAddLink: observable,
            canAddHyperlink: action
        });
    }

    canAddLink;

    canAddHyperlink (value) {
        this.canAddLink = value;
    }
}
