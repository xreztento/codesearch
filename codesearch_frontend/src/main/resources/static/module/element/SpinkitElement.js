/**
 * Created by xreztento@vip.sina.com on 2016/12/21.
 */
define(function (require, exports, module) {

    require("jquery");
    var Class = require("class");
    var Element = require("./Element");
    var DomUtil = require("domUtil");

    var SpinkitElement = Class("SpinkitElement", {
        Extends : Element,
        STATIC: {
            MODULE_NAME : "SpinkitElement"
        },
        initialize : function(width, height) {
            var domUtil = new DomUtil();
            domUtil.loadCss(["coreCSS/spinkit.css"])
            SpinkitElement.Super.call(this, width, height);
        },
        init : function(where, position){
            var statement = "<div></div>";
            this.element = SpinkitElement.Super.prototype.init.call(this, where, statement, position)
            return this.element;
        },
        getWave : function(color){
            var color = color || "#337ab7";
            this.element.removeAttr("class")
                .addClass("sk-wave")
                .html("<div style='background-color:"+ color +"' class='sk-rect sk-rect1'></div>"
            + "<div style='background-color:"+ color +"' class='sk-rect sk-rect2'></div>"
            + "<div style='background-color:"+ color +"' class='sk-rect sk-rect3'></div>"
            + "<div style='background-color:"+ color +"' class='sk-rect sk-rect4'></div>"
            + "<div style='background-color:"+ color +"' class='sk-rect sk-rect5'></div>");
        },
        getCircle : function(color){
            var color = color || "#337ab7";
            this.element.removeAttr("class")
                .addClass("sk-circle")
                .html("<div class='sk-circle1 sk-child'></div>"
                + "<div class='sk-circle2 sk-child'></div>"
                + "<div class='sk-circle3 sk-child'></div>"
                + "<div class='sk-circle4 sk-child'></div>"
                + "<div class='sk-circle5 sk-child'></div>"
                + "<div class='sk-circle6 sk-child'></div>"
                + "<div class='sk-circle7 sk-child'></div>"
                + "<div class='sk-circle8 sk-child'></div>"
                + "<div class='sk-circle9 sk-child'></div>"
                + "<div class='sk-circle10 sk-child'></div>"
                + "<div class='sk-circle11 sk-child'></div>"
                + "<div class='sk-circle12 sk-child'></div>")
                .append("<style>.sk-circle .sk-child:before{background-color: "+ color +"}</style>");

            (this.element.find(":before")).css({
                "background-color" : color
            });

        },
        getFoldingCube : function(color){
            var color = color || "#337ab7";
            this.element.removeAttr("class")
                .addClass("sk-folding-cube")
                .html("<div class='sk-cube sk-cube1'></div>"
                + "<div class='sk-cube sk-cube2'></div>"
                + "<div class='sk-cube sk-cube3'></div>"
                + "<div class='sk-cube sk-cube4'></div>")
                .append("<style>.sk-folding-cube .sk-cube:before{background-color: "+ color +"}</style>");
            ;
        },
        getRotatingPlane : function(color){
            var color = color || "#337ab7";
            this.element.removeAttr("class")
                .addClass("sk-rotating-plane")
                .css({
                    'background-color' : color
                });
        },
        getDoubleBounce : function(color){
            var color = color || "#337ab7";
            this.element.removeAttr("class")
                .addClass("sk-double-bounce")
                .html("<div style='background-color:"+ color +"' class='sk-child sk-double-bounce1'></div>"
                + "<div style='background-color:"+ color +"' class='sk-child sk-double-bounce2'></div>");
        },
        getWanderingCubes : function(color){
            var color = color || "#337ab7";
            this.element.removeAttr("class")
                .addClass("sk-wandering-cubes")
                .html("<div style='background-color:"+ color +"' class='sk-cube sk-cube1'></div>"
                + "<div style='background-color:"+ color +"' class='sk-cube sk-cube2'></div>");
        },
        getPulse : function(color){
            var color = color || "#337ab7";
            this.element.removeAttr("class")
                .addClass("sk-spinner sk-spinner-pulse")
                .css({
                    'background-color' : color
                });
        },
        getChasingDots : function(color){
            var color = color || "#337ab7";
            this.element.removeAttr("class")
                .addClass("sk-chasing-dots")
                .html("<div style='background-color:"+ color +"' class='sk-child sk-dot1'></div>"
                + "<div style='background-color:"+ color +"' class='sk-child sk-dot2'></div>");
        },
        getThreeBounce : function(color){
            var color = color || "#337ab7";
            this.element.removeAttr("class")
                .addClass("sk-three-bounce")
                .html("<div style='background-color:"+ color +"' class='sk-child sk-bounce1'></div>"
                + "<div style='background-color:"+ color +"' class='sk-child sk-bounce2'></div>"
                + "<div style='background-color:"+ color +"' class='sk-child sk-bounce3'></div>");
        },
        getCubeGrid : function(color){
            var color = color || "#337ab7";
            this.element.removeAttr("class")
                .addClass("sk-cube-grid")
                .html("<div style='background-color:"+ color +"' class='sk-cube sk-cube1'></div>"
                + "<div style='background-color:"+ color +"' class='sk-cube sk-cube2'></div>"
                + "<div style='background-color:"+ color +"' class='sk-cube sk-cube3'></div>"
                + "<div style='background-color:"+ color +"' class='sk-cube sk-cube4'></div>"
                + "<div style='background-color:"+ color +"' class='sk-cube sk-cube5'></div>"
                + "<div style='background-color:"+ color +"' class='sk-cube sk-cube6'></div>"
                + "<div style='background-color:"+ color +"' class='sk-cube sk-cube7'></div>"
                + "<div style='background-color:"+ color +"' class='sk-cube sk-cube8'></div>"
                + "<div style='background-color:"+ color +"' class='sk-cube sk-cube9'></div>");
        },
        getFadingCircle : function(color){
            var color = color || "#337ab7";
            this.element.removeAttr("class")
                .addClass("sk-fading-circle")
                .html("<div class='sk-circle sk-circle1'></div>"
                + "<div class='sk-circle sk-circle2'></div>"
                + "<div class='sk-circle sk-circle3'></div>"
                + "<div class='sk-circle sk-circle4'></div>"
                + "<div class='sk-circle sk-circle5'></div>"
                + "<div class='sk-circle sk-circle6'></div>"
                + "<div class='sk-circle sk-circle7'></div>"
                + "<div class='sk-circle sk-circle8'></div>"
                + "<div class='sk-circle sk-circle9'></div>"
                + "<div class='sk-circle sk-circle10'></div>"
                + "<div class='sk-circle sk-circle11'></div>"
                + "<div class='sk-circle sk-circle12'></div>")
                .append("<style>.sk-fading-circle .sk-circle:before{background-color: "+ color +"}</style>");
        },
        getModuleName : function(){
            return SpinkitElement.MODULE_NAME;
        }
    });

    module.exports = SpinkitElement;
});

