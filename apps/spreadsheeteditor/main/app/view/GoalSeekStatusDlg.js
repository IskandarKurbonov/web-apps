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

define([
    'common/main/lib/util/utils',
    'common/main/lib/component/InputField',
    'common/main/lib/view/AdvancedSettingsWindow'
], function () { 'use strict';

    SSE.Views.GoalSeekStatusDlg = Common.Views.AdvancedSettingsWindow.extend(_.extend({
        options: {
            contentWidth: 330,
            separator: false,
            id: 'window-goal-seek-status'
        },

        initialize : function(options) {
            var me = this;

            _.extend(this.options, {
                title: this.textTitle,
                contentStyle: 'padding: 0 10px;',
                contentTemplate: _.template([
                    '<div class="settings-panel active">',
                        '<div class="inner-content">',
                                '<div class="row-1 padding-large" style="width: 100%;">',
                                        '<div class="cell-1">',
                                            '<label class="input-label" id="goal-seek-status-label">' + me.textSearchIteration + '</label>',
                                        '</div>',
                                        '<div class="cell-2">',
                                            '<div id="goal-seek-stop" class="padding-small"></div>',
                                            '<div id="goal-seek-pause"></div>',
                                        '</div>',
                                '</div>',
                                '<div class="row-2 padding-small">',
                                    '<div class="cell-1">',
                                        '<label class="input-label">' + me.textTargetValue + '</label>',
                                    '</div>',
                                    '<div class="cell-2">',
                                        '<div id="goal-seek-target-value"></div>',
                                    '</div>',
                                '</div>',
                                '<div class="row-2 padding-small">',
                                    '<div class="cell-1">',
                                        '<label class="input-label">' + me.textCurrentValue + '</label>',
                                    '</div>',
                                    '<div class="cell-2">',
                                        '<div id="goal-seek-current-value"></div>',
                                    '</div',
                                '</div>',
                            '</div></div>'
                ].join(''))({scope: this})
            }, options);

            this.api        = options.api;
            this.props      = options.props;

            this._state = {
                isPause: false,
                cellName: undefined
            }

            this.options.handler = function(result, value) {
                if (options.handler)
                    options.handler.call(this, result, value);
                return;
            };

            this.api.asc_registerCallback('asc_onGoalSeekStop',_.bind(this.onStopSelection, this));

            Common.Views.AdvancedSettingsWindow.prototype.initialize.call(this, this.options);
        },

        render: function() {
            Common.Views.AdvancedSettingsWindow.prototype.render.call(this);
            var me = this;

            this.$targetValue = $('#goal-seek-target-value');
            this.$currentValue = $('#goal-seek-current-value');
            this.$statusLabel = $('#goal-seek-status-label');

            this.btnStep = new Common.UI.Button({
                parentEl: $('#goal-seek-stop'),
                caption: this.textStep,
                cls: 'btn-text-default',
                disabled: true
            });
            this.btnStep.on('click', _.bind(this.onBtnStep, this));

            this.btnPause = new Common.UI.Button({
                parentEl: $('#goal-seek-pause'),
                caption: this.textPause,
                cls: 'btn-text-default'
            });
            this.btnPause.on('click', _.bind(this.onBtnPause, this));

            this.btnOk = _.find(this.getFooterButtons(), function (item) {
                return (item.$el && item.$el.find('.primary').addBack().filter('.primary').length>0);
            }) || new Common.UI.Button({ el: this.getChild().find('.primary') });
            this.btnOk.setDisabled(true);

            this.afterRender();
        },

        getFocusedComponents: function() {
            return [this.btnStep, this.btnPause].concat(this.getFooterButtons());
        },

        getDefaultFocusableComponent: function () {
            // if (this._alreadyRendered) return; // focus only at first show
            // this._alreadyRendered = true;
            return this.btnPause;
        },

        afterRender: function() {
            this._setDefaults(this.props);
        },

        _setDefaults: function (props) {
            var me = this;
        },

        setSettings: function (props) {
            if (props) {
                if (this._state.cellName === undefined)
                    this._state.cellName = props.cellName;
                this.$targetValue.text(props.targetValue);
                this.$currentValue.text(props.currentValue);
                this.$statusLabel.text(Common.Utils.String.format(this.textSearchIteration, props.cellName, props.iteration));
            }
        },

        onBtnPause: function () {
            this._state.isPause = !this._state.isPause;
            this.btnPause.setCaption(this._state.isPause ? this.textContinue : this.textPause);
            this.btnStep.setDisabled(!this._state.isPause);
            this._state.isPause ? this.api.asc_PauseGoalSeek() : this.api.asc_ContinueGoalSeek();
        },

        onBtnStep: function () {
            this.api.asc_StepGoalSeek();
        },

        onStopSelection: function (isFound) {
            this.btnPause.setDisabled(true);
            this.btnStep.setDisabled(true);
            this.btnOk.setDisabled(false);
            this.btnOk.focus();
            this.$statusLabel.text(Common.Utils.String.format(isFound ? this.textFoundSolution : this.textNotFoundSolution, this._state.cellName));
        },

        textTitle: 'Goal Seek Status',
        textFoundSolution: 'Goal Seeking with Cell {0} found a solution.',
        textNotFoundSolution: 'Goal Seeking with Cell {0} may not have found a solution.',
        textSearchIteration: 'Goal Seeking with Cell {0} on iteration #{1}.',
        textTargetValue: 'Target value:',
        textCurrentValue: 'Current value:',
        textStep: 'Step',
        textPause: 'Pause',
        textContinue: 'Continue'
    }, SSE.Views.GoalSeekStatusDlg || {}))
});