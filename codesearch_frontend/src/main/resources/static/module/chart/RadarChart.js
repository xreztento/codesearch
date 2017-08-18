/**
 * Created by xreztento@vip.sina.com on 2016/12/21.
 */
define(function (require, exports, module) {

    require("jquery");
    var Class = require("class");
    var Chart = require("chart");


    var RadarChart = Class("RadarChart", {
        Extends : Chart,
        STATIC: {
            MODULE_NAME : "RadarChart"
        },
        /**
         *
         * @param width
         * @param height
         * @param xAxisItemNum x轴最大显示数
         */
        initialize : function(width, height) {
            RadarChart.Super.call(this, width, height);
        },
        init : function(where){
            var statement = "<div></div>";
            this.element = RadarChart.Super.prototype.init.call(this, where, statement);
            return this.element;
        },
        setRadar : function(radar){
            this.option.radar = radar;
            return this;
        },
        addRadar : function(indicator, center, radius, startAngle, nameGap){
            var indicator = indicator || [];
            var center = center || ["50%", "50%"];
            var radius = radius || "75%";
            var startAngle = startAngle || 90;
            var nameGap = nameGap || 15;
            if(!this.option.radar){
                this.option.radar = [];
            }
            this.option.radar.push({
                indicator : indicator,
                center : center,
                radius : radius,
                startAngle : startAngle,
                nameGap : nameGap
            });
            return this;
        },
        addRadarSeriesItem : function(data, name, radarIndex){
            var name = name;
            var radarIndex = radarIndex || 0;
            var data = data || [];
            if(!this.option.series){
                this.option.series = [];
            }
            this.option.series.push({
                type : "radar",
                name : name,
                radarIndex : radarIndex,
                data : data
            });
            return this;
        },
        getModuleName : function(){

            return RadarChart.MODULE_NAME;
        }
    });

    module.exports = RadarChart;
});


