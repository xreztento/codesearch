/**
 * Created by xreztento@vip.sina.com on 2016/12/21.
 */
define(function (require, exports, module) {

    require("jquery");
    var Class = require("class");
    var Chart = require("chart");


    var GaugeChart = Class("GaugeChart", {
        Extends : Chart,
        STATIC: {
            MODULE_NAME : "GaugeChart"
        },
        /**
         *
         * @param width
         * @param height
         * @param xAxisItemNum x轴最大显示数
         */
        initialize : function(width, height) {
            GaugeChart.Super.call(this, width, height);
        },
        init : function(where){
            var statement = "<div></div>";
            this.element = GaugeChart.Super.prototype.init.call(this, where, statement);
            return this.element;
        },
        addGaugeSeries : function(name, dataValue, dataName, min, max, splitNumber, formatter){
            var name = name;
            var dataName = dataName;
            var dataValue = dataValue;
            var min = min || 0;
            var max = max || 100;
            var splitNumber = splitNumber || 10;
            var formatter = formatter || "{value}";
            if(!this.option.series){
                this.option.series = [];
            }
            this.option.series.push({
                name : name,
                type : "gauge",
                data : [{
                    value : dataValue,
                    name : dataName
                }],
                detail : {
                    formatter : formatter
                },
                min : min,
                max : max,
                splitNumber : splitNumber
            });
            return this;
        },
        point : function(dataValue){
            console.log(this.seriesDataStore);
            this.seriesDataStore[0][0] = dataValue;
            var series = this.flushSeries();
            this.chart.setOption({
                series : series
            });
        },
        getModuleName : function(){
            return GaugeChart.MODULE_NAME;
        }
    });

    module.exports = GaugeChart;
});



