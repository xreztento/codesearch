/**
 * Created by xreztento@vip.sina.com on 2016/12/21.
 */
define(function (require, exports, module) {

    require("jquery");
    var Class = require("class");
    var Chart = require("chart");


    var LineChart = Class("LineChart", {
        Extends : Chart,
        STATIC: {
            MODULE_NAME : "LineChart"
        },
        /**
         *
         * @param width
         * @param height
         * @param xAxisItemNum x轴最大显示数
         */
        initialize : function(width, height, xAxisItemNum) {
            LineChart.Super.call(this, width, height);
            this.xAxisItemNum = xAxisItemNum || 0;
        },
        init : function(where){
            var statement = "<div></div>";
            this.element = LineChart.Super.prototype.init.call(this, where, statement);
            return this.element;
        },
        addLineSeriesItem : function(name, data, symbol, smooth, step, markArea){
            var name = name;
            var data = data;
            var symbol = symbol || "none";
            var smooth = smooth || false;
            var step = step;
            var markArea = markArea || {};
            if(!this.option.series){
                this.option.series = [];
            }
            this.option.series.push({
                name : name,
                type : "line",
                data : data,
                symbol : symbol,
                smooth : smooth,
                step : step,
                markArea : markArea
            });
            return this;

        },
        /**
         * 打点并且绘制
         * @param xData
         * @param yData
         */
        dotAndPaint : function(xData, yData){

            var xAxisItemNum = this.xAxisItemNum;

            for(var i = 0,l = xData.length; i < l; i++){
                if(!this.xAxisDataStore[i]){
                    this.xAxisDataStore[i] = [];
                }
                if(this.xAxisDataStore[i].length == xAxisItemNum && xAxisItemNum !== 0){
                    this.xAxisDataStore[i].shift();
                }
                this.xAxisDataStore[i].push(xData[i]);

            }

            var xAxis = this.flushXAxis();


            for(var i = 0,l = yData.length; i < l; i++){
                if(!this.seriesDataStore[i]){
                    this.seriesDataStore[i] = [];
                }
                if(this.seriesDataStore[i].length == xAxisItemNum  && xAxisItemNum !== 0){
                    this.seriesDataStore[i].shift();
                }
                this.seriesDataStore[i].push(yData[i]);
            }

            var series = this.flushSeries();

            this.chart.setOption({
                xAxis : xAxis,
                series : series
            });

        },
        hideLineSeriesItem : function(index){
            this.hideSeriesStatus(index);
            var series = this._getSeriesByHiddenStatus();
            this.chart.setOption({
                series : series
            });

        },
        showLineSeriesItem : function(index){
            this.showSeriesStatus(index);
            var series = this._getSeriesByHiddenStatus();
            this.chart.setOption({
                series : series
            });
        },
        _getSeriesByHiddenStatus : function(){
            var series = [];
            for(var index in this.seriesStatus){
                if(this.seriesStatus.hasOwnProperty(index)){
                    if(this.seriesStatus[index].display === "show"){
                        series.push({
                            lineStyle : {
                                normal : {
                                    width : 2
                                }
                            },
                            showSymbol : true
                        });
                    } else {
                        series.push({
                            lineStyle : {
                                normal : {
                                    width : 0
                                }
                            },
                            showSymbol : false
                        });
                    }
                }
            }

            return series;
        },
        getModuleName : function(){
            return LineChart.MODULE_NAME;
        }
    });

    module.exports = LineChart;
});
