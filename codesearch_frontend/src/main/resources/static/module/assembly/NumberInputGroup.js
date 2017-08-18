/**
 * Created by xreztento@vip.sina.com on 2017/1/6.
 */
define(function (require, exports, module) {

    require("jquery");
    var Class = require("class");
    var InputGroup = require("inputGroup");


    var NumberInputGroup = Class("NumberInputGroup", {
        Extends : InputGroup,
        STATIC: {
            MODULE_NAME : "NumberInputGroup"
        },
        initialize : function(width, height, prefixFont, placeholder, isRequired, maxLength, minLength, remoteURL) {
            var prefixFont = prefixFont || "fa fa-keyboard-o";
            var placeholder = placeholder || "数字";
            NumberInputGroup.Super.call(this, width, height, placeholder, "<span class='input-group-addon'><span class='"+ prefixFont +"'></span></span>");

            this.isRequired = isRequired;
            this.maxLength = maxLength;
            this.minLength = minLength;
            this.remoteURL = remoteURL;
        },
        init : function(where){

            var isRequired = this.isRequired;
            var maxLength = this.maxLength;
            var minLength = this.minLength;
            var remoteURL = this.remoteURL;

            this.group = NumberInputGroup.Super.prototype.init.call(this, where);
            this._setValidate(isRequired, maxLength, minLength, remoteURL);
            return this;
        },
        _setValidate : function(isRequired, maxLength, minLength, remoteURL){
            var numberValidate = new Array();
            if(isRequired){
                numberValidate.push({
                    rule : "required",
                    value : true,
                    message : "必须输入数字"
                });
            }
            if(maxLength && minLength){
                if(maxLength == minLength){
                    numberValidate.push({
                        rule : "rangelength",
                        value : [minLength, maxLength],
                        message : "输入数字长度为{0}"
                    });
                }
            } else {
                if(maxLength){
                    numberValidate.push({
                        rule : "maxlength",
                        value : maxLength,
                        message : "最大数字长度为{0}"
                    });
                }

                if(minLength){
                    numberValidate.push({
                        rule : "minlength",
                        value : minLength,
                        message : "最小数字长度为{0}"
                    });
                }
            }

            if(remoteURL){
                numberValidate.push({
                    rule : "remote",
                    value : remoteURL,
                    message : "已存在相同的信息"
                });
            }

            numberValidate.push({
                rule : "number",
                value : true,
                message : "请输入数字"
            });
            this.getInputElement().setValidate(numberValidate);
        },
        getModuleName : function(){
            return NumberInputGroup.MODULE_NAME;
        }
    });

    module.exports = NumberInputGroup;
});