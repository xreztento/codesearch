/**
 * Created by xreztento@vip.sina.com on 2017/1/6.
 */
define(function (require, exports, module) {

    require("jquery");
    var Class = require("class");
    var NumberInputGroup = require("numberInputGroup");


    var CallNumberInputGroup = Class("CallNumberInputGroup", {
        Extends : NumberInputGroup,
        STATIC: {
            MODULE_NAME : "CallNumberInputGroup"
        },
        initialize : function(width, height, isRequired, remoteURL) {
            var prefixFont = "fa fa-tablet";
            CallNumberInputGroup.Super.call(this, width, height, prefixFont, "手机号码", isRequired, 11, 11, remoteURL);
        },
        init : function(where){

            return CallNumberInputGroup.Super.prototype.init.call(this, where);
        },
        getModuleName : function(){
            return CallNumberInputGroup.MODULE_NAME;
        }
    });

    module.exports = CallNumberInputGroup;
});
