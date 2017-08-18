/**
 * Created by xreztento@vip.sina.com on 2016/12/21.
 */
define(function (require, exports, module) {

    require("jquery");
    require("peity");
    var Class = require("class");
    var Element = require("./Element");

    var PeityChartElement = Class("PeityChartElement", {
        Extends : Element,
        STATIC: {
            MODULE_NAME : "PeityChartElement"
        },
        initialize : function(chartType, data, color) {
            PeityChartElement.Super.call(this, null, null);
            this.chartType = chartType;
            this.data = data;
        },
        init : function(where){
            var chartType = this.chartType;
            var data = this.data;
            var statement = "<span></span>";
            var data = this.data || "";
            this.element = PeityChartElement.Super.prototype.init.call(this, where, statement);
            this.element.text(data)
                .addClass(chartType)
                .peity(chartType);

            return this;
        },
        change : function(data){
            this.element.text(data).change();
        },
        getModuleName : function(){
            return PeityChartElement.MODULE_NAME;
        }
    });

    module.exports = PeityChartElement;
});


