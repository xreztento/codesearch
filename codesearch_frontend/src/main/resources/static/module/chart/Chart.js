/**
 * Created by xreztento@vip.sina.com on 2016/12/21.
 */
define(function (require, exports, module) {

    require("jquery");
    require("echarts");
    require("echarts-macarons");
    var Class = require("class");
    var Element = require("element");

    var Chart = Class("Chart", {
        Extends : Element,
        STATIC: {
            MODULE_NAME : "Chart",
            /**
             * 多个图表实例实现联动
             * @param connectedGroupId
             */
            connect : function(connectedGroupId){
                echarts.connect(connectedGroupId);
            },
            /**
             * 解除图表联动
             * @param id
             */
            disConnect : function(id){
                echarts.disConnect(id);
            },
            getInstanceByDom : function(target){
                return echarts.getInstanceByDom(target);
            },
            registerTheme : function(themeName, theme){
                echarts.registerTheme(themeName, theme);
            }
        },
        initialize : function(width, height, module) {
            Chart.Super.call(this, width, height, module);
        },
        init : function(where){
            var statement = "<div></div>";
            this.element = Chart.Super.prototype.init.call(this, where, statement);
            //this.chart = echarts.init(this.element[0], "macarons");
            this.option = {};
            return this.element;
        },
        setGroupId : function(id){
            this.groupId = id;
            this.chart.group = id;
        },
        getGroupId : function(){
            return this.groupId;
        },
        dispose : function(){
            this.chart.dispose();
        },
        setOption : function(option){
            this.option = option;
            return this;
        },
        getWidth : function(){
            return this.chart.getWidth();
        },
        getHeight : function(){
            return this.chart.getHeight();
        },
        getDom : function(){
            return this.chart.getDom();
        },
        getOption : function(){
            return this.chart.getOption();
        },
        resize : function(width, height, silent){
            this.chart.resize(width, height, silent);
            return this;
        },
        dispatchAction : function(payload){
            this.chart.dispatchAction(payload);
            return this;
        },
        on : function(eventName, handler, context){
            this.chart.on(eventName, handler, context);
            return this;
        },
        off : function(eventName, handler){
            this.chart.off(eventName, handler);
            return this;
        },
        getDataURL : function(type, pixelRatio, backgroundColor, excludeComponents){
            return this.chart.getDataURL(type, pixelRatio, backgroundColor, excludeComponents);
        },
        getConnectedDataURL : function(type, pixelRatio, backgroundColor, excludeComponents){
            return this.chart.getConnectedDataURL(type, pixelRatio, backgroundColor, excludeComponents);
        },
        clear : function(){
            this.chart.clear();
            return this;
        },
        setTitle : function(text, subtext, link, sublink){
            var text = text || "";
            var subtext = subtext || "";
            var link = link;
            var sublink = sublink;
            var title = {
                text : text,
                subtext : subtext,
                link : link,
                sublink : sublink,
                x : "center",
                textAlign: "center",
                align : "right"
            };
            this.option.title = title;
            return this;
        },
        getTitle : function(){
            return this.option.title;
        },
        setTooltip : function(tooltip){
            this.option.tooltip = tooltip;
            return this;
        },
        setLegend : function(data, float, orient){
            var data = data;
            var float = float || "left";
            var orient = orient || "horizontal";
            var legend = {
                data : data,
                x : float,
                orient : orient
            };
            this.option.legend = legend;
            return this;
        },
        getLegend : function(){
            return this.option.legend;
        },
        setXAxis : function(xAxis){
            this.option.xAxis = xAxis;
            return this;
        },
        setYAxis : function(yAxis){
            this.option.yAxis = yAxis;
            return this;
        },
        setSeries : function(series){
            this.option.series = series;
            return this;
        },
        setVisualMap : function(visualMap){
            this.option.visualMap = visualMap;
            return this;
        },
        addSeriesItem : function(name, type, data){
            if(!this.option.series){
                this.option.series = [];
            }
            this.option.series.push({
                name : name,
                type : type,
                data : data
            });
            return this;
        },
        setToolbox : function(toolbox){
            this.option.toolbox = toolbox;
            return this;
        },
        setGrid : function(show, top, left, right, bottom, containLabel){
            var top = top || 0;
            var left = left || 0;
            var right = right || 0;
            var bottom = bottom || 0;
            this.option.grid = {
                show : show,
                top : top,
                left : left,
                right : right,
                bottom : bottom,
                containLabel : containLabel
            };
            return this;
        },
        hideSeriesStatus : function(index){
            if(!this.seriesStatus[index]){
                this.seriesStatus[index] = {};
            }
            this.seriesStatus[index].display = "hide";
            return this;
        },
        showSeriesStatus : function(index){
            if(!this.seriesStatus[index]){
                this.seriesStatus[index] = {};
            }
            this.seriesStatus[index].display = "show";
        },
        hideXAxisStatus : function(index){
            if(!this.xAxisStatus[index]){
                this.xAxisStatus[index] = {};
            }
            this.xAxisStatus[index].display = "hide";
        },
        showXAxisStatus : function(index){
            if(!this.xAxisStatus[index]){
                this.xAxisStatus[index] = {};
            }
            this.xAxisStatus[index].display = "show";
        },
        hideYAxisStatus : function(index){
            if(!this.yAxisStatus[index]){
                this.yAxisStatus[index] = {};
            }
            this.yAxisStatus[index].display = "hide";
        },
        showYAxisStatus : function(index){
            if(!this.yAxisStatus[index]){
                this.yAxisStatus[index] = {};
            }
            this.yAxisStatus[index].display = "show";
        },
        hideLegendStatus : function(index){
            if(!this.legendStatus[index]){
                this.legendStatus[index] = {};
            }
            this.legendStatus[index].display = "hide";
        },
        showLegendStatus : function(index){
            if(!this.legendStatus[index]){
                this.legendStatus[index] = {};
            }
            this.legendStatus[index].display = "show";
        },

        flushXAxis : function(){
            var xAxis = [];
            for(var index in this.xAxisStatus){
                if(this.xAxisStatus.hasOwnProperty(index)){
                    //this.xAxisData[parseInt(index)] = this.xAxisDataStore[parseInt(index)];
                    xAxis.push({
                        data : this.xAxisDataStore[parseInt(index)]
                    });
                }
            }
            return xAxis;
        },
        flushYAxis : function(){
            var yAxis = [];
            for(var index in this.yAxisStatus){
                if(this.yAxisStatus.hasOwnProperty(index)){
                    //this.yAxisData[parseInt(index)] = this.yAxisDataStore[parseInt(index)];
                    yAxis.push({
                        data : this.yAxisDataStore[parseInt(index)]
                    });
                }
            }
            return yAxis;
        },
        flushSeries : function(){
            var series = [];
            for(var index in this.seriesStatus){
                if(this.seriesStatus.hasOwnProperty(index)){
                    //this.seriesData[parseInt(index)] = this.seriesDataStore[parseInt(index)];
                    series.push({
                        data : this.seriesDataStore[parseInt(index)]
                    });
                }
            }
            return series;
        },
        flushLegend : function(){
            var legend = {};
            legend.data = [];
            for(var index in this.legendStatus){
                if(this.legendStatus.hasOwnProperty(index)){
                    //this.legendData[parseInt(index)] = this.legendDataStore[parseInt(index)];
                    legend.data[parseInt(index)] = this.legendDataStore[parseInt(index)];
                }
            }
            return legend;
        },
        _initXAxisDataStore : function(){
            if(this.option.xAxis){
                this.xAxisData = [];

                //用于保存xAxis的一些状态属性，当前保存是否显示属性
                this.xAxisStatus = {};

                for(var i = 0,l = this.option.xAxis.length; i < l; i++){
                    //this.option.xAxis[i].data = this.option.xAxis[i].data.map(function (str) {
                    //    return str.replace(' ', '\n')
                    //});
                    this.xAxisData.push(this.option.xAxis[i].data);
                    this.xAxisStatus[i] = {};
                    this.xAxisStatus[i].display = "show";
                }

                //存储xAxis的data属性
                this.xAxisDataStore = this.xAxisData.slice(0);
                console.log(this.xAxisStatus);
                console.log(this.xAxisDataStore);
            }
        },
        _initYAxisDataStore : function(){
            if(this.option.yAxis){
                this.yAxisData = [];

                //用于保存yAxis的一些状态属性，当前保存是否显示属性
                this.yAxisStatus = {};

                for(var i = 0,l = this.option.yAxis.length; i < l; i++){
                    //this.option.xAxis[i].data = this.option.xAxis[i].data.map(function (str) {
                    //    return str.replace(' ', '\n')
                    //});
                    this.yAxisData.push(this.option.yAxis[i].data);
                    this.yAxisStatus[i] = {};
                    this.yAxisStatus[i].display = "show";
                }

                //存储xAxis的data属性
                this.yAxisDataStore = this.yAxisData.slice(0);

            }
        },
        render : function(){
            this.chart = echarts.init(this.element[0]);
            if(this.option.legend){
                //用于保存legend的一些状态属性，当前保存是否显示属性
                this.legendStatus = {};

                this.legendData = this.option.legend.data;
                for(var i = 0,l = this.option.legend.data.length; i < l; i++){
                    this.legendStatus[i] = {};
                    this.legendStatus[i].display = "show";
                }
                //存储legend的data属性
                this.legendDataStore = this.legendData.slice(0);
            }

            this._initXAxisDataStore();
            this._initYAxisDataStore();

            if(this.option.series){
                //存储渲染的series的data属性，与option保持一致
                this.seriesData = [];

                //用于保存series的一些状态属性，当前保存是否显示属性
                this.seriesStatus = {};

                //初始化series数据和属性
                for(var i = 0,l = this.option.series.length; i < l; i++){
                    this.seriesData.push(this.option.series[i].data);
                    this.seriesStatus[i] = {};
                    this.seriesStatus[i].display = "show";
                }

                this.seriesDataStore = this.seriesData.slice(0);
            }

            this.chart.setOption(this.option);
        },
        getXAxisData : function(){
            return this.xAxisData;
        },
        getSeriesData : function(){
            return this.seriesData;
        },
        showLoading : function(){
            this.chart.showLoading();
        },
        hideLoading : function(){
            this.chart.hideLoading();
        },
        onClick : function(callback){
            //params
            this.chart.on('click', callback);
        },
        onDblClick : function(callback){
            //params
            this.chart.on('dblclick', callback);
        },
        onMousedown : function(callback){
            //params
            this.chart.on('mousedown', callback);
        },
        onMousemove : function(callback){
            //params
            this.chart.on('mousemove', callback);
        },
        onMouseup : function(callback){
            //params
            this.chart.on('mouseup', callback);
        },
        onMouseover : function(callback){
            //params
            this.chart.on('mouseover', callback);
        },
        onMouseout : function(callback){
            //params
            this.chart.on('mouseout', callback);
        },
        onLegendselectchanged : function(callback){
            this.chart.on('legendselectchanged', callback);
        },
        onLegendselected : function(callback){
            this.chart.on('legendselected', callback);
        },
        onLegendunselected : function(callback){
            this.chart.on('legendunselected', callback);
        },
        onDatazoom : function(callback){
            this.chart.on('datazoom', callback);
        },
        onDatarangeselected : function(callback){
            this.chart.on('datarangeselected', callback);
        },
        onTimelinechanged : function(callback){
            this.chart.on('timelinechanged', callback);
        },
        onTimelineplaychanged : function(callback){
            this.chart.on('timelineplaychanged', callback);
        },
        onRestore : function(callback){
            this.chart.on('restore', callback);
        },
        onDataviewchanged : function(callback){
            this.chart.on('dataviewchanged', callback);
        },
        onMagictypechanged : function(callback){
            this.chart.on('magictypechanged', callback);
        },
        onAxisareaselected : function(callback){
            this.chart.on('axisareaselected', callback);
        },
        getChart : function(){
            return this.chart;
        },
        getModuleName : function(){
            return Chart.MODULE_NAME;
        }
    });

    module.exports = Chart;
});
