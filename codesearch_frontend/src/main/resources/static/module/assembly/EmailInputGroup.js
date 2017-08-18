/**
 * Created by xreztento on 2017/1/4.
 */
define(function (require, exports, module) {

    require("jquery");
    var Class = require("class");
    var InputGroup = require("inputGroup");


    var EmailInputGroup = Class("EmailInputGroup", {
        Extends : InputGroup,
        STATIC: {
            MODULE_NAME : "EmailInputGroup"
        },
        initialize : function(width, height, isRequired, remoteURL) {
            EmailInputGroup.Super.call(this, width, height, "邮箱地址", "<span class='input-group-addon'><span class='fa fa-at'></span></span>");
            this.isRequired = isRequired;
            this.remoteURL = remoteURL;
        },
        init : function(where){
            var isRequired = this.isRequired;
            var remoteURL = this.remoteURL;
            this.group = EmailInputGroup.Super.prototype.init.call(this, where);
            var emailValidate = new Array();
            if(isRequired){
                emailValidate.push({
                    rule : "required",
                    value : true,
                    message : "请输入邮箱地址"
                });
            }

            if(remoteURL){
                emailValidate.push({
                    rule : "remote",
                    value : remoteURL,
                    message : "不存在邮箱地址"
                });
            }

            emailValidate.push({
                rule : "email",
                value : true,
                message : "邮箱格式"
            });

            this.getInputElement().setValidate(emailValidate);
            return this;
        },
        getModuleName : function(){
            return EmailInputGroup.MODULE_NAME;
        }
    });

    module.exports = EmailInputGroup;
});