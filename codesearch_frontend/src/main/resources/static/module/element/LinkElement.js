/**
 * Created by xreztento@vip.sina.com on 2016/12/21.
 */
define(function (require, exports, module) {

    require("jquery");
    var Class = require("class");
    var Element = require("./Element");
    require("style");


    var LinkElement = Class("LinkElement", {
        Extends : Element,
        STATIC: {
            MODULE_NAME : "LinkElement"
        },
        initialize : function(text, href) {
            LinkElement.Super.call(this, null, null);
            this.text = text;
            this.href = href;
        },
        init : function(where){
            var statement = "<a></a>";
            var text = this.text || "超链接";
            var href = this.href || "#";
            this.element = LinkElement.Super.prototype.init.call(this, where, statement);
            this.element.attr("href", href).text(text);
            return this;
        },
        /**
         * 将一个元素包裹入Link
         * @param element
         */
        wrapElement : function(element){
            if(element instanceof Element){
                this.wrappedElement = element;
                element.init(this.element);
            }
        },
        /**
         * 删除被包裹元素
         */
        unwrapElement : function(){
            if(this.wrappedElement){
                this.wrappedElement.destroy();
                this.wrappedElement = null;
            }
        },
        /**
         * 获取被包裹的元素
         * @returns {*}
         */
        getWrappedElement : function(){
            return this.wrappedElement;
        },
        /**
         * 设置为按钮样式
         * @param style 样式
         */
        setButtonStyle : function(style){
            var style = style || StyleType.primary;
            this.element.addClass("btn btn-" + style);
        },
        click : function(callback){
            this.element.click(callback);
        },
        getModuleName : function(){
            return LinkElement.MODULE_NAME;
        }
    });

    module.exports = LinkElement;
});
