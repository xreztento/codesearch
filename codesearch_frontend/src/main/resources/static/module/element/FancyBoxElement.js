/**
 * Created by xreztento@vip.sina.com on 2016/12/21.
 */
define(function (require, exports, module) {

    require("jquery");
    require("fancybox");
    require("util");
    var Class = require("class");
    var Element = require("./Element");

    var FancyBoxElement = Class("FancyBoxElement", {
        Extends : Element,
        STATIC: {
            MODULE_NAME : "FancyBoxElement"
        },
        initialize : function(width, height, mediaType) {
            FancyBoxElement.Super.call(this, width, height);
            this.mediaType = mediaType || "Images";
        },
        init : function(where){
            var statement = "<div></div>";
            this.element = FancyBoxElement.Super.prototype.init.call(this, where, statement);
            this.mediaCache = [];
            return this;
        },
        addImageItem : function(medium, thumbnail, data_width, data_height){
            var mediaType = this.mediaType;

            if(mediaType === "Images"){
                var $image = $("<a data-fancybox='images'></a>");
                $image.attr("href", medium).html("<img src='" + thumbnail + "'>");
                this.element.append($image);
                this.mediaCache.push($image);
            }
        },
        setSpeed : function(speed){
            var speed = speed || 330;
            $.fancybox.defaults.speed = speed;
        },
        getModuleName : function(){
            return FancyBoxElement.MODULE_NAME;
        }
    });

    module.exports = FancyBoxElement;
});
