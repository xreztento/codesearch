/**
 * Created by xreztento@vip.sina.com on 2016/12/21.
 */
define(function (require, exports, module) {

    require("jquery");
    var Class = require("class");
    var Element = require("./Element");

    var TextAreaElement = Class("TextAreaElement", {
        Extends : Element,
        STATIC: {
            MODULE_NAME : "TextAreaElement"
        },
        initialize : function(width, height, rows) {
            TextAreaElement.Super.call(this, width, height);
            this.rows = rows;
        },
        init : function(where){
            var rows = this.rows || 5;
            var statement = "<textarea></textarea>";
            this.element = TextAreaElement.Super.prototype.init.call(this, where, statement);
            this.element.attr("rows", rows);
            return this;
        },
        getModuleName : function(){
            return TextAreaElement.MODULE_NAME;
        }
    });

    module.exports = TextAreaElement;
});





