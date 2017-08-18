/**
 * Created by xreztento@vip.sina.com on 2016/12/21.
 */
define(function (require, exports, module) {

    require("jquery");
    var Class = require("class");
    var Element = require("./Element");

    var HeadingElement = Class("HeadingElement", {
        Extends : Element,
        STATIC: {
            MODULE_NAME : "HeadingElement"
        },
        initialize : function(text, level) {
            HeadingElement.Super.call(this, null, null);
            this.text = text;
            this.level = level;
        },
        init : function(where){
            var level = this.level || "4";
            var statement = "<h" + level + "></h" + level + ">";
            var text = this.text || "";
            this.element = HeadingElement.Super.prototype.init.call(this, where, statement);
            this.element.text(text);
            return this;
        },
        getModuleName : function(){
            return HeadingElement.MODULE_NAME;
        }
    });

    module.exports = HeadingElement;
});

