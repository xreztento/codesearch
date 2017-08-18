/**
 * Created by xreztento@vip.sina.com on 2016/12/21.
 */
define(function (require, exports, module) {

    require("jquery");
    var Class = require("class");
    var Chart = require("chart");


    var ScatterChart = Class("ScatterChart", {
        Extends : Chart,
        STATIC: {
            MODULE_NAME : "ScatterChart"
        },
        initialize : function(width, height) {
            ScatterChart.Super.call(this, width, height);
        },
        init : function(where){
            var statement = "<div></div>";
            this.element = ScatterChart.Super.prototype.init.call(this, where, statement);
            return this.element;
        },
        addScatterSeriesItem : function(data, name){
            var name = name;
            var data = data || [];
            if(!this.option.series){
                this.option.series = [];
            }
            this.option.series.push({
                type : "scatter",
                name : name,
                data : data
            });
            return this;
        },
        getModuleName : function(){
            return ScatterChart.MODULE_NAME;
        }
    });

    module.exports = ScatterChart;
});


