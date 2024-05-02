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
    'common/main/lib/component/BaseView'
], function () {
    'use strict';

    Common.UI.DimensionPicker = Common.UI.BaseView.extend((function(){
        return {
            options: {
                itemSize    : 20,
                minRows     : 5,
                minColumns  : 5,
                maxRows     : 20,
                maxColumns  : 20,
                direction   : undefined // 'left', 'right'
            },

            template:_.template([
                '<div style="width: 100%; height: 100%;">',
                    '<div dir="ltr" class="dimension-picker-status">0x0</div>',
                    '<div class="dimension-picker-observecontainer">',
                        '<div class="dimension-picker-mousecatcher"></div>',
                        '<div class="dimension-picker-unhighlighted"></div>',
                        '<div class="dimension-picker-highlighted"></div>',
                    '</div>',
                '</div>'
            ].join('')),

            initialize : function(options) {
                Common.UI.BaseView.prototype.initialize.call(this, options);

                var me = this;

                this.render();

                this.cmpEl = me.$el || $(this.el);

                var rootEl = this.cmpEl;

                me.itemSize    = me.options.itemSize;
                me.minRows     = me.options.minRows;
                me.minColumns  = me.options.minColumns;
                me.maxRows     = me.options.maxRows;
                me.maxColumns  = me.options.maxColumns;

                me.direction   = me.options.direction;
                if (Common.UI.isRTL() && !me.direction) {
                    me.direction = 'right';
                }

                me.curColumns = 0;
                me.curRows = 0;

                var onMouseMove = function(event){
                    var offsetX;
                    if (me.direction === 'right' && me.areaMouseCatcher) {
                        var width = me.areaMouseCatcher.width();
                        offsetX = event.offsetX === undefined ? (width - event.originalEvent.layerX) : (width - event.offsetX)*Common.Utils.zoom()
                    } else {
                        offsetX = event.offsetX === undefined ? event.originalEvent.layerX : event.offsetX*Common.Utils.zoom();
                    }
                    me.setTableSize(
                        Math.ceil(offsetX / me.itemSize),
                        Math.ceil((event.offsetY === undefined ? event.originalEvent.layerY : event.offsetY*Common.Utils.zoom()) / me.itemSize),
                        event
                    );
                };

                var onMouseLeave = function(event){
                    me.setTableSize(0, 0, event);
                };

                var onHighLightedMouseClick = function(e){
                    me.trigger('select', me, me.curColumns, me.curRows, e);
                };

                if (rootEl){
                    me.areaMouseCatcher    = rootEl.find('.dimension-picker-mousecatcher');
                    me.areaUnHighLighted   = rootEl.find('.dimension-picker-unhighlighted');
                    me.areaHighLighted     = rootEl.find('.dimension-picker-highlighted');
                    me.areaStatus          = rootEl.find('.dimension-picker-status');

                    rootEl.css({width: me.minColumns + 'em'});
                    me.areaMouseCatcher.css('z-index', 1);
                    me.areaMouseCatcher.width(me.maxColumns + 'em').height(me.maxRows + 'em');
                    me.areaUnHighLighted.width(me.minColumns + 'em').height(me.minRows + 'em');
                    me.areaStatus.html(!Common.UI.isRTL() ? this.curColumns + ' x ' + this.curRows : this.curRows + ' x ' + this.curColumns);
                    me.areaStatus.width(me.areaUnHighLighted.width());

                    me.areaMouseCatcher.on('mousemove', onMouseMove);
                    me.areaHighLighted.on('mousemove', onMouseMove);
                    me.areaUnHighLighted.on('mousemove', onMouseMove);
                    me.areaMouseCatcher.on('mouseleave', onMouseLeave);
                    me.areaHighLighted.on('mouseleave', onMouseLeave);
                    me.areaUnHighLighted.on('mouseleave', onMouseLeave);
                    me.areaMouseCatcher.on('click', onHighLightedMouseClick);
                    me.areaHighLighted.on('click', onHighLightedMouseClick);
                    me.areaUnHighLighted.on('click', onHighLightedMouseClick);

                    if (me.direction === 'right') {
                        me.areaHighLighted.css({left: 'auto', right: '0'});
                    }
                }
            },

            render: function() {
                (this.$el || $(this.el)).html(this.template());

                return this;
            },

            setTableSize: function(columns, rows, event){
                if (columns > this.maxColumns)  columns = this.maxColumns;
                if (rows > this.maxRows)        rows = this.maxRows;

                if (this.curColumns != columns || this.curRows != rows){
                    this.curColumns  = columns;
                    this.curRows     = rows;

                    this.areaHighLighted.width(this.curColumns + 'em').height(this.curRows + 'em');
                    this.areaUnHighLighted.width(
                        ((this.curColumns < this.minColumns)
                            ? this.minColumns
                            : ((this.curColumns + 1 > this.maxColumns)
                            ? this.maxColumns
                            : this.curColumns + 1)) + 'em'
                    ).height(((this.curRows < this.minRows)
                            ? this.minRows
                            : ((this.curRows + 1 > this.maxRows)
                            ? this.maxRows
                            : this.curRows + 1)) + 'em'
                    );

                    this.cmpEl.width(this.areaUnHighLighted.width());
                    this.areaStatus.html(!Common.UI.isRTL() ? this.curColumns + ' x ' + this.curRows : this.curRows + ' x ' + this.curColumns);
                    this.areaStatus.width(this.areaUnHighLighted.width());

                    this.trigger('change', this, this.curColumns, this.curRows, event);
                }
            },

            getColumnsCount: function() {
                return this.curColumns;
            },

            getRowsCount: function() {
                return this.curRows;
            }
        }
    })())
});
