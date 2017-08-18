/**
 * Created by xreztento@vip.sina.com on 2016/12/21.
 */
define(function (require, exports, module) {

    require("jquery");
    var Class = require("class");
    var Chart = require("chart");


    var PieChart = Class("PieChart", {
        Extends : Chart,
        STATIC: {
            MODULE_NAME : "PieChart"
        },
        /**
         *
         * @param width
         * @param height
         * @param xAxisItemNum x轴最大显示数
         */
        initialize : function(width, height) {
            PieChart.Super.call(this, width, height);
        },
        init : function(where){
            var statement = "<div></div>";
            this.element = PieChart.Super.prototype.init.call(this, where, statement);
            return this.element;
        },
        setPieSeries : function(name, data, selectedMode, radius, legendHoverLink,
                                hoverAnimation, selectedOffset,
                                clockwise, startAngle, minAngle, roseType,
                                stillShowZeroSum, center){
            var name = name;
            var data = data || [];
            //this.pieDataIndex = {};
            //for(var i = 0,l = data.length; i < l; i++){
            //    this.pieDataIndex[data[i].name] = i;
            //}

            var legendHoverLink = legendHoverLink || true;
            var hoverAnimation = hoverAnimation || true;
            var selectedMode = selectedMode || false;
            var selectedOffset = selectedOffset || 10;
            var clockwise = clockwise || true;
            var startAngle = startAngle || 90;
            var minAngle = minAngle || 0;
            var roseType = roseType || false;
            var stillShowZeroSum = stillShowZeroSum || true;
            var center = center || ["50%", "50%"];
            var radius = radius || ["0%", "75%"];

            if(!this.option.series){
                this.option.series = [];
            }
            this.option.series[0] =
               {
                name : name,
                type : "pie",
                legendHoverLink : legendHoverLink,
                hoverAnimation : hoverAnimation,
                selectedMode : selectedMode,
                selectedOffset : selectedOffset,
                clockwise : clockwise,
                startAngle : startAngle,
                minAngle : minAngle,
                roseType : roseType,
                stillShowZeroSum : stillShowZeroSum,
                center : center,
                radius : radius,
                data : data
            };
            return this;
        },
        addPieData : function(name, value, selected){
            if(!this.option.legend){
                this.option.legend = {
                    x : "left",
                    orient : "vertical",
                    data : []
                }
            }

            if($.inArray(name, this.option.legend.data) === -1){
                this.option.legend.data.push(name);
                this.option.series[0].data.push({
                    name : name,
                    value : value,
                    selected : selected
                });
            }

            return this;
        },
        addPieDataAndPaint : function(name, value, selected){
            this.addPieData(name, value, selected);
            this.chart.setOption({
                legend: {
                    data: this.option.legend.data
                },
                series: this.option.series[0]
            });
        },
        updatePieDataAndPaint : function(name, value, selected){
            if(this._existsPieData(name) !== -1){
                var index = this._existsPieData(name);
                this.option.series[0].data[index] = {
                    name : name,
                    value : value,
                    selected : selected
                }
                this.chart.setOption({
                    series: this.option.series[0]
                });

            } else {
                this.addPieDataAndPaint(name, value, selected);
            }
            return this;
        },
        selectedByName : function(name){
            if(this._existsPieData(name) !== -1){
                var index = this._existsPieData(name);
                this.option.series[0].data[index].selected = true;
                this.chart.setOption({
                    series: this.option.series[0]
                });
            }
        },
        _existsPieData : function(name){
            for(var i = 0, l = this.option.series[0].data.length; i < l; i++){
                if(this.option.series[0].data[i].name === name){
                    return i;
                }
            }
            return -1;
        },
        getModuleName : function(){
            return PieChart.MODULE_NAME;
        }
    });

    module.exports = PieChart;
});

