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
define([
    'common/main/lib/component/Slider',
    'underscore'
], function (base, _) {
    'use strict';

    Common.UI.MultiSliderGradient = Common.UI.MultiSlider.extend({

        options : {
            width: 100,
            minValue: 0,
            maxValue: 100,
            values: [0, 100],
            colorValues: ['#000000', '#ffffff'],
            currentThumb: 0,
            includeSnap: true,
            intervalSnap: 5,
            thumbTemplate: '<div class="thumb" style="">' +
                            '<div class="thumb-top"><div class="thumb-top-inner"></div></div>' +
                            '<div class="thumb-bottom"><div class="thumb-bottom-inner"></div></div>' +
                            '</div>'
        },

        disabled: false,

        template    : _.template([
            '<div class="slider multi-slider-gradient">',
            '<div class="track"></div>',
            '<% _.each(items, function(item) { %>',
            '<%= thumbTemplate %>',
            '<% }); %>',
            '</div>'
        ].join('')),

        initialize : function(options) {
            this.styleStr = {};
            Common.UI.MultiSlider.prototype.initialize.call(this, options);
        },

        render : function(parentEl) {
            Common.UI.MultiSlider.prototype.render.call(this, parentEl);

            var me = this;
            me.trackEl = me.cmpEl.find('.track');

            for (var i=0; i<me.thumbs.length; i++) {
                me.thumbs[i].thumb.on('dblclick', null, function() {
                    me.trigger('thumbdblclick', me);
                });
                me.thumbs[i].thumbcolor = me.thumbs[i].thumb.find('> div');
                me.setColorValue(me.options.colorValues[i], i);
            }

            me.changeSliderStyle();
            me.changeGradientStyle();
            me.on('change', _.bind(me.changeGradientStyle, me));
        },

        setColorValue: function(color, index) {
            var ind = (index!==undefined) ? index : this.currentThumb;
            this.thumbs[ind].colorValue = color;
            this.thumbs[ind].thumbcolor.css('background-color', color);
            this.changeGradientStyle();
        },

        getColorValue: function(index) {
            var ind = (index!==undefined) ? index : this.currentThumb;
            return this.thumbs[ind].colorValue;
        },

        setValue: function(index, value) {
            Common.UI.MultiSlider.prototype.setValue.call(this, index, value);
            this.changeGradientStyle();
        },

        getColorValues: function() {
            var values = [];
            _.each (this.thumbs, function(thumb) {
                values.push(thumb.colorValue);
            });

            return values;
        },

        changeGradientStyle: function() {
            if (!this.rendered) return;
            var style;
            if (this.styleStr.specific) {
                style = Common.Utils.String.format(this.styleStr.specific, this.getColorValues().concat(this.getValues()));
                this.trackEl.css('background', style);
            }
            if (Common.Utils.isIE) {
                style = Common.Utils.String.format('progid:DXImageTransform.Microsoft.gradient( startColorstr={0}, endColorstr={1},GradientType=1 )',
                    this.getColorValue(0), this.getColorValue(this.thumbs.length-1));
                this.trackEl.css('filter', style);
            }
            if (this.styleStr.common) {
                style = Common.Utils.String.format(this.styleStr.common, this.getColorValues().concat(this.getValues()));
                this.trackEl.css('background', style);
            }
        },

        sortThumbs: function() {
            var recalc_indexes = Common.UI.MultiSlider.prototype.sortThumbs.call(this);
            this.trigger('sortthumbs', this, recalc_indexes);
            return recalc_indexes;
        },

        findLeftThumb: function(pos) {
            var me = this,
                leftThumb = 100,
                index = 0,
                len = this.thumbs.length,
                dist;

            for (var i=0; i<len; i++) {
                dist = pos - me.thumbs[i].position;
                if (dist > 0 && dist <= leftThumb) {
                    var above = me.thumbs[i + 1];
                    var below = me.thumbs[i - 1];

                    if (below !== undefined && pos < below.position) {
                        continue;
                    }
                    if (above !== undefined && pos > above.position) {
                        continue;
                    }
                    index = i;
                    leftThumb = dist;
                }
            }
            return index;
        },

        calculationNewColor: function(color1, color2, ratio) {
            var w1 = ratio ? ratio/100 : 0.5;
            var w2 = 1 - w1;
            var rgbColor1 = Common.Utils.ThemeColor.getRgbColor(color1),
                rgbColor2 = Common.Utils.ThemeColor.getRgbColor(color2);
            var rgb = [Math.round(rgbColor1.get_r() * w2 + rgbColor2.get_r() * w1),
                Math.round(rgbColor1.get_g() * w2 + rgbColor2.get_g() * w1),
                Math.round(rgbColor1.get_b() * w2 + rgbColor2.get_b() * w1)];
            return Common.Utils.ThemeColor.getHexColor(rgb[0], rgb[1], rgb[2]);
        },

        addThumb: function() {
            Common.UI.MultiSlider.prototype.addThumb.call(this);

            var me = this,
                index = me.thumbs.length-1;
            me.thumbs[index].thumb.on('dblclick', null, function() {
                me.trigger('thumbdblclick', me);
            });
            me.thumbs[index].thumbcolor = me.thumbs[index].thumb.find('> div');
            (index>0) && this.setColorValue(this.getColorValue(index-1), index);
            me.changeSliderStyle();
        },

        addNewThumb: function(index, pos, curIndex) {
            var me = this,
                indexLeftThumb = this.findLeftThumb(pos),
                index = index,
                color;
            if (!_.isUndefined(curIndex)) {
                this.addThumb();
                index = this.thumbs.length - 1;
                color = this.calculationNewColor(this.thumbs[indexLeftThumb].colorValue, this.thumbs[indexLeftThumb === index - 1 ? indexLeftThumb : indexLeftThumb + 1].colorValue);
                this.setThumbPosition(index, pos);
                var value = pos/this.delta + this.minValue;
                this.thumbs[index].value = value;
            } else {
                var ratio = (pos - this.thumbs[indexLeftThumb].value) * 100 / (this.thumbs[indexLeftThumb + 1].value - this.thumbs[indexLeftThumb].value);
                color = ratio < 0 ? this.thumbs[indexLeftThumb].colorValue : this.calculationNewColor(this.thumbs[indexLeftThumb].colorValue, this.thumbs[indexLeftThumb === index - 1 ? indexLeftThumb : indexLeftThumb + 1].colorValue, ratio);
            }
            me.thumbs[index].thumbcolor = me.thumbs[index].thumb.find('> div');
            (index>0) && this.setColorValue('#' + color, index);
            me.sortThumbs();
            me.changeSliderStyle();
            me.changeGradientStyle();

            return color;
        },

        removeThumb: function(index) {
            if (index===undefined) index = this.thumbs.length-1;
            if (this.thumbs.length > 2) {
                this.thumbs[index].thumb.remove();
                this.thumbs.splice(index, 1);
                this.sortThumbs();
                this.changeSliderStyle();
            }
        },

        changeSliderStyle: function() {
            this.styleStr = {
                specific: '',
                common: 'linear-gradient(to right'
            };

            if (Common.Utils.isChrome && Common.Utils.chromeVersion<10 || Common.Utils.isSafari && Common.Utils.safariVersion<5.1)
                this.styleStr.specific = '-webkit-gradient(linear, left top, right top';  /* Chrome,Safari4+ */
            else if (Common.Utils.isChrome || Common.Utils.isSafari)
                this.styleStr.specific = '-webkit-linear-gradient(left';
            else if (Common.Utils.isGecko)
                this.styleStr.specific = '-moz-linear-gradient(left';
            else if (Common.Utils.isOpera && Common.Utils.operaVersion>11.0)
                this.styleStr.specific = '-o-linear-gradient(left';
            else if (Common.Utils.isIE)
                this.styleStr.specific = '-ms-linear-gradient(left';

            for (var i=0; i<this.thumbs.length; i++) {
                this.styleStr.common += ', {' + i + '} {' + (this.thumbs.length + i) + '}%';
                if (Common.Utils.isChrome && Common.Utils.chromeVersion<10 || Common.Utils.isSafari && Common.Utils.safariVersion<5.1)
                    this.styleStr.specific += ', color-stop({' + (this.thumbs.length + i) + '}%,{' + i + '})';
                else
                    this.styleStr.specific += ', {' + i + '} {' + (this.thumbs.length + i) + '}%';

            }
            this.styleStr.specific += ')';
            this.styleStr.common += ')';
        }
    });
});
