/**
 * Created by xreztento@vip.sina.com on 2016/12/23.
 */
define(function (require, exports, module) {

    require("jquery");
    require("style");
    require("switch");
    var Class = require("class");
    var Element = require("./Element");

    var SwitchElement = Class("SwitchElement", {
        Extends : Element,
        STATIC: {
            MODULE_NAME : "SwitchElement"
        },
        initialize : function(width, height, style, onText, offText, labelText) {
            this.width = width;
            this.height = height;
            this.style = style;
            this.onText = onText;
            this.offText = offText;
            this.labelText = labelText;
            SwitchElement.Super.call(this);
        },
        init : function(where){
            var style = this.style || "primary";
            var onText = this.onText || "ON";
            var offText = this.offText || "OFF";
            var labelText = this.labelText || "";
            var statement = "<input type='checkbox' data-on-color='"+ style +"'>";
            this.element = SwitchElement.Super.prototype.init.call(this, where, statement);
            this.switch = this.element.bootstrapSwitch({
                onText : onText,
                offText : offText,
                labelText : labelText
            }).data("bootstrap-switch");
            return  this;
        },
        /**
         * 获取开关当前状态
         * @returns {*}
         */
        getState : function(){
            return this.switch.state();
        },
        /**
         * 关闭开关动画效果
         * @returns {SwitchElement}
         */
        offAnimate : function(){
            this.switch.toggleAnimate(false);
            return this;
        },
        /**
         * 启动开关动画效果
         * @returns {SwitchElement}
         */
        onAnimate : function(){
            this.switch.toggleAnimate(true);
            return this;
        },
        /**
         * 设置开关为不可用
         * @returns {SwitchElement}
         */
        setDisabled : function(){
            this.switch.disabled(true);
            return this;
        },
        /**
         * 设置开关为可用
         * @returns {SwitchElement}
         */
        setEnabled : function(){
            this.switch.disabled(false);
            return this;
        },
        /**
         * 将开关状态置于on
         * @param callback
         * @returns {SwitchElement}
         */
        on : function(callback){
            this.switch.state(true);
            if(callback){
                callback();
            }
            return this;
        },
        /**
         * 将开关状态置于off
         * @param callback
         * @returns {SwitchElement}
         */
        off : function(callback){
            this.switch.state(false);
            if(callback){
                callback();
            }
            return this;
        },
        /**
         * 开关状态改变事件
         * @param callback
         * @returns {SwitchElement}
         */
        switchChange : function(callback){
            this.switch.onSwitchChange(callback);
            return this;
        },
        getModuleName : function(){
            return SwitchElement.MODULE_NAME;
        }
    });

    module.exports = SwitchElement;
});