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

export class storePalette {
    constructor() {
        makeObservable(this, {
            customColors: observable,
            changeCustomColors: action
        });
    }
    
    customColors = [];

    changeCustomColors (colors) {
        this.customColors = colors;
    }
}