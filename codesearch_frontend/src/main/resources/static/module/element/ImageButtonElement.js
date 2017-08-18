/**
 * Created by CSIP on 2016/12/21.
 */
define(function (require, exports, module) {

    require("jquery");
    require("style");
    var Class = require("class");
    var Element = require("./Element");
    /**
     * 图片按钮组件
     */
    var ImageButtonElement = Class("ImageButtonElement", {
        Extends : Element,
        STATIC: {
            MODULE_NAME : "ImageButtonElement"
        },
        initialize: function(width, height, fontCss, fontSize) {
            ImageButtonElement.Super.call(this, width, height);
            this.fontCss = fontCss;
            this.fontSize = fontSize;
        },
        init : function(where){
            var statement = "<a href='#'></a>";
            var fontCss = this.fontCss || "fa fa-power-off";
            var fontSize = this.fontSize || "18px";
            this.element = ImageButtonElement.Super.prototype.init.call(this, where, statement);
            this.element
                .html("<i class='" + fontCss + "'></i>").css({
                    "font-size" : fontSize,
                    "margin" : "8px"
                });
            return this;

        },
        /**
         * 点击事件
         * @param callback
         * @returns {ImageButtonElement}
         */
        click : function(callback){
            this.element.click(callback);
            return this;
        },
        setFontCss : function(fontCss){
            $(this.element.children("i")).removeAttr("class").addClass(fontCss);
            return this;
        },
        toggleFontCss : function(fontCss){
            $(this.element.children("i")).toggleClass(fontCss);
            return this;
        },
        getFontCss : function(){
            return $(this.element.children("i")).attr("class");
        },
        getModuleName : function(){
            return ImageButtonElement.MODULE_NAME;
        }

    });

    module.exports = ImageButtonElement;
});