/**
 * Created by xreztento@vip.sina.com on 2016/12/21.
 */
define(function (require, exports, module) {

    require("jquery");
    var Class = require("class");
    var Element = require("./Element");
    require("lazyload");
    /**
     * 图片组件
     */
    var ImageElement = Class("ImageElement", {
        Extends : Element,
        STATIC: {
            MODULE_NAME : "ImageElement"
        },
        initialize : function(width, height, src, style) {
            ImageElement.Super.call(this);
            this.width = width;
            this.height = height;
            this.src = src;
            this.style = style;
        },
        init : function(where){
            var statement = "<img>";
            var width = this.width;
            var height = this.height;
            var src = this.src;
            var style = this.style;

            this.element = ImageElement.Super.prototype.init.call(this, where, statement);
            if(src){
                this.element.attr({
                    "src" : src
                });

            }

            if(!(width || height)){
                this.element.addClass("img-responsive");
            } else {
                if(width){
                    this.element.css("width", width);
                }
                if(height){
                    this.element.css("height", height);
                }
            }
            if(style){
                this.element.addClass(style);
            }

            return this;

        },
        /**
         * 设置图片
         * @param src 图片url或dataURL
         */
        setImage : function(src){
            if(src){
                this.element.attr({
                    "src" : src
                });
            }
        },
        /**
         * 延迟加载
         * @param src 加载后实际显示图片的url或dataURL
         * @param timeout 加载时间
         * @param placeholder 加载前的占位图片url或dataURL
         */
        lazyLoad : function(src, timeout, placeholder){
            var timeout = timeout || 1500;
            var lazyOptions = {
                event : "sporty",
                effect : "fadeIn"
            };
            if(src){
                this.element.removeAttr("src").attr("data-original", src);
            } else if(this.element.attr("src")){
                var src = this.element.attr("src");
                this.element.removeAttr("src").attr("data-original", src);
            }
            if(placeholder){
                lazyOptions.placeholder = placeholder;
            }
            this.element.lazyload(lazyOptions);
            var that = this;
            setTimeout(function() {
                that.element.trigger("sporty");
            }, timeout);
        },
        getModuleName : function(){
            return ImageElement.MODULE_NAME;
        }


    });

    module.exports = ImageElement;
});