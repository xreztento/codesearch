/**
 * Created by xreztento@vip.sina.com on 2016/12/21.
 */
define(function (require, exports, module) {

    require("jquery");
    var Class = require("class");

    var ValidateElement = Class("ValidateElement", {
        STATIC: {
            MODULE_NAME: "ValidateElement"
        },
        /**
         * 设置验证规则
         * @param validate
         *
         * validate = [
         *      {
         *          rule : "required",
         *          value : true,
         *          message : "Enter the value"
         *      },
         *      {
         *          rule : "minlength",
         *          value : 10,
         *          message : "Enter at least the minlength"
         *      }
         * ]
         *
         *
         */
        setValidate : function(validate){
            this.isValidate = true;
            this.validate = {};
            var rules = {};
            var messages = {};
            var idOrName = this.element.attr("id") || this.element.attr("name");
            for(var i = 0, l = validate.length; i < l; i++){
                rules[validate[i].rule] = validate[i].value;
                messages[validate[i].rule] =  validate[i].message;
            }
            this.validate.rules = rules;
            this.validate.messages = messages;
            return this;
        },
        /**
         * 获取验证规则
         * @returns {{}|*}
         */
        getValidate : function(){
            return this.validate;
        },
        /**
         * 判断是否已经设置验证规则
         * @returns {Function}
         */
        isValidate : function(){
            return this.isValidate;
        }

    });

    module.exports = ValidateElement;
});