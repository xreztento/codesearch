/**
 * Created by xreztento@vip.sina.com on 2016/12/21.
 */
define(function (require, exports, module) {

    require("jquery");
    require("select2");
    var Class = require("class");
    var Element = require("./Element");
    var ValidateElement = require("./ValidateElement");

    var SelectElement = Class("SelectElement", {
        Extends : Element,
        Implements : [ValidateElement],
        STATIC: {
            MODULE_NAME : "SelectElement"
        },
        initialize : function(width, height, optionArray, placeholder, isMultiple, maximumSelectionLength) {
            SelectElement.Super.call(this, width, height);
            this.width = width;
            this.optionArray = optionArray;
            this.placeholder = placeholder;
            this.isMultiple = isMultiple;
            this.maximumSelectionLength = maximumSelectionLength;
        },
        init : function(where){
            var statement = "<select data-role='select'></select>";
            var optionArray = this.optionArray || new Array();
            var isMultiple = this.isMultiple;
            var placeholder = this.placeholder || "";
            var maximumSelectionLength = this.maximumSelectionLength;
            var width = this.width || "120px";
            var height = this.height || "34px";
            this.element = SelectElement.Super.prototype.init.call(this, where, statement);

            this.element.attr("data-width", width);
            this.element.attr("data-height", height);
            if(isMultiple){
                this.element.attr("multiple", "multiple");
            }
            if(maximumSelectionLength){
                this.element.select2({
                    dropdownAutoWidth : false,
                    data : optionArray,
                    placeholder : placeholder,
                    maximumSelectionLength : maximumSelectionLength
                });
            } else {
                this.element.select2({
                    dropdownAutoWidth : false,
                    data : optionArray,
                    placeholder : placeholder
                });
            }

            return this;
        },
        /**
         * 设置宽度
         * @param width
         */
        setSelectWidth : function(width){
            this.element.attr("data-width", width);
        },
        /**
         * 获取被选择项
         * @returns {{id: *}}
         */
        getSelected : function(){
            return {
                id : this.element.val()
            };
        },
        setSelected : function(id){
            this.element.val(id);
        },
        /**
         * 选择事件
         * @param callback
         * @returns {SelectElement}
         */
        select : function(callback){
            this.element.on("select2:select", callback);
            //function (e){
            //}
            return this;
        },
        /**
         * 打开事件
         * @param callback
         * @returns {SelectElement}
         */
        open : function(callback){
            this.element.on("select2:open", callback);
            return this;
        },
        /**
         * 关闭事件
         * @param callback
         * @returns {SelectElement}
         */
        close : function(callback){
            this.element.on("select2:close", callback);
            return this;
        },
        /**
         * 不选择事件
         * @param callback
         * @returns {SelectElement}
         */
        unselect : function(callback){
            this.element.on("select2:unselect", callback);
            return this;
        },
        enable : function(){
            this.element.prop("disabled", false);
        },
        disable : function(){
            this.element.prop("disabled", true);
        },
        getModuleName : function(){
            return SelectElement.MODULE_NAME;
        }
    });

    module.exports = SelectElement;
});