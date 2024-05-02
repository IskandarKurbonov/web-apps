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

import i18n from 'i18next'
import {initReactI18next} from 'react-i18next'
import Fetch from 'i18next-fetch-backend'

i18n.use(initReactI18next)
    .use(Fetch)
    .init({
        lng: Common.Locale.currentLang,
        fallbackLng: Common.Locale.defaultLang,
        escapeValue: false,
        backend: {
            loadPath: './locale/{{lng}}.json'
        },
        interpolation: { escapeValue: false },
        react: {
            useSuspense: false,
        },
    });

export default i18n;