/**
 * Created by xreztento@vip.sina.com on 2016/12/21.
 */
define(function (require, exports, module) {

    require("jquery");
    var Class = require("class");
    var Element = require("./Element");
    var PlainTextElement = Class("PlainTextElement", {
        Extends : Element,
        STATIC: {
            MODULE_NAME : "PlainTextElement"
        },
        initialize : function(text) {
            PlainTextElement.Super.call(this, null, null);
            this.text = text;
        },
        init : function(where){
            var statement = "<p></p>";
            var text = this.text || "";
            this.element = PlainTextElement.Super.prototype.init.call(this, where, statement);
            this.element.text(text);

            return this;
        },
        getModuleName : function(){
            return PlainTextElement.MODULE_NAME;
        }
    });

    module.exports = PlainTextElement;
});