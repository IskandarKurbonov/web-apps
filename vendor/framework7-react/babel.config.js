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

const config = {
  presets: [
    '@babel/preset-react',
    ['@babel/preset-env', {
      modules: false,
    }],
  ],
  plugins: [
    '@babel/plugin-transform-runtime',
    '@babel/plugin-syntax-dynamic-import',
    ['@babel/plugin-proposal-decorators', {'legacy': true }],
    ['@babel/plugin-proposal-class-properties',{'loose':false}],
  ],
};

export default config;