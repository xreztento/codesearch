/**
 * Created by xreztento@vip.sina.com on 2016/12/21.
 */
define(function (require, exports, module) {

    require("jquery");
    var Class = require("class");
    var Element = require("./Element");

    var LabelElement = Class("LabelElement", {
        Extends : Element,
        STATIC: {
            MODULE_NAME : "LabelElement"
        },
        initialize : function(text, style) {
            LabelElement.Super.call(this, null, null);
            this.text = text;
            this.style = style;
        },
        init : function(where){
            var statement = "<span class='label'></span>";
            var text = this.text || "";
            var style = this.style || "default";
            this.element = LabelElement.Super.prototype.init.call(this, where, statement);
            this.element.text(text).addClass("label-" + style);
            return this;
        },
        getModuleName : function(){
            return LabelElement.MODULE_NAME;
        }
    });

    module.exports = LabelElement;
});


