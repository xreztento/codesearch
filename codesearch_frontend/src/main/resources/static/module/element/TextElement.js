/**
 * Created by xreztento@vip.sina.com on 2016/12/21.
 */
define(function (require, exports, module) {

    //require("jquery");
    var Class = require("class");
    var Element = require("./Element");
    var ValidateElement = require("./ValidateElement");

    var TextElement = Class("TextElement", {
        Extends : Element,
        Implements : [ValidateElement],
        STATIC: {
            MODULE_NAME : "TextElement"
        },
        initialize : function(width, height, placeholder, model) {
            TextElement.Super.call(this, width, height, model);
            this.placeholder = placeholder;
        },
        init : function(where){
            var statement = "<input>";
            var placeholder = this.placeholder || "";
            this.element = TextElement.Super.prototype.init.call(this, where, statement);
            this.element.attr("placeholder", placeholder);

            return this;
        },
        getModuleName : function(){
            return TextElement.MODULE_NAME;
        }
    });

    module.exports = TextElement;
});