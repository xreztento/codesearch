/**
 * Created by xreztento@vip.sina.com on 2016/12/29.
 */
define(function (require, exports, module) {

    require("jquery");
    require("style");
    var Class = require("class");
    var Element = require("./Element");
    var ButtonElement = require("buttonElement");

    var AlertElement = Class("AlertElement", {
        Extends : Element,
        STATIC: {
            MODULE_NAME : "AlertElement"
        },
        initialize : function(width, height, topic, message, style) {
            AlertElement.Super.call(this, width, height);
            this.topic = topic;
            this.message = message;
            this.style = style;
        },
        init : function(where){
            var statement = "<div role='alert'><div>";
            var topic = this.topic || "Alert!";
            var message = this.message || "";
            var style = this.style || StyleType.danger;
            this.element = AlertElement.Super.prototype.init.call(this, where, statement);
            this.element
                .addClass("alert alert-" + style)
                .html("<strong>" + topic + "</strong>" + message);
            return this;

        },
        setClosable : function(){
            this.element.prepend("<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>");
            return this;
        },
        setContent : function(content){
            var p = $("<p></p>").css({
                "margin-top" : "10px"
            }).text(content);
            this.element.append(p);
            return this;
        },
        setToolBar : function(submitCallback, cancelCallback){
            var submitButton = new ButtonElement(null, null, StyleType.danger);
            var cancelButton = new ButtonElement(null, null, StyleType.default);
            var p = $("<p></p>").css({
                "margin-top" : "10px"
            });
            this.element.append(p);
            submitButton.init(p);
            submitButton.setText("确认").click(submitCallback).css("margin-right", "10px");
            cancelButton.init(p);
            cancelButton.setText("取消").click(cancelCallback);
            return this;
        },
        getModuleName : function(){
            return AlertElement.MODULE_NAME;
        }
    });

    module.exports = AlertElement;
});