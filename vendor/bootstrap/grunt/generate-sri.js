#!/usr/bin/env node

'use strict';

//  Copyright 2017-2019 The Bootstrap Authors
//  Copyright 2017-2019 Twitter, Inc.
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

var crypto = require('crypto');
var fs = require('fs');
var path = require('path');
var replace = require('replace-in-file');

var configFile = path.join(__dirname, '../_config.yml');

// Array of objects which holds the files to generate SRI hashes for.
// `file` is the path from the root folder
// `configPropertyName` is the _config.yml variable's name of the file
var files = [
  {
    file: 'dist/css/bootstrap.min.css',
    configPropertyName: 'css_hash'
  },
  {
    file: 'dist/css/bootstrap-theme.min.css',
    configPropertyName: 'css_theme_hash'
  },
  {
    file: 'dist/js/bootstrap.min.js',
    configPropertyName: 'js_hash'
  }
];

files.forEach(function (file) {
  fs.readFile(file.file, 'utf8', function (err, data) {
    if (err) {
      throw err;
    }

    var algo = 'sha384';
    var hash = crypto.createHash(algo).update(data, 'utf8').digest('base64');
    var integrity = algo + '-' + hash;

    console.log(file.configPropertyName + ': ' + integrity);

    try {
      replace.sync({
        files: configFile,
        from: new RegExp('(\\s' + file.configPropertyName + ':\\s+"|\')(\\S+)("|\')'),
        to: '$1' + integrity + '$3'
      });
    } catch (error) {
      console.error('Error occurred:', error);
    }
  });
});
