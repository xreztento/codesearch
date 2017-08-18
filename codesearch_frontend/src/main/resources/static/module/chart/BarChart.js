/**
 * Created by xreztento@vip.sina.com on 2016/12/21.
 */
define(function (require, exports, module) {

    require("jquery");
    var Class = require("class");
    var Chart = require("chart");


    var BarChart = Class("BarChart", {
        Extends : Chart,
        STATIC: {
            MODULE_NAME : "BarChart"
        },
        /**
         *
         * @param width
         * @param height
         * @param xAxisItemNum x轴最大显示数
         */
        initialize : function(width, height) {
            BarChart.Super.call(this, width, height);
        },
        init : function(where){
            var statement = "<div></div>";
            this.element = BarChart.Super.prototype.init.call(this, where, statement);
            return this.element;
        },
        setBarCategoryAxis : function(data, axis){
            var data = data || [];
            var axis = axis || "x";
            this.barCategoryAxis = axis;
            this.barCategoryData = data;
            if(axis === "x"){
                this.option.xAxis = [];
                this.option.xAxis[0] = {
                    type : "category",
                    data : data
                }
            } else {
                this.option.yAxis = [];
                this.option.yAxis[0] = {
                    type : "category",
                    data : data
                }
            }

            return this;
        },
        getBarCategoryAxis : function(){
            return this.barCategoryAxis;
        },
        getBarValueAxis : function(){
            return this.barValueAxis;
        },
        setBarValueAxis : function(type, axis){
            var type = type || "value";
            var axis = axis || "y";
            this.barValueAxis = axis;
            if(axis === "y"){
                this.option.yAxis = [];
                this.option.yAxis[0] = {
                    type : type
                }
            } else {
                this.option.xAxis = [];
                this.option.xAxis[0] = {
                    type : type
                }
            }

            return this;
        },
        _wrapBarData : function(data){
            var barData = [];
            for(var i = 0,l = data.length; i < l; i++){
                barData.push({
                    value : data[i],
                    itemStyle : {
                        normal : {
                            opacity : 1
                        }
                    }
                });
            }
            return barData;
        },
        addBarSeriesItem : function(name, data, barWidth, barMaxWidth,
                                    barMinHeight, barGap, barCategoryGap){
            var name = name;
            var data = this._wrapBarData(data);
            this.barWidth = barWidth || "自适应";
            var barGap = barGap || "30%";
            var barCategoryGap = barCategoryGap || "20%";
            var barMinHeight = barMinHeight || 0;
            if(!this.option.series){
                this.option.series = [];
            }
            this.option.series.push({
                name : name,
                type : "bar",
                data : data,
                barWidth : this.barWidth,
                barMaxWidth : barMaxWidth,
                barMinHeight : barMinHeight,
                barGap : barGap,
                barCategoryGap : barCategoryGap
            });
            return this;
        },
        /**
         *
         * 通过Category名隐藏该Category的Bar
         * @param name
         * @returns {BarChart}
         */
        hideBarCategory : function(name){
            if(this._existsBarCategoryData(name) != -1){
                var index = this._existsBarCategoryData(name);
                if(this.getBarCategoryAxis() === "x"){
                    this.hideXAxisStatus(index);
                    //var xAxis = this._getBarAxisByHiddenStatus();
                    var series = this._getSeriesByHiddenCategory(index);

                    this.chart.setOption({
                        //xAxis : xAxis,
                        series : series
                    });
                } else {
                    this.hideYAxisStatus(index);
                    //var yAxis = this._getBarAxisByHiddenStatus();
                    var series = this._getSeriesByHiddenCategory(index);
                    this.chart.setOption({
                        //yAxis : yAxis,
                        series : series
                    });
                }
            }
            console.log(this.getOption());
            return this;
        },
        /**
         * 翻转坐标轴
         */
        transformAxis : function(){
            var xAxis = this.option.xAxis.slice(0);
            var yAxis = this.option.yAxis.slice(0);

            this.option.xAxis = yAxis;
            this.option.yAxis = xAxis;
            if(this.barCategoryAxis === "x"){
                this.barCategoryAxis = "y";
                this.barValueAxis = "x";
            } else {
                this.barCategoryAxis = "x";
                this.barValueAxis = "y";
            }
            this._initXAxisDataStore();
            this._initYAxisDataStore();
            this.chart.setOption({
                xAxis : yAxis,
                yAxis : xAxis
            });

        },
        /**
         * 按BarChart的规则初始化xAxis
         * @private
         */
        _initXAxisDataStore : function(){
            if(this.option.xAxis[0] && this.option.xAxis[0].data){
                this.xAxisData = [];
                this.xAxisStatus = {};

                for(var i = 0,l = this.option.xAxis[0].data.length; i < l; i++){

                    this.xAxisData.push(this.option.xAxis[0].data[i]);
                    this.xAxisStatus[i] = {};
                    this.xAxisStatus[i].display = "show";
                }
                this.xAxisDataStore = this.xAxisData.slice(0);

            }
        },
        _initYAxisDataStore : function(){
            if(this.option.yAxis[0] && this.option.yAxis[0].data){
                this.yAxisData = [];

                //用于保存yAxis的一些状态属性，当前保存是否显示属性
                this.yAxisStatus = {};

                for(var i = 0,l = this.option.yAxis[0].data.length; i < l; i++){

                    this.yAxisData.push(this.option.yAxis[0].data[i]);
                    this.yAxisStatus[i] = {};
                    this.yAxisStatus[i].display = "show";
                }

                //存储xAxis的data属性
                this.yAxisDataStore = this.yAxisData.slice(0);

            }
        },
        _getSeriesByHiddenCategory : function(index){
            for(var i = 0,l = this.seriesDataStore.length; i < l;i++){
                for(var j = 0; j < this.barCategoryData.length; j++){
                    if(j === index){
                        var value = this.seriesDataStore[i][j].value;
                        this.seriesDataStore[i][j] = {
                            value : value,
                            itemStyle : {
                                normal : {
                                    opacity : 0
                                }
                            }
                        }
                    }
                }
            }
            return this.flushSeries();
        },
        //_getBarAxisByHiddenStatus : function(){
        //    var barAxis = {};
        //    barAxis.data = [];
        //
        //    if(this.getBarCategoryAxis() === "x"){
        //        for(var index in this.xAxisStatus){
        //            if(this.xAxisStatus.hasOwnProperty(index)){
        //                if(this.xAxisStatus[index].display === "show"){
        //                    barAxis.data.push(this.xAxisDataStore[parseInt(index)]);
        //                }
        //            }
        //        }
        //    } else {
        //        for(var index in this.yAxisStatus){
        //            if(this.yAxisStatus.hasOwnProperty(index)){
        //                if(this.yAxisStatus[index].display === "show"){
        //                    barAxis.data.push(this.yAxisDataStore[parseInt(index)]);
        //                }
        //            }
        //        }
        //    }
        //    console.log(barAxis);
        //    return barAxis;
        //},
        _getSeriesByHiddenStatus : function(){
            var series = [];
            for(var index in this.seriesStatus){
                if(this.seriesStatus.hasOwnProperty(index)){
                    if(this.seriesStatus[index].display === "show"){
                        series.push({
                            data : this.seriesDataStore[parseInt(index)],
                            barWidth : this.barWidth
                        });
                    } else {
                        if(this.barWidth !== "自适应"){
                            series.push({
                                barWidth : "0px"
                            });
                        } else {
                            series.push({
                                data : []
                            });
                        }
                    }
                }
            }
            return series;
        },
        hideBarSeries : function(name){
            if(this._existsBarSeriesName(name) != -1){
                var index = this._existsBarSeriesName(name);
                this.hideSeriesStatus(index);

                var series = this._getSeriesByHiddenStatus();
                this.chart.setOption({
                    series : series
                });
            }
            return this;
        },
        showBarSeries : function(name){
            if(this._existsBarSeriesName(name) != -1){
                var index = this._existsBarSeriesName(name);
                this.showSeriesStatus(index);

                var series = this._getSeriesByHiddenStatus();
                this.chart.setOption({
                    series : series
                });
            }
            return this;
        },
        /**
         * 按种类更新数据
         * @param name
         * @param data
         * @returns {BarChart}
         */
        updateBarDataByCategory : function(name, data){
            var data = this._wrapBarData(data);
            if(this._existsBarCategoryData(name) != -1){
                var index = this._existsBarCategoryData(name);
                for(var i = 0,l = this.seriesDataStore.length; i < l; i++){
                    this.seriesDataStore[i][index] = data[i];
                }

                var series = this.flushSeries();

                this.chart.setOption({
                    series : series
                });
            }
            return this;

        },
        /**
         * 按系列名更新数据
         * @param name
         * @param data
         * @returns {BarChart}
         */
        updateBarDataBySeriesName : function(name, data){
            var data = this._wrapBarData(data);
            if(this._existsBarSeriesName(name) != -1){
                var index = this._existsBarSeriesName(name);
                this.seriesDataStore[index] = data;

                var series = this.flushSeries();

                this.chart.setOption({
                    series : series
                });
            }
            return this;
        },
        _existsBarCategoryData : function(name){
            if(this.barCategoryAxis === "x"){
                for(var i = 0, l = this.option.xAxis[0].data.length; i < l; i++){
                    if(this.option.xAxis[0].data[i] === name){
                        return i;
                    }
                }
            } else {
                for(var i = 0, l = this.option.yAxis[0].data.length; i < l; i++){
                    if(this.option.yAxis[0].data[i] === name){
                        return i;
                    }
                }
            }

            return -1;
        },
        _existsBarSeriesName : function(name){
            for(var i = 0, l = this.option.series.length; i < l; i++){
                if(this.option.series[i].name === name){
                    return i;
                }
            }
            return -1;
        },
        getModuleName : function(){

            return BarChart.MODULE_NAME;
        }
    });

    module.exports = BarChart;
});

