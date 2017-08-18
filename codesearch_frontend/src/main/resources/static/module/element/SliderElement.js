/**
 * Created by xreztento@vip.sina.com on 2016/12/21.
 */
define(function (require, exports, module) {

    require("jquery");
    require("bootstrap");
    require("slider");

    var Class = require("class");
    var Element = require("./Element");
    var ValidateElement = require("./ValidateElement");

    var SliderElement = Class("TextElement", {
        Extends : Element,
        Implements : [ValidateElement],
        STATIC: {
            MODULE_NAME : "SliderElement"
        },
        initialize : function(width, height, ticks, labels) {
            SliderElement.Super.call(this, width, height);
        },
        init : function(where){
            var statement = "<input>";

            this.element = SliderElement.Super.prototype.init.call(this, where, statement);


            where.append(this.element);

            this.element.ionRangeSlider({
                min: 0,
                max: 10000,
                from: 1000,
                to: 9000,
                type: 'double',
                prefix: "$",
                grid: true,
                grid_num: 10
            });

            return this;
        },
        getModuleName : function(){
            return SliderElement.MODULE_NAME;
        }
    });

    module.exports = SliderElement;
});
