/**
 * Created by xreztento@vip.sina.com on 2016/12/21.
 */
define(function (require, exports, module) {

    require("jquery");
    var Class = require("class");
    var Chart = require("chart");

    var MapChart = Class("MapChart", {
        Extends : Chart,
        STATIC: {
            MODULE_NAME : "MapChart",
            MAP_RESOURCE : {
                china : "module/chart/map/china.json",
                world : "module/chart/map/world.json"
            }
        },
        initialize : function(width, height, map) {
            MapChart.Super.call(this, width, height);
            this.map = map || "china";

        },
        init : function(where){
            var statement = "<div></div>";
            this.element = MapChart.Super.prototype.init.call(this, where, statement);
            return this.element;
        },
        setGeo : function(geo){
            this.option.geo = geo;
            return this;
        },
        /**
         * 重写render方法，根据map动态加载地图json数据
         */
        render : function(){
            var map = this.map;
            var that = this;
            $.get(MapChart.MAP_RESOURCE[map], function (json) {
                echarts.registerMap(map, json);
                MapChart.Super.prototype.render.call(that);
            });
        },
        addMapSeriesItem : function(name, data, label, roam, aspectScale, zoom, geoIndex){
            var map = this.map;
            var data = data || [];
            var name = name || "";
            var label = label || {
                    normal: {
                        show: true
                    },
                    emphasis: {
                        show: true
                    }
                };
            var roam = roam || false;
            var aspectScale = aspectScale || 0.75;
            var zoom = zoom || 1;
            var geoIndex = geoIndex || null;
            if(!this.option.series){
                this.option.series = [];
            }
            this.option.series.push({
                type : "map",
                map : this.map,
                name : name,
                data : data,
                roam : roam,
                label : label,
                aspectScale : aspectScale,
                zoom : zoom,
                geoIndex : geoIndex
            });
            return this;
        },
        getModuleName : function(){
            return MapChart.MODULE_NAME;
        }
    });

    module.exports = MapChart;
});


