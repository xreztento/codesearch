/**
 * Created by xreztento@vip.sina.com on 2016/12/21.
 */
define(function (require, exports, module) {

    require("jquery");
    require("star-rating");
    var Class = require("class");
    var Element = require("./Element");
    var ValidateElement = require("./ValidateElement");

    var StarRatingElement = Class("StarRatingElement", {
        Extends : Element,
        Implements : [ValidateElement],
        STATIC: {
            MODULE_NAME : "StarRatingElement"
        },
        initialize : function(width, height, min, max, step, size, model) {
            StarRatingElement.Super.call(this, width, height, model);
            this.min = min;
            this.max = max;
            this.step = step;
            this.size = size;
        },
        init : function(where){
            var statement = "<input>";
            var min = this.min || 0;
            var max = this.max || 5;
            var step = this.step || 1;
            var size = this.size || "xs";
            this.element = StarRatingElement.Super.prototype.init.call(this, where, statement);
            this.element.attr({
                "data-min" : min,
                "data-max" : max,
                "data-step" : step,
                "data-size" : size
            }).addClass("rating rating-loading").rating();

            return this;
        },
        onChange : function(callback){
            //event, value, caption
            this.element.on('rating.change', callback);
        },
        onClear : function(callback){
            //event
            this.element.on('rating.clear', callback);

        },
        onReset : function(callback){
            //event
            this.element.on('rating.reset', callback);
        },
        onHover : function(callback){
            //event, value, caption, target
            this.element.on('rating.hover', callback);
        },
        onHoverleave : function(callback){
            //event, target
            this.element.on('rating.hoverleave', callback);
        },
        update : function(val){
            var min = this.min || 0;
            var max = this.max || 5;
            if(val >= min && val <= max){
                this.element.rating("update", val);
            }
        },
        reset : function(){
            this.element.rating("reset");
        },
        clear : function(){
            this.element.rating("clear");
        },
        destroy : function(){
            this.element.rating("destroy");
        },
        create : function(){
            this.element.rating("create");
        },
        getValue : function(){
            return this.element.val();
        },
        getModuleName : function(){
            return StarRatingElement.MODULE_NAME;
        }
    });

    module.exports = StarRatingElement;
});