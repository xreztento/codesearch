/**
 * Created by xreztento@vip.sina.com on 2016/12/21.
 */
define(function (require, exports, module) {

    require("jquery");
    require("style");
    var Class = require("class");
    var Element = require("./Element");
    /**
     * 按钮组件
     */
    var ButtonElement = Class("ButtonElement", {
        Extends : Element,
        STATIC: {
            MODULE_NAME : "ButtonElement"
        },
        initialize : function(width, height, style) {
            ButtonElement.Super.call(this, width, height);
            this.style = style;
        },
        init : function(where){
            var statement = "<button>";
            var style = this.style || StyleType.primary;
            this.element = ButtonElement.Super.prototype.init.call(this, where, statement);
            this.element
                .addClass("btn btn-" + style);
            return this;

        },
        click : function(callback){
            this.element.click(function(){
                callback();
            });
            return this;
        },
        setImage : function(fontCss){
            this.element.prepend("<i style='margin-left:4px;margin-right:4px' class='" + fontCss + "'></i>");
            return this;
        },
        setBadge : function(messgae){
            this.element.append("<span class='badge'>"+ messgae +"</span>");
            return this;
        },
        setSubmitType : function(){
            this.element.attr("type", "submit");
            return this;
        },
        setResetType : function(){
            this.element.attr("type", "reset");
            return this;
        },
        clearType : function(){
            this.element.removeAttr("type");
            return this;
        },
        getModuleName : function(){
            return ButtonElement.MODULE_NAME;
        }
    });

    module.exports = ButtonElement;
});