/**
 * Created by xreztento@vip.sina.com on 2016/12/21.
 */
define(function (require, exports, module) {

    require("jquery");
    var Class = require("class");
    var Element = require("./Element");

    var EmbedElement = Class("EmbedElement", {
        Extends : Element,
        STATIC: {
            MODULE_NAME : "EmbedElement"
        },
        initialize : function(width, height, src, ratio) {
            EmbedElement.Super.call(this, width, height);
            this.src = src;
            this.radio = ratio;
        },
        init : function(where){
            var src = this.src || "#";
            var radio = this.radio || "16by9";
            var statement = "<div class='embed-responsive embed-responsive-" + radio + "'>" +
                "<iframe class='embed-responsive-item' src='" + src + "'></iframe>" +
                "</div>";
            this.element = EmbedElement.Super.prototype.init.call(this, where, statement);
            return this;
        },
        setSrc : function(src){
            $(this.element.children("iframe")).attr("src", src);
        },
        getModuleName : function(){
            return EmbedElement.MODULE_NAME;
        }
    });

    module.exports = EmbedElement;
});




